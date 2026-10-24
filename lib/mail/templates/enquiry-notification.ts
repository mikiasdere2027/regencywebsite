import { LOGO_EMAIL, REGENCY_ORIGIN } from '../../../app/site';

type EnquiryNotification = {
  requestType: string;
  name: string;
  fields: Array<readonly [string, string]>;
  page?: string;
  visitorEmail?: string;
};

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');

const label = (key: string) => key.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

export function buildEnquiryNotification({ requestType, name, fields, page, visitorEmail }: EnquiryNotification) {
  const safeType = escapeHtml(requestType);
  const safeName = escapeHtml(name || 'Website visitor');
  const rows = fields.map(([key, value]) => `
    <tr>
      <td valign="top" style="width:32%;padding:12px 14px;border-top:1px solid #e8e3d8;color:#716b60;font-size:13px;font-weight:600;">${escapeHtml(label(key))}</td>
      <td valign="top" style="padding:12px 14px;border-top:1px solid #e8e3d8;color:#242321;font-size:14px;line-height:1.55;white-space:pre-wrap;overflow-wrap:anywhere;">${escapeHtml(value)}</td>
    </tr>`).join('');
  const safePage = page ? escapeHtml(page) : '';
  const replyCopy = visitorEmail
    ? 'Reply directly to this email to respond to the visitor.'
    : 'The visitor did not provide an email address. Use the phone number in the request details if available.';
  const safeReplyCopy = escapeHtml(replyCopy);
  const pageRow = safePage
    ? `<tr><td valign="top" style="width:32%;padding:12px 14px;border-top:1px solid #e8e3d8;color:#716b60;font-size:13px;font-weight:600;">Submitted from</td><td valign="top" style="padding:12px 14px;border-top:1px solid #e8e3d8;color:#242321;font-size:14px;line-height:1.55;overflow-wrap:anywhere;">${safePage}</td></tr>`
    : '';

  const text = [
    `New ${requestType.toLowerCase()} from regencyparkingservice.com`,
    `Name: ${name || 'Website visitor'}`,
    '',
    ...fields.map(([key, value]) => `${label(key)}: ${value}`),
    page ? `Sent from: ${page}` : '',
    visitorEmail ? 'Reply directly to this email to answer the visitor.' : 'No email given — use the phone number above if available.',
  ].filter(Boolean).join('\n');

  const html = `<!doctype html>
<html lang="en">
  <head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="x-apple-disable-message-reformatting"><title>New ${safeType}</title><style type="text/css">@import url('https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700&display=swap');</style></head>
  <body style="margin:0;padding:0;background:#f1f0ed;color:#242321;font-family:'Prompt',Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f1f0ed;font-family:'Prompt',Arial,Helvetica,sans-serif;">
      <tr><td align="center" style="padding:24px 12px;">
        <table role="presentation" width="640" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:640px;background:#ffffff;border:1px solid #e6e2da;border-radius:14px;overflow:hidden;">
          <tr><td style="padding:24px 30px;background:#111113;border-bottom:5px solid #c9a24b;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
              <tr>
                <td valign="middle" style="color:#e3c67a;font-size:11px;font-weight:700;letter-spacing:.14em;line-height:1.8;">REGENCY PARKING SERVICES<br><span style="color:#f6f1e7;font-size:11px;letter-spacing:.1em;">NEW WEBSITE REQUEST</span></td>
                <td align="right" valign="middle" style="width:180px;">
                  <a href="${REGENCY_ORIGIN}" style="display:inline-block;text-decoration:none;">
                    <img src="${REGENCY_ORIGIN}${LOGO_EMAIL}" width="168" height="56" alt="Regency Parking Services" style="display:block;width:168px;height:56px;border:0;">
                  </a>
                </td>
              </tr>
            </table>
            <h1 style="margin:18px 0 0;color:#f6f1e7;font-size:24px;line-height:1.3;font-weight:700;">New ${safeType}</h1>
          </td></tr>
          <tr><td style="padding:28px 30px 30px;">
            <p style="margin:0 0 8px;color:#171717;font-size:21px;line-height:1.35;font-weight:700;">${safeName}</p>
            <p style="margin:0 0 20px;color:#625f59;font-size:14px;line-height:1.65;">A new request was submitted through the Regency Parking Services website. Review the details and follow up with the visitor.</p>
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border:1px solid #e8e3d8;border-radius:10px;border-collapse:separate;overflow:hidden;">
              <tr><td colspan="2" style="padding:14px 16px;background:#f7f5f0;color:#242321;font-size:16px;font-weight:700;">Request details</td></tr>
              ${rows}
              ${pageRow}
            </table>
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top:20px;border-radius:10px;background:#111113;">
              <tr><td style="padding:18px 20px;">
                <p style="margin:0 0 6px;color:#e3c67a;font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;">Ready to follow up?</p>
                <p style="margin:0;color:#f6f1e7;font-size:14px;line-height:1.6;">${safeReplyCopy}</p>
              </td></tr>
            </table>
          </td></tr>
          <tr><td style="padding:16px 30px 20px;border-top:1px solid #e8e3d8;color:#8a867d;font-size:11px;line-height:1.6;">
            Regency Parking Services LLC · Houston, Texas<br>
            This is an internal notification from <a href="${REGENCY_ORIGIN}" style="color:#775b1e;">regencyparkingservice.com</a>.
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`;

  return { html, text };
}
