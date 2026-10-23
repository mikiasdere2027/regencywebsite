export type EnquiryForm = 'proposal' | 'contact' | 'quick' | 'newsletter';

/**
 * Posts a Regency form to /api/enquiry, which emails it to the Regency
 * team. Every named input in the form is sent (empty ones are dropped on the
 * server); `honey` is the hidden anti-spam field each form renders.
 */
export async function submitEnquiry(form: EnquiryForm, el: HTMLFormElement): Promise<boolean> {
  const data = new FormData(el);
  const honey = String(data.get('honey') ?? '');
  data.delete('honey');
  const fields: Record<string, string> = {};
  data.forEach((v, k) => {
    if (typeof v === 'string') fields[k] = v;
  });
  try {
    const res = await fetch('/api/enquiry', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ form, fields, honey, page: window.location.href }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
