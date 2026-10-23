import type { Metadata } from 'next';
import ServiceIcon, { type ServiceIconName } from '../ServiceIcon';
import ServiceSlider from './ServiceSlider';
import ClientStrip from '../ClientStrip';
import { IMG } from '../site';
import { regencyBase } from '../base';
import base from '../page.module.css';
import styles from './services.module.css';

/**
 * Services page of the Regency mockup. The homepage sells Regency; this page
 * sells the solution: an overview grid, a slider with each service in detail,
 * then proof, process and a closing call to action. Header and footer come
 * from ../layout.tsx.
 */

export const metadata: Metadata = {
  title: { absolute: 'Services | Regency Valet Parking Services, Houston' },
  description:
    'Valet and parking management for hotels, private and corporate events, hospitals, high-rise condominiums and transportation in Houston.',
  alternates: { canonical: '/services' },
};


type Service = {
  id: string;
  icon: ServiceIconName;
  name: string;
  title: string;
  summary: string;
  tagline: string;
  body: string;
  points: string[];
  cta: string;
  image: string;
  /** object-position, so photos reused between services show different crops */
  focus?: string;
};

// Photos are Regency's own from their current site. There are only five, so
// some repeat with a different crop; swap in property-specific shots here.
const SERVICES: Service[] = [
  {
    id: 'hotels',
    icon: 'hotel',
    name: 'Hotels',
    title: 'Hotel Parking',
    summary: 'Seamless parking experiences designed for exceptional hospitality.',
    tagline: 'Seamless parking for exceptional guest experiences.',
    body: 'We provide professional valet and parking management that enhances your guests’ arrival, stay and departure. The front drive team is the first impression a guest has of the hotel, so we treat it that way.',
    points: ['Valet management', 'Guest arrival experience', 'Traffic coordination', 'Parking operations'],
    cta: 'Discuss your property',
    image: `${IMG}/Regency-valet1.jpg`,
  },
  {
    id: 'private-events',
    icon: 'event',
    name: 'Private Events',
    title: 'Private Events',
    summary: 'Professional valet service for weddings, galas and special occasions.',
    tagline: 'Professional parking for life’s most memorable moments.',
    body: 'From intimate gatherings to large-scale galas, we deliver valet service that exceeds expectations, whether it is a wedding or a catering event, built on a foundation of trust and reliability.',
    points: ['Weddings', 'Galas', 'Private parties', 'Catering events'],
    cta: 'Discuss your event',
    image: `${IMG}/valet.jpg`,
  },
  {
    id: 'hospitals',
    icon: 'hospital',
    name: 'Hospitals',
    title: 'Hospital Parking',
    summary: 'Safe, efficient parking operations for healthcare facilities.',
    tagline: 'Safe, efficient and compassionate service.',
    body: 'We partner with healthcare providers to create a service that is customized to them. Our valet team provides a compassionate service for patients, visitors and staff, delivered with efficiency.',
    points: ['Patient accessibility', 'Visitor parking', 'Staff parking', 'Traffic management'],
    cta: 'Discuss your facility',
    image: `${IMG}/Regency-valet3.jpg`,
  },
  {
    id: 'corporate-events',
    icon: 'corporate',
    name: 'Corporate Events',
    title: 'Corporate Events',
    summary: 'Parking management for conferences, meetings and corporate gatherings.',
    tagline: 'Professional parking for productive gatherings.',
    body: 'Our highly professional and experienced valet team gives your function a service that is memorable for the right reasons. Quality, efficiency and integrity are the pinnacles of what we do.',
    points: ['Guest management', 'Event coordination', 'Staff parking', 'On-site manager'],
    cta: 'Discuss your event',
    image: `${IMG}/Regency-valet2.jpg`,
  },
  {
    id: 'high-rise-condos',
    icon: 'condo',
    name: 'High-Rise Condos',
    title: 'High-Rise Condos',
    summary: 'Resident and visitor parking with concierge-level service.',
    tagline: 'A better resident and visitor experience.',
    body: 'Our concierge doormen and valet make residents feel at home. Each resident’s vehicle is pulled up at a time of their choosing, with dog walking and grocery delivery that make luxury living feel effortless.',
    points: ['Resident valet', 'Visitor management', 'Concierge doorman', 'Resident services'],
    cta: 'Discuss your building',
    image: `${IMG}/houston-city.jpg`,
  },
  {
    id: 'transportation',
    icon: 'shuttle',
    name: 'Transportation',
    title: 'Transportation',
    summary: 'Shuttle services and custom trips with dependable drivers.',
    tagline: 'Keeping your guests moving, on schedule.',
    body: 'We customize each trip to the unique needs of each client, and run shuttle services around the city with dependable and friendly drivers, so the experience continues well past the front drive.',
    points: ['Shuttle services', 'Custom trips', 'Dependable drivers', 'Event transportation'],
    cta: 'Discuss your needs',
    image: `${IMG}/Regency-valet1.jpg`,
    focus: '85% 50%',
  },
];

const WHY = [
  { label: 'Professional staff', icon: 'user' },
  { label: 'Experienced management', icon: 'badge' },
  { label: 'Local expertise', icon: 'pin' },
  { label: 'Consistent service', icon: 'shield' },
] as const;

const WHY_ICONS: Record<(typeof WHY)[number]['icon'], React.ReactNode> = {
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </>
  ),
  badge: (
    <>
      <circle cx="12" cy="9" r="6" />
      <path d="m9 14.5-1.5 6.5 4.5-2.5 4.5 2.5-1.5-6.5" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.3 7.5 9.5 4.3-1.2 7.5-4.9 7.5-9.5V6z" />
      <path d="m8.5 12 2.5 2.5 4.5-5" />
    </>
  ),
};

const STEPS = [
  { title: 'Tell us about your property', body: 'Share your needs and what you’re trying to achieve.' },
  { title: 'We build your parking plan', body: 'We assess your property, traffic and service requirements.' },
  { title: 'We manage the details', body: 'Our team handles the operation and logistics.' },
  { title: 'You focus on your business', body: 'Your guests receive a seamless experience.' },
];

const ENVIRONMENTS: { name: string; icon: ServiceIconName; items: string[] }[] = [
  { name: 'Hotels', icon: 'hotel', items: ['Guest experience', 'Valet management', 'Front drive'] },
  { name: 'Hospitals', icon: 'hospital', items: ['Patient accessibility', 'Staff parking', 'Traffic management'] },
  { name: 'High-Rise Condos', icon: 'condo', items: ['Resident experience', 'Visitor parking', 'Concierge'] },
  { name: 'Corporate', icon: 'corporate', items: ['Employee parking', 'Events', 'Guest management'] },
  { name: 'Private Events', icon: 'event', items: ['Weddings', 'Galas', 'Special occasions'] },
  { name: 'Transportation', icon: 'shuttle', items: ['Shuttles', 'Custom trips', 'Event transport'] },
];

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.arrow}>
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

export default async function ServicesPage() {
  const href0 = await regencyBase();
  const PROPOSAL = `${href0}/#quote`;
  return (
    <main>
      {/* 1. Hero */}
      <section className={styles.hero} style={{ backgroundImage: `url(${IMG}/valet.jpg)` }}>
        <div className={`${base.wrap} ${styles.heroInner}`}>
          <p className={base.eyebrow}>Our services</p>
          <h1 className={styles.heroTitle}>Parking solutions designed around your property.</h1>
          <p className={styles.heroBody}>
            From daily parking operations to high-profile events, we manage the details that keep your
            property moving.
          </p>
          <a className={`${base.btn} ${styles.btnPlain}`} href={PROPOSAL}>
            Request a Proposal
            <Arrow />
          </a>
        </div>
        <p className={`${base.wrap} ${styles.heroTags}`}>
          <span>Professional</span>
          <span>Reliable</span>
          <span>Trusted</span>
        </p>
      </section>

      {/* 2. Overview grid */}
      <section className={styles.section}>
        <div className={base.wrap}>
          <header className={styles.splitHead}>
            <div>
              <p className={base.eyebrow}>What we do</p>
              <h2 className={styles.h2}>Parking expertise for every environment.</h2>
            </div>
            <p>
              We provide customized parking and valet solutions for a wide range of industries and
              properties. No matter the size or complexity, we deliver exceptional service, every time.
            </p>
          </header>
          <div className={styles.cardGrid}>
            {SERVICES.map((s, i) => (
              <a key={s.id} href={`#${s.id}`} className={styles.card}>
                <span className={styles.cardMedia}>
                  {/* eslint-disable-next-line @next/next/no-img-element -- static client asset */}
                  <img src={s.image} alt="" loading="lazy" style={s.focus ? { objectPosition: s.focus } : undefined} />
                </span>
                <span className={styles.cardBody}>
                  <span className={styles.cardMeta}>
                    <span className={styles.num}>0{i + 1}</span>
                    <ServiceIcon name={s.icon} className={styles.cardIcon} />
                  </span>
                  <strong>{s.name}</strong>
                  <span className={styles.cardText}>{s.summary}</span>
                  <span className={styles.cardLink}>
                    Explore service <Arrow />
                  </span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Every service in detail, in one slider */}
      <section className={styles.details}>
        <div className={base.wrap}>
          <header className={styles.splitHead}>
            <div>
              <p className={base.eyebrow}>Service details</p>
              <h2 className={styles.h2}>Choose a service to see how we run it.</h2>
            </div>
          </header>
          <ServiceSlider services={SERVICES} ctaHref={PROPOSAL} />
        </div>
      </section>

      {/* Current clients, kept to one line */}
      <ClientStrip />

      {/* 4. Why Regency */}
      <section className={styles.why}>
        <div className={`${base.wrap} ${styles.whyInner}`}>
          <div className={styles.whyLead}>
            <p className={base.eyebrow}>Why Regency</p>
            <p className={styles.whyStat}>
              <strong>40+</strong>
              <span>Years of experience delivering professional parking solutions across Houston.</span>
            </p>
          </div>
          <ul className={styles.whyList}>
            {WHY.map((w) => (
              <li key={w.label}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  {WHY_ICONS[w.icon]}
                </svg>
                {w.label}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. How it works, then 6. who it's built for */}
      <section className={styles.section}>
        <div className={base.wrap}>
          <header className={styles.splitHead}>
            <div>
              <p className={base.eyebrow}>How it works</p>
              <h2 className={styles.h2}>Getting started is simple.</h2>
            </div>
            <p>We make the process easy, from the first conversation to day-to-day management.</p>
          </header>
          <ol className={styles.steps}>
            {STEPS.map((s, i) => (
              <li key={s.title}>
                <span className={styles.stepNum}>0{i + 1}</span>
                <strong>{s.title}</strong>
                <span>{s.body}</span>
              </li>
            ))}
          </ol>

          <p className={`${base.eyebrow} ${styles.envEyebrow}`}>Solutions for every environment</p>
          <ul className={styles.envs}>
            {ENVIRONMENTS.map((e) => (
              <li key={e.name}>
                <ServiceIcon name={e.icon} className={styles.envIcon} />
                <span>
                  <strong>{e.name}</strong>
                  {e.items.map((it) => (
                    <small key={it}>{it}</small>
                  ))}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 7. Closing call to action */}
      <section className={styles.cta} style={{ backgroundImage: `url(${IMG}/Regency-valet2.jpg)` }}>
        <div className={`${base.wrap} ${styles.ctaInner}`}>
          <p className={base.eyebrow}>Have a parking challenge?</p>
          <h2>Let’s find the right solution for your property.</h2>
          <p>
            Whether you’re managing a hotel, hospital, event or residential property, our team is ready to
            help.
          </p>
          <a className={`${base.btn} ${styles.btnPlain}`} href={PROPOSAL}>
            Request a Proposal
            <Arrow />
          </a>
        </div>
      </section>
    </main>
  );
}
