'use client';

import { useRef, useState, type FormEvent } from 'react';
import { submitEnquiry, type EnquiryForm } from './submitEnquiry';
import { PHONE } from './site';
import styles from './page.module.css';

type Field = {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
  options?: string[];
  /** Grid columns out of 6: 6 full row, 3 half, 2 third. Defaults to 3. */
  span?: 2 | 3 | 6;
};

export type Step = { title: string; hint: string; fields: Field[] };

/**
 * The proposal form, split into steps so it never shows more than a handful of
 * fields at once. Every step stays mounted (only hidden), so going Back keeps
 * what was typed. Next validates just the visible step. The final submit
 * emails everything to Regency (submitEnquiry → /api/regency/enquiry).
 */
export default function StepForm({
  steps,
  className,
  submitLabel = 'Request now',
  form = 'proposal',
}: {
  steps: Step[];
  className?: string;
  submitLabel?: string;
  form?: EnquiryForm;
}) {
  const [step, setStep] = useState(0);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);
  const sets = useRef<(HTMLFieldSetElement | null)[]>([]);
  const last = step === steps.length - 1;

  function stepIsValid(i: number) {
    const els = sets.current[i]?.querySelectorAll<HTMLInputElement>('input, select, textarea') ?? [];
    for (const el of els) {
      if (!el.checkValidity()) {
        el.reportValidity();
        return false;
      }
    }
    return true;
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!stepIsValid(step)) return;
    if (!last) {
      setStep(step + 1);
      return;
    }
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
          Your details are on their way to the Regency team, and we&rsquo;ll be in touch shortly. For
          anything urgent, call <a href={`tel:${PHONE.replace(/-/g, '')}`}>{PHONE}</a>.
        </p>
        <button
          type="button"
          className={`${styles.btn} ${styles.btnGhost}`}
          onClick={() => {
            setSent(false);
            setStep(0);
          }}
        >
          Back to the form
        </button>
      </div>
    );
  }

  return (
    <form className={className} onSubmit={onSubmit} noValidate>
      <ol className={styles.steps}>
        {steps.map((s, i) => (
          <li
            key={s.title}
            className={i === step ? styles.stepActive : i < step ? styles.stepDone : undefined}
            aria-current={i === step ? 'step' : undefined}
          >
            <span className={styles.stepNum}>{i < step ? '✓' : i + 1}</span>
            <span>
              <small>Step {i + 1}</small>
              {s.title}
            </span>
          </li>
        ))}
      </ol>
      <div className={styles.stepBar} aria-hidden="true">
        <span style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
      </div>

      {steps.map((s, i) => (
        <fieldset
          key={s.title}
          ref={(el) => {
            sets.current[i] = el;
          }}
          hidden={i !== step}
          className={styles.stepSet}
        >
          <legend className={styles.srOnly}>{s.title}</legend>
          <p className={styles.stepHint}>{s.hint}</p>
          <div className={styles.stepGrid}>
            {s.fields.map((f) => {
              const id = `rg-step-${f.name}`;
              return (
                <label
                  key={f.name}
                  htmlFor={id}
                  className={styles.field}
                  style={{ gridColumn: `span ${f.span ?? 3}` }}
                >
                  <span>
                    {f.label}
                    {f.required ? ' *' : ''}
                  </span>
                  {f.textarea ? (
                    <textarea id={id} name={f.name} rows={3} required={f.required} />
                  ) : f.options ? (
                    <select id={id} name={f.name} defaultValue="" required={f.required}>
                      <option value="" disabled>
                        Select…
                      </option>
                      {f.options.map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                  ) : (
                    <input id={id} name={f.name} type={f.type ?? 'text'} required={f.required} />
                  )}
                </label>
              );
            })}
          </div>
        </fieldset>
      ))}

      {/* Hidden from people; bots that fill every field mark themselves. */}
      <input type="text" name="honey" tabIndex={-1} autoComplete="off" aria-hidden="true" className={styles.honey} />
      {failed && (
        <p className={styles.formError} role="alert">
          Sorry, that didn&rsquo;t send. Please try again, or call us on{' '}
          <a href={`tel:${PHONE.replace(/-/g, '')}`}>{PHONE}</a>.
        </p>
      )}
      <div className={styles.stepNav}>
        {step > 0 && (
          <button type="button" className={`${styles.btn} ${styles.btnGhost}`} onClick={() => setStep(step - 1)}>
            Back
          </button>
        )}
        <button type="submit" className={styles.btn} disabled={sending}>
          {last ? (sending ? 'Sending…' : submitLabel) : 'Next step'}
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" className={styles.btnArrow}>
            <path d="M5 12h14m-6-6 6 6-6 6" />
          </svg>
        </button>
      </div>
    </form>
  );
}
