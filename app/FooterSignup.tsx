'use client';

import { useState, type FormEvent } from 'react';
import { submitEnquiry } from './submitEnquiry';
import styles from './page.module.css';

/** Footer updates sign-up: emails the address to Regency (form 'newsletter'). */
export default function FooterSignup() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setFailed(false);
    const ok = await submitEnquiry('newsletter', e.currentTarget);
    setSending(false);
    if (ok) setSent(true);
    else setFailed(true);
  }

  if (sent) {
    return (
      <p className={styles.signupSent} role="status">
        Thanks — you’re on the list.
      </p>
    );
  }

  return (
    <form className={styles.signup} onSubmit={onSubmit}>
      <label htmlFor="rg-signup-email" className={styles.srOnly}>
        Your email
      </label>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
      <input id="rg-signup-email" type="email" name="email" placeholder={failed ? 'Didn’t send — try again' : 'Your email'} required />
      <input type="text" name="honey" tabIndex={-1} autoComplete="off" aria-hidden="true" className={styles.honey} />
      <button type="submit" disabled={sending}>
        {sending ? 'Sending…' : 'Send now'}
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7 17 17 7M8 7h9v9" />
        </svg>
      </button>
    </form>
  );
}
