import { CLIENTS } from './site';
import styles from './clients.module.css';

/** One-line "Trusted by" band for the Services page: label, logos, a short line. */
export default function ClientStrip() {
  return (
    <section className={styles.strip} aria-label="Current clients">
      <div className={`${styles.wrap} ${styles.stripInner}`}>
        <p className={styles.eyebrow}>Trusted by</p>
        <ul className={styles.stripLogos}>
          {CLIENTS.map((c) => (
            <li key={c.name}>
              {/* eslint-disable-next-line @next/next/no-img-element -- static client logo */}
              <img src={c.logo} alt={c.name} width={c.logoW} height={c.logoH} loading="lazy" />
            </li>
          ))}
        </ul>
        <p className={styles.stripNote}>Hospitality and education properties across Houston.</p>
      </div>
    </section>
  );
}
