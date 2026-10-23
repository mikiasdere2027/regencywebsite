import type { Metadata } from 'next';
import ServiceIcon, { type ServiceIconName } from '../ServiceIcon';
import StepForm from '../StepForm';
import { ADDRESS, EMAIL, HOURS, IMG, MAP_URL, PHONE } from '../site';
import { regencyBase } from '../base';
import base from '../page.module.css';
import svc from '../services/services.module.css';
import styles from './contact.module.css';

/**
 * Contact page of the Regency mockup: hero, four quick contact cards, the
 * service list beside the two-step message form, a call band and the map.
 * Email and hours are not on Regency's current site, so EMAIL / HOURS in
 * ../site.ts are empty and those cards fall back to the form and the phone.
 */

export const metadata: Metadata = {
  title: { absolute: 'Contact Us | Regency Valet Parking Services, Houston' },
  description: `Talk to Regency Parking Services about your property, parking needs or next event. Call ${PHONE} or visit us at ${ADDRESS.join(', ')}.`,
  alternates: { canonical: '/contact' },
};

const TEL = `tel:${PHONE.replace(/-/g, '')}`;

const SERVICES: { id: string; name: string; icon: ServiceIconName }[] = [
  { id: 'hotels', name: 'Hotels', icon: 'hotel' },
  { id: 'private-events', name: 'Private Events', icon: 'event' },
  { id: 'hospitals', name: 'Hospitals', icon: 'hospital' },
  { id: 'corporate-events', name: 'Corporate Events', icon: 'corporate' },
  { id: 'high-rise-condos', name: 'High-Rise Condos', icon: 'condo' },
  { id: 'transportation', name: 'Transportation', icon: 'shuttle' },
];

const ICONS = {
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
};

function Icon({ name }: { name: keyof typeof ICONS }) {
  return (
    <span className={styles.cardIcon} aria-hidden="true">
      <svg viewBox="0 0 24 24">{ICONS[name]}</svg>
    </span>
  );
}

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={svc.arrow}>
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

export default async function ContactPage() {
  const href0 = await regencyBase();
  return (
    <main>
      {/* 1. Hero */}
      <section className={svc.hero} style={{ backgroundImage: `url(${IMG}/Regency-valet1.jpg)`, backgroundPosition: '75% 35%' }}>
        <div className={`${base.wrap} ${svc.heroInner}`}>
          <p className={base.eyebrow}>Contact us</p>
          <h1 className={`${svc.heroTitle} ${styles.heroTitle}`}>Let’s talk about your parking.</h1>
          <p className={svc.heroBody}>
            Tell us about your property, your parking needs, or your next event. Our team is ready to help.
          </p>
          <div className={styles.btnRow}>
            <a className={`${base.btn} ${svc.btnPlain}`} href="#message">
              Request a Proposal
              <Arrow />
            </a>
            <a className={`${base.btn} ${base.btnGhost} ${svc.btnPlain}`} href={TEL}>
              <svg viewBox="0 0 24 24" aria-hidden="true" className={svc.arrow}>
                {ICONS.phone}
              </svg>
              Call Us
            </a>
          </div>
        </div>
      </section>

      {/* 2. Quick contact cards */}
      <section className={styles.cardsBand}>
        <div className={`${base.wrap} ${styles.cards}`}>
          <a className={styles.card} href={TEL}>
            <Icon name="phone" />
            <strong>Call Us</strong>
            <span className={styles.cardMain}>{PHONE}</span>
            <small>Speak with our team directly.</small>
          </a>
          <a className={styles.card} href={EMAIL ? `mailto:${EMAIL}` : '#message'}>
            <Icon name="mail" />
            <strong>{EMAIL ? 'Email Us' : 'Message Us'}</strong>
            <span className={styles.cardMain}>{EMAIL || 'Send us a message'}</span>
            <small>{EMAIL ? 'We reply by email.' : 'Use the form below and we’ll get back to you.'}</small>
          </a>
          <a className={styles.card} href={MAP_URL} target="_blank" rel="noopener noreferrer">
            <Icon name="pin" />
            <strong>Visit Us</strong>
            <span className={styles.cardMain}>
              {ADDRESS[0]}
              <br />
              {ADDRESS[1]}
            </span>
            <small>Open in Google Maps.</small>
          </a>
          <a className={styles.card} href={TEL}>
            <Icon name="clock" />
            <strong>Business Hours</strong>
            <span className={styles.cardMain}>{HOURS || 'Call for current hours'}</span>
            <small>Events scheduled around your date and time.</small>
          </a>
        </div>
      </section>

      {/* 3. How can we help + the message form */}
      <section id="message" className={`${styles.help} ${base.quote}`}>
        <div className={`${base.wrap} ${styles.helpGrid}`}>
          <div>
            <p className={base.eyebrow}>Get in touch</p>
            <h2 className={svc.h2}>How can we help?</h2>
            <p className={styles.helpLead}>
              Whether you’re managing a hotel, planning an event, or need ongoing parking solutions, we’re
              here to provide the right support for your property.
            </p>
            <ul className={styles.serviceList}>
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <a href={`${href0}/services#${s.id}`}>
                    <ServiceIcon name={s.icon} className={styles.serviceIcon} />
                    <span>{s.name}</span>
                    <Arrow />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.formCol}>
            <h2 className={styles.formTitle}>Send us a message</h2>
            <p className={styles.formLead}>Fill out the form below and we’ll get back to you shortly.</p>
            <StepForm
              className={`${base.form} ${styles.form}`}
              submitLabel="Send Message"
              form="contact"
              steps={[
                {
                  title: 'Your details',
                  hint: 'Who should we get back to?',
                  fields: [
                    { name: 'name', label: 'Name', required: true },
                    { name: 'company', label: 'Company / Property', required: true },
                    { name: 'email', label: 'Email', type: 'email', required: true },
                    { name: 'phone', label: 'Phone', type: 'tel', required: true },
                  ],
                },
                {
                  title: 'Your request',
                  hint: 'What can we help you with?',
                  fields: [
                    { name: 'service', label: 'Service needed', options: SERVICES.map((s) => s.name), required: true, span: 6 },
                    { name: 'message', label: 'Message', textarea: true, required: true, span: 6 },
                  ],
                },
              ]}
            />
          </div>
        </div>
      </section>

      {/* 4. Call band */}
      <section className={svc.cta} style={{ backgroundImage: `url(${IMG}/valet.jpg)`, backgroundPosition: 'center 30%' }}>
        <div className={`${base.wrap} ${svc.ctaInner}`}>
          <p className={base.eyebrow}>Prefer to speak with someone?</p>
          <h2>Our team is just a call away.</h2>
          <p>
            Get in touch for immediate assistance, questions, or a custom proposal tailored to your
            property.
          </p>
          <div className={styles.btnRow}>
            <a className={`${base.btn} ${base.btnGhost} ${svc.btnPlain}`} href={TEL}>
              <svg viewBox="0 0 24 24" aria-hidden="true" className={svc.arrow}>
                {ICONS.phone}
              </svg>
              {PHONE}
            </a>
            <a className={`${base.btn} ${svc.btnPlain}`} href="#message">
              Request a Proposal
              <Arrow />
            </a>
          </div>
        </div>
      </section>

      {/* 5. Location */}
      <section className={svc.section}>
        <div className={`${base.wrap} ${styles.location}`}>
          {/* A drawn map rather than a Google embed: nothing third-party loads
              until someone asks for directions, and it always renders. */}
          <a className={styles.map} href={MAP_URL} target="_blank" rel="noopener noreferrer" aria-label={`Open ${ADDRESS.join(', ')} in Google Maps`}>
            <svg viewBox="0 0 640 480" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
              <rect width="640" height="480" fill="#f1ebdf" />
              <g fill="#e6dccb">
                <rect x="40" y="40" width="120" height="90" rx="4" />
                <rect x="190" y="40" width="150" height="90" rx="4" />
                <rect x="370" y="40" width="90" height="90" rx="4" />
                <rect x="490" y="40" width="120" height="90" rx="4" />
                <rect x="40" y="160" width="120" height="120" rx="4" />
                <rect x="370" y="160" width="240" height="120" rx="4" />
                <rect x="40" y="310" width="300" height="130" rx="4" />
                <rect x="370" y="310" width="90" height="130" rx="4" />
                <rect x="490" y="310" width="120" height="130" rx="4" />
              </g>
              <rect x="190" y="160" width="150" height="120" rx="4" fill="#dfe6d2" />
              <g stroke="#ffffff" strokeLinecap="round" fill="none">
                <path d="M0 145h640M0 295h640M175 0v480M355 0v480M475 0v480" strokeWidth="14" />
                <path d="M0 60 640 420" strokeWidth="10" />
              </g>
              <g stroke="#e3c67a" strokeLinecap="round" fill="none" opacity=".85">
                <path d="M0 295h640" strokeWidth="6" />
                <path d="M355 0v480" strokeWidth="6" />
              </g>
              <text x="60" y="420" fontFamily="sans-serif" fontSize="22" fontWeight="600" fill="#9d8f76" letterSpacing="3">HOUSTON</text>
              <text x="372" y="283" fontFamily="sans-serif" fontSize="11" fill="#9d8f76" letterSpacing="1">HILLCROFT ST</text>
              <g transform="translate(355 295)">
                <ellipse cx="0" cy="4" rx="16" ry="5" fill="#000" opacity=".18" />
                <path d="M0 0c-4-12-22-24-22-42a22 22 0 0 1 44 0C22-24 4-12 0 0z" fill="#0e0e10" stroke="#c9a24b" strokeWidth="2" />
                <circle cx="0" cy="-42" r="9" fill="#c9a24b" />
              </g>
            </svg>
            <span className={styles.mapLabel}>
              Open in Google Maps
              <Arrow />
            </span>
          </a>
          <div>
            <p className={base.eyebrow}>Find us</p>
            <h2 className={svc.h2}>Our Location</h2>
            <p className={styles.helpLead}>
              We’re locally owned and operated in Houston, and proudly serve properties throughout the
              Greater Houston area.
            </p>
            <ul className={styles.details}>
              <li>
                <Icon name="pin" />
                <a href={MAP_URL} target="_blank" rel="noopener noreferrer">
                  {ADDRESS[0]}
                  <br />
                  {ADDRESS[1]}
                </a>
              </li>
              <li>
                <Icon name="phone" />
                <a href={TEL}>{PHONE}</a>
              </li>
              {EMAIL && (
                <li>
                  <Icon name="mail" />
                  <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                </li>
              )}
            </ul>
            <a className={`${base.btn} ${base.btnGhost} ${svc.btnOutline}`} href={MAP_URL} target="_blank" rel="noopener noreferrer">
              Get Directions
              <Arrow />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
