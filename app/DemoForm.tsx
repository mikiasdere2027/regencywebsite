'use client';

import { useState, type FormEvent, type ReactNode } from 'react';
import { submitEnquiry, type EnquiryForm } from './submitEnquiry';
import { PHONE } from './site';
import styles from './page.module.css';

type FieldIcon = 'user' | 'contact' | 'car';

type Field = {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
  options?: string[];
  wide?: boolean;
  icon?: FieldIcon;
};

const ICONS: Record<FieldIcon, ReactNode> = {
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </>
  ),
  contact: (
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
  ),
  car: (
    <>
      <path d="M5 16V11l2-5h10l2 5v5z" />
      <path d="M5 11h14M6 16v2M18 16v2" />
      <circle cx="8.5" cy="13.5" r=".5" />
      <circle cx="15.5" cy="13.5" r=".5" />
    </>
  ),
};

/**
 * A short Regency form (the hero's Quick Request): validates in the browser,
 * then emails the fields to Regency via submitEnquiry.
 * `icon` renders the hero card's style: boxed fields, a leading icon, and the
 * label standing in as the placeholder.
 */
export default function DemoForm({
  fields,
  submitLabel,
  className,
  variant = 'box',
  form = 'quick',
}: {
  fields: Field[];
  submitLabel: string;
  className?: string;
  variant?: 'box' | 'icon';
  form?: EnquiryForm;
}) {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);
  const iconic = variant === 'icon';

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setFailed(false);
    const ok = await submitEnquiry(form, e.currentTarget);
    setSending(false);
    if (ok) setSent(true);
    else setFailed(true);
  }

  if (sent) {
    return (
      <div className={`${className ?? ''} ${styles.formSent}`} role="status">
        <h3>Thank you — request received.</h3>
        <p>
          The Regency team will get back to you shortly. For anything urgent, call{' '}
          <a href={`tel:${PHONE.replace(/-/g, '')}`}>{PHONE}</a>.
        </p>
        <button type="button" className={`${styles.btn} ${styles.btnGhost}`} onClick={() => setSent(false)}>
          Back to the form
        </button>
      </div>
    );
  }

  return (
    <form className={`${className ?? ''} ${iconic ? styles.formIcon : ''}`} onSubmit={onSubmit}>
      <div className={styles.fieldGrid}>
        {fields.map((f) => {
          const id = `rg-${variant}-${submitLabel.replace(/\W/g, '')}-${f.name}`;
          const label = `${f.label}${f.required && !iconic ? ' *' : ''}`;
          const ph = iconic ? f.label : undefined;
          return (
            <label key={f.name} htmlFor={id} className={`${styles.field} ${f.wide ? styles.fieldWide : ''}`}>
              <span className={iconic ? styles.srOnly : undefined}>{label}</span>
              {iconic && f.icon && (
                <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.fieldIcon}>
                  {ICONS[f.icon]}
                </svg>
              )}
              {f.textarea ? (
                <textarea id={id} name={f.name} rows={4} required={f.required} placeholder={ph} />
              ) : f.options ? (
                <select id={id} name={f.name} defaultValue="" required={iconic && f.required}>
                  <option value="" disabled>
                    {iconic ? f.label : 'Select…'}
                  </option>
                  {f.options.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              ) : (
                <input id={id} name={f.name} type={f.type ?? 'text'} required={f.required} placeholder={ph} />
              )}
            </label>
          );
        })}
      </div>
      <input type="text" name="honey" tabIndex={-1} autoComplete="off" aria-hidden="true" className={styles.honey} />
      {failed && (
        <p className={styles.formError} role="alert">
          Sorry, that didn&rsquo;t send. Please try again, or call{' '}
          <a href={`tel:${PHONE.replace(/-/g, '')}`}>{PHONE}</a>.
        </p>
      )}
      <button type="submit" className={`${styles.btn} ${iconic ? styles.btnBlock : ''}`} disabled={sending}>
        {sending ? 'Sending…' : submitLabel}
        {iconic && (
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" className={styles.btnArrow}>
            <path d="M5 12h14m-6-6 6 6-6 6" />
          </svg>
        )}
      </button>
    </form>
  );
}
