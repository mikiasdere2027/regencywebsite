import ClientCarousel from './ClientCarousel';
import { CLIENTS } from './site';
import styles from './clients.module.css';

/**
 * "Trusted where service matters." Full client section for Home and About:
 * intro and both logos up top, then one full-width card that rotates
 * through the clients (ClientCarousel). The card carries each client's logo
 * rather than a photo, because we have no photos of the properties.
 */
export default function ClientsSection() {
  return (
    <section className={styles.section} aria-labelledby="rg-clients-title">
      <div className={styles.wrap}>
        <div className={styles.head}>
          <div>
            <p className={styles.eyebrow}>Our clients</p>
            <h2 id="rg-clients-title" className={styles.title}>
              Trusted where service matters.
            </h2>
            <p className={styles.lede}>
              Regency Parking Services partners with leading organizations across Houston, delivering
              professional parking and valet services where it matters most.
            </p>
          </div>
          <div className={styles.logos}>
            <ul className={styles.logoRow} aria-label="Current clients">
              {CLIENTS.map((c) => (
                <li key={c.name}>
                  {/* eslint-disable-next-line @next/next/no-img-element -- static client logo */}
                  <img src={c.logo} alt={c.name} width={c.logoW} height={c.logoH} loading="lazy" />
                </li>
              ))}
            </ul>
            <ul className={styles.facts}>
              <li>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 21V4h9v17M14 9h5v12M3 21h18" />
                  <path d="M8 7.5h3M8 11h3M8 14.5h3M16.5 12.5v1M16.5 16v1M8.5 21v-3h2v3" />
                </svg>
                <span>
                  <strong className={styles.factNum}>{CLIENTS.length}+</strong>
                  <small>Current client organizations</small>
                </span>
              </li>
              <li>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.3 7.5 9.5 4.3-1.2 7.5-4.9 7.5-9.5V6z" />
                  <path d="m8.5 12 2.5 2.5 4.5-5" />
                </svg>
                <span>
                  <strong className={styles.factTags}>
                    Hospitality <i aria-hidden="true">•</i> Education
                  </strong>
                  <small>Parking &amp; valet</small>
                </span>
              </li>
            </ul>
          </div>
        </div>

        <ClientCarousel />
      </div>
    </section>
  );
}
