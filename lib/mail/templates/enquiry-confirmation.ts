import { LOGO_EMAIL, PHONE, REGENCY_ORIGIN } from '../../../app/site';

type EnquiryConfirmation = {
  firstName: string;
  requestType: string;
  service?: string;
};

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');

export function buildEnquiryConfirmation({ firstName, requestType, service }: EnquiryConfirmation) {
  const safeName = escapeHtml(firstName || 'there');
  const safeType = escapeHtml(requestType);
  const safeService = service ? escapeHtml(service) : '';
  const phoneLink = `tel:${PHONE.replace(/-/g, '')}`;
  const serviceRow = safeService
    ? `<tr><td style="padding:12px 16px;border-top:1px solid #e8e3d8;color:#716b60;font-size:14px;">Service</td><td style="padding:12px 16px;border-top:1px solid #e8e3d8;color:#242321;font-size:14px;font-weight:600;">${safeService}</td></tr>`
    : '';

  const text = [
    `Hi ${firstName || 'there'},`,
    '',
    `Thanks for contacting Regency Parking Services. We received your ${requestType}${service ? ` about ${service}` : ''}, and our team will get back to you shortly.`,
    '',
    'What happens next:',
    '1. We review your request.',
    '2. A Regency team member will reach out using the contact details you provided.',
    '3. We will discuss the right parking solution for your needs.',
    '',
    `Need immediate assistance? Call ${PHONE}.`,
    `Visit our website: ${REGENCY_ORIGIN}`,
  ].join('\n');

  const html = `<!doctype html>
<html lang="en">
  <head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="x-apple-disable-message-reformatting"><title>We received your inquiry</title></head>
  <body style="margin:0;padding:0;background:#f1f0ed;color:#242321;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f1f0ed;">
      <tr><td align="center" style="padding:24px 12px;">
        <table role="presentation" width="640" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:640px;background:#ffffff;border:1px solid #e6e2da;border-radius:14px;overflow:hidden;">
          <tr><td style="padding:26px 30px 24px;background:#111113;border-bottom:5px solid #c9a24b;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
              <tr>
                <td valign="middle" style="color:#e3c67a;font-size:11px;font-weight:700;letter-spacing:.16em;line-height:1.8;">CUSTOMER CARE<br><span style="color:#f6f1e7;font-size:11px;letter-spacing:.12em;">REQUEST RECEIVED</span></td>
                <td align="right" valign="middle" style="width:180px;">
                  <a href="${REGENCY_ORIGIN}" style="display:inline-block;text-decoration:none;">
                    <img src="${REGENCY_ORIGIN}${LOGO_EMAIL}" width="168" height="56" alt="Regency Parking Services" style="display:block;width:168px;height:56px;border:0;">
                  </a>
                </td>
              </tr>
            </table>
            <h1 style="margin:22px 0 0;color:#f6f1e7;font-size:24px;line-height:1.28;font-weight:700;">Thanks for reaching out<br><span style="color:#e3c67a;">We received your inquiry</span></h1>
          </td></tr>
          <tr><td style="padding:30px 34px 32px;">
            <p style="margin:0 0 12px;color:#171717;font-size:23px;line-height:1.3;font-weight:700;">Hi ${safeName},</p>
            <p style="margin:0 0 22px;color:#625f59;font-size:15px;line-height:1.7;">Thanks for contacting Regency Parking Services. We’ve received your ${safeType}${safeService ? ` about <strong style="color:#26231d;">${safeService}</strong>` : ''}, and a member of our team will get back to you shortly.</p>
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:0 0 24px;border:1px solid #eadfbe;border-radius:10px;background:#fbf8ef;">
              <tr><td style="padding:14px 16px;color:#775b1e;font-size:14px;font-weight:700;">
                <span style="display:inline-block;width:24px;height:24px;margin-right:9px;border-radius:50%;background:#c9a24b;color:#111113;text-align:center;line-height:24px;font-size:16px;">&#10003;</span>
                We’ve got it — our team will be in touch shortly.
              </td></tr>
            </table>
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border:1px solid #e8e3d8;border-radius:10px;border-collapse:separate;overflow:hidden;">
              <tr><td colspan="2" style="padding:14px 16px;background:#f7f5f0;color:#242321;font-size:16px;font-weight:700;">Your request</td></tr>
              <tr><td style="width:36%;padding:12px 16px;border-top:1px solid #e8e3d8;color:#716b60;font-size:14px;">Request</td><td style="padding:12px 16px;border-top:1px solid #e8e3d8;color:#242321;font-size:14px;font-weight:600;">${safeType}</td></tr>
              ${serviceRow}
              <tr><td style="padding:12px 16px;border-top:1px solid #e8e3d8;color:#716b60;font-size:14px;">Response</td><td style="padding:12px 16px;border-top:1px solid #e8e3d8;color:#242321;font-size:14px;font-weight:600;">We’ll get back to you shortly</td></tr>
            </table>
            <h2 style="margin:26px 0 14px;color:#242321;font-size:18px;line-height:1.3;font-weight:700;">What happens next</h2>
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
              <tr>
                <td valign="top" style="width:44px;padding:4px 0 13px;"><span style="display:inline-block;width:30px;height:30px;border-radius:50%;background:#c9a24b;color:#111113;text-align:center;line-height:30px;font-size:12px;font-weight:700;">01</span></td>
                <td valign="top" style="padding:5px 0 13px;"><strong style="color:#242321;font-size:14px;">We review your request</strong><br><span style="color:#716b60;font-size:13px;line-height:1.55;">Your inquiry goes straight to the Regency team.</span></td>
              </tr>
              <tr>
                <td valign="top" style="width:44px;padding:4px 0 13px;"><span style="display:inline-block;width:30px;height:30px;border-radius:50%;background:#c9a24b;color:#111113;text-align:center;line-height:30px;font-size:12px;font-weight:700;">02</span></td>
                <td valign="top" style="padding:5px 0 13px;"><strong style="color:#242321;font-size:14px;">We reach out</strong><br><span style="color:#716b60;font-size:13px;line-height:1.55;">A team member will contact you using the details you provided.</span></td>
              </tr>
              <tr>
                <td valign="top" style="width:44px;padding:4px 0 0;"><span style="display:inline-block;width:30px;height:30px;border-radius:50%;background:#c9a24b;color:#111113;text-align:center;line-height:30px;font-size:12px;font-weight:700;">03</span></td>
                <td valign="top" style="padding:5px 0 0;"><strong style="color:#242321;font-size:14px;">We plan next steps</strong><br><span style="color:#716b60;font-size:13px;line-height:1.55;">We’ll discuss the right parking solution for your needs.</span></td>
              </tr>
            </table>
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top:24px;border-radius:10px;background:#111113;">
              <tr><td style="padding:22px 24px;">
                <p style="margin:0 0 7px;color:#e3c67a;font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;">Need us sooner?</p>
                <p style="margin:0 0 16px;color:#f6f1e7;font-size:14px;line-height:1.6;">Call Regency Parking Services at <a href="${phoneLink}" style="color:#e3c67a;font-weight:700;text-decoration:underline;">${PHONE}</a>.</p>
                <a href="${REGENCY_ORIGIN}" style="display:inline-block;padding:12px 19px;border-radius:7px;background:#c9a24b;color:#111113;font-size:13px;font-weight:700;text-decoration:none;">Visit our website&nbsp;&nbsp; &#8594;</a>
              </td></tr>
            </table>
          </td></tr>
          <tr><td style="padding:18px 30px 22px;border-top:1px solid #e8e3d8;color:#8a867d;font-size:11px;line-height:1.6;">
            Regency Parking Services LLC · Houston, Texas<br>
            You’re receiving this email because you submitted a form on our website. If that wasn’t you, you can ignore this email.
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`;

  return { html, text };
}
