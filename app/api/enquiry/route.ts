import { z } from 'zod';
import { rateLimit } from '../../../lib/rate-limit';
import { sendEmail } from '../../../lib/mail/send';
import { buildEnquiryConfirmation } from '../../../lib/mail/templates/enquiry-confirmation';
import { buildEnquiryNotification } from '../../../lib/mail/templates/enquiry-notification';

/**
 * POST /api/enquiry — every form on regencyparkingservice.com.
 *
 * Emails the submission to Regency (REGENCY_LEAD_TO) from their own verified
 * sending domain (REGENCY_EMAIL_FROM), with Reply-To set to the visitor when
 * they gave an email, so Regency can answer straight from their inbox. Valid
 * business enquiries also receive a branded confirmation email. Nothing is
 * stored: the email is the record.
 */
export const dynamic = 'force-dynamic';

const FORMS = {
  proposal: 'Event / proposal request',
  contact: 'Contact message',
  quick: 'Quick request',
  newsletter: 'Newsletter sign-up',
} as const;

const Body = z.object({
  form: z.enum(Object.keys(FORMS) as [keyof typeof FORMS, ...(keyof typeof FORMS)[]]),
  fields: z.record(z.string().max(60), z.string().max(4000)).refine((f) => Object.keys(f).length <= 30),
  page: z.string().max(500).optional(),
  honey: z.string().max(200).optional(),
});

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clientIp(req: Request): string {
  const real = req.headers.get('x-real-ip');
  if (real) return real.trim();
  const fwd = req.headers.get('x-forwarded-for');
  return fwd ? fwd.split(',')[0].trim() : 'unknown';
}

export async function POST(req: Request) {
  if (!rateLimit(`regency:${clientIp(req)}`, { limit: 6, windowSec: 600 })) {
    return Response.json({ ok: false, error: 'rate_limited' }, { status: 429 });
  }
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return Response.json({ ok: false, error: 'invalid' }, { status: 400 });

  const { form, fields, page, honey } = parsed.data;
  // Bots fill the hidden field: answer OK so they learn nothing, send nothing.
  if (honey) return Response.json({ ok: true });

  const filled = Object.entries(fields)
    .map(([k, v]) => [k, v.trim()] as const)
    .filter(([, v]) => v.length > 0);
  if (filled.length === 0) return Response.json({ ok: false, error: 'invalid' }, { status: 400 });

  const to = process.env.REGENCY_LEAD_TO || 'sidris@regencyparkingservice.com';
  const from = process.env.REGENCY_EMAIL_FROM;
  if (!from && process.env.NODE_ENV === 'production') {
    console.error('[regency] REGENCY_EMAIL_FROM is not set; enquiry not sent');
    return Response.json({ ok: false, error: 'not_configured' }, { status: 503 });
  }

  const visitorEmail = filled.find(([k, v]) => /email/i.test(k) && EMAIL_RE.test(v))?.[1]
    ?? filled.find(([, v]) => EMAIL_RE.test(v))?.[1];
  const confirmationEmail = filled.find(([k, v]) => /email|contact/i.test(k) && EMAIL_RE.test(v))?.[1];
  const who = filled.find(([k]) => k === 'name')?.[1] ?? visitorEmail ?? 'website visitor';

  const notification = buildEnquiryNotification({
    requestType: FORMS[form],
    name: who,
    fields: filled,
    page,
    visitorEmail,
  });

  try {
    await sendEmail({
      from: from ?? 'Regency Parking Services <website@regencyparkingservice.com>',
      to,
      subject: `${FORMS[form]} — ${who}`,
      ...notification,
      replyTo: visitorEmail,
    });
  } catch (err) {
    console.error('[regency] enquiry email failed', err);
    return Response.json({ ok: false, error: 'send_failed' }, { status: 502 });
  }

  if (confirmationEmail && form !== 'newsletter') {
    const fullName = filled.find(([key]) => key === 'name')?.[1] ?? '';
    const firstName = fullName.split(/\s+/)[0] || 'there';
    const service = filled.find(([key]) => /service/i.test(key))?.[1];
    const confirmation = buildEnquiryConfirmation({
      firstName,
      requestType: FORMS[form],
      service,
    });

    try {
      await sendEmail({
        from: from ?? 'Regency Parking Services <website@regencyparkingservice.com>',
        to: confirmationEmail,
        subject: `We received your ${FORMS[form].toLowerCase()} | Regency Parking Services`,
        ...confirmation,
        replyTo: to,
      });
    } catch (err) {
      // A confirmation-mail failure shouldn't make the form look unsent after
      // the Regency team has already received the enquiry.
      console.error('[regency] requester confirmation email failed', err);
    }
  }

  return Response.json({ ok: true });
}
