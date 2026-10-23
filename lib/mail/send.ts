interface Email {
  from: string;
  to: string | string[];
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
}

export async function sendEmail(mail: Email): Promise<void> {
  const apiKey = process.env.AUTH_RESEND_KEY;
  if (!apiKey && process.env.NODE_ENV !== 'production') {
    console.log(`[mail:local] to=${String(mail.to)} subject=${mail.subject}\n${mail.text}`);
    return;
  }
  if (!apiKey) throw new Error('AUTH_RESEND_KEY is not set, so no mail can be sent');

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      from: mail.from,
      to: mail.to,
      subject: mail.subject,
      text: mail.text,
      ...(mail.html ? { html: mail.html } : {}),
      ...(mail.replyTo ? { reply_to: mail.replyTo } : {}),
    }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) throw new Error(`Resend refused the email (${response.status}): ${await response.text()}`);
}
