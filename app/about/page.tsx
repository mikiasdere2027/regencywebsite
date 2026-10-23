import type { Metadata } from 'next';
import ServiceIcon, { type ServiceIconName } from '../ServiceIcon';
import ClientsSection from '../ClientsSection';
import { IMG } from '../site';
import { regencyBase } from '../base';
import base from '../page.module.css';
import svc from '../services/services.module.css';
import styles from './about.module.css';

/**
 * About page of the Regency mockup. Home says who Regency is and what it
 * offers; Services says exactly what it does; this page says why it exists:
 * story, purpose, people and trust. Only claims from Regency's own site are
 * used (40+ combined years, Houston, locally owned, their motto); no invented
 * founding year, headcounts or satisfaction scores. Hero, 40+ band and closing
 * CTA reuse the Services page styles so the pages read as one site.
 */

export const metadata: Metadata = {
  title: { absolute: 'About Us | Regency Valet Parking Services, Houston' },
  description:
    'Regency Parking Services: over 40 years of combined parking and valet experience, locally owned and operated in Houston, Texas.',
  alternates: { canonical: '/about' },
};


const PURPOSE = [
  {
    title: 'Our Mission',
    icon: 'target',
    body: 'To deliver exceptional service to every customer, every time, with every member of our staff living by the principles of our company.',
  },
  {
    title: 'Our Vision',
    icon: 'eye',
    body: 'To be a trusted parking services partner known for professionalism, reliability, exceptional service and lasting client relationships.',
  },
  {
    title: 'Our Promise',
    icon: 'star',
    body: '“Delivering on our promise of Excellence.” Excellent service without fail: every customer, every event, every time.',
  },
] as const;

const VALUES = [
  { title: 'Professionalism', body: 'We take pride in how we represent our clients and their properties.' },
  { title: 'Reliability', body: 'Dependable operations are essential to a successful parking experience.' },
  { title: 'People', body: 'Our service starts with the people who deliver it every day.' },
  { title: 'Customer Focus', body: 'We listen, adapt and build our service around each property.' },
  { title: 'Excellence', body: 'We keep looking for ways to improve the experience we deliver.' },
];

const PURPOSE_ICONS: Record<(typeof PURPOSE)[number]['icon'], React.ReactNode> = {
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.2" />
    </>
  ),
  eye: (
    <>
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  star: <path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z" />,
};

const PILLARS = ['Professional staff', 'Experienced management', 'Local expertise', 'Consistent service'];

const EXPERTISE: { id: string; name: string; icon: ServiceIconName; keywords: string[] }[] = [
  { id: 'hotels', name: 'Hotels', icon: 'hotel', keywords: ['Hospitality', 'Guest experience', 'Valet service'] },
  { id: 'hospitals', name: 'Hospitals', icon: 'hospital', keywords: ['Patient accessibility', 'Staff parking', 'Traffic management'] },
  { id: 'corporate-events', name: 'Corporate', icon: 'corporate', keywords: ['Employee parking', 'Guest management', 'Events'] },
  { id: 'private-events', name: 'Private Events', icon: 'event', keywords: ['Weddings', 'Galas', 'Special occasions'] },
  { id: 'high-rise-condos', name: 'High-Rise Condos', icon: 'condo', keywords: ['Resident parking', 'Visitor experience', 'Concierge'] },
  { id: 'transportation', name: 'Transportation', icon: 'shuttle', keywords: ['Shuttle services', 'Custom trips', 'Dependable drivers'] },
];

const REASONS = [
  { title: 'Experience', body: 'Decades of parking and valet experience, gathered at properties like The Four Seasons and Omni Houston.' },
  { title: 'Professional service', body: 'A trained, well-groomed team focused on every guest interaction.' },
  { title: 'Operational support', body: 'Organized parking management built around your property, with an experienced manager on site.' },
  { title: 'Local expertise', body: 'Houston-focused knowledge and service from a locally owned company.' },
];

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={svc.arrow}>
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

export default async function AboutPage() {
  const href0 = await regencyBase();
  const PROPOSAL = `${href0}/#quote`;
  return (
    <main>
      {/* 01 Hero */}
      <section className={svc.hero} style={{ backgroundImage: `url(${IMG}/Regency-valet3.jpg)` }}>
        <div className={`${base.wrap} ${svc.heroInner}`}>
          <p className={base.eyebrow}>About us</p>
          <h1 className={`${svc.heroTitle} ${styles.heroTitle}`}>
            More than parking. We’re your partner in every arrival.
          </h1>
          <p className={svc.heroBody}>
            For more than 40 years, Regency Parking Services has helped properties deliver professional,
            reliable parking experiences across Houston.
          </p>
          <a className={`${base.btn} ${svc.btnPlain}`} href={PROPOSAL}>
            Request a Proposal
            <Arrow />
          </a>
        </div>
        <p className={`${base.wrap} ${svc.heroTags}`}>
          <span>40+ Years of Experience</span>
          <span>Houston-Based</span>
          <span>Professional Parking Management</span>
        </p>
      </section>

      {/* 02 Our story */}
      <section className={svc.section}>
        <div className={`${base.wrap} ${styles.story}`}>
          <div>
            <p className={base.eyebrow}>Our story</p>
            <h2 className={svc.h2}>Built on experience. Driven by service.</h2>
            <div className={styles.prose}>
              <p>
                Regency Parking Services is built around a simple idea: parking should be more than
                moving cars. It should be part of a seamless experience for every guest, customer,
                resident and client.
              </p>
              <p>
                Locally owned and operated in Houston, we bring over 40 combined years in the industry to
                hotels, restaurants, entertainment venues, hospitals, high-rise condominiums and private
                events, giving us the knowledge to adapt our service to the needs of every property.
              </p>
              <p>
                Today, we combine experienced people, dependable operations and attentive service to help
                our clients create better experiences from the moment their guests arrive.
              </p>
            </div>
            <a className={`${base.btn} ${base.btnGhost} ${svc.btnOutline}`} href={`${href0}/services`}>
              Explore Our Services
              <Arrow />
            </a>
          </div>
          <figure className={styles.storyMedia}>
            {/* eslint-disable-next-line @next/next/no-img-element -- static client asset */}
            <img src={`${IMG}/Regency-valet1.jpg`} alt="A Regency valet helping a guest out of her car" />
            <figcaption className={styles.storyBadge}>
              <strong>40+</strong>
              <span>
                <b>Years of experience</b>
                Experience that continues to move forward.
              </span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* 03 Mission, vision & values */}
      <section className={`${svc.section} ${styles.purpose}`}>
        <div className={base.wrap}>
          <header className={svc.splitHead}>
            <div>
              <p className={base.eyebrow}>Our mission, vision &amp; values</p>
              <h2 className={svc.h2}>Guided by purpose. Driven by people.</h2>
            </div>
            <p>
              Valet service is the first impression your guests get and the final touch as they leave. We
              treat both moments with the same care.
            </p>
          </header>
          <div className={styles.purposeGrid}>
            {PURPOSE.map((p) => (
              <article key={p.title} className={styles.purposeCard}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  {PURPOSE_ICONS[p.icon]}
                </svg>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </article>
            ))}
          </div>
          <div className={styles.values}>
            <h3>Our values</h3>
            <ul>
              {VALUES.map((v) => (
                <li key={v.title}>
                  <strong>{v.title}</strong>
                  <span>{v.body}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 04 Our people */}
      <section className={styles.people} style={{ backgroundImage: `url(${IMG}/valet.jpg)` }}>
        <div className={`${base.wrap} ${styles.peopleInner}`}>
          <div>
            <p className={base.eyebrow}>Our people</p>
            <h2>The people behind the experience.</h2>
            <p>
              Great parking service starts with great people. Regency personally trains professional staff
              with impeccable driving records, and hires only those who share our philosophy and goals.
            </p>
            <p>
              From the first welcome to the final departure, our team works to provide an experience that
              is organized, courteous and dependable.
            </p>
            <a className={`${base.btn} ${svc.btnPlain}`} href="#contact">
              Talk to Our Team
              <Arrow />
            </a>
          </div>
          <ul className={styles.traits} aria-label="What our team stands for">
            <li>Professional</li>
            <li>Attentive</li>
            <li>Experienced</li>
          </ul>
        </div>
      </section>

      {/* 05 What makes Regency different */}
      <section className={svc.why}>
        <div className={`${base.wrap} ${svc.whyInner}`}>
          <div>
            <p className={base.eyebrow}>Experience that matters</p>
            <p className={svc.whyStat}>
              <strong>40+</strong>
              <span>Years of experience delivering professional parking solutions across Houston.</span>
            </p>
          </div>
          <ul className={styles.pillars}>
            {PILLARS.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* 06 Our expertise */}
      <section className={svc.section}>
        <div className={base.wrap}>
          <header className={svc.splitHead}>
            <div>
              <p className={base.eyebrow}>Our expertise</p>
              <h2 className={svc.h2}>Experience across every environment.</h2>
            </div>
            <p>Six kinds of property, one standard of service. Each links to how we run it.</p>
          </header>
          <ul className={styles.expertise}>
            {EXPERTISE.map((e) => (
              <li key={e.id}>
                <a href={`${href0}/services#${e.id}`}>
                  <ServiceIcon name={e.icon} className={styles.expIcon} />
                  <span className={styles.expText}>
                    <strong>{e.name}</strong>
                    <small>{e.keywords.join(' · ')}</small>
                  </span>
                  <Arrow />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Current clients */}
      <ClientsSection />

      {/* 07 Why clients partner with us */}
      <section className={`${svc.section} ${styles.reasonsWrap}`}>
        <div className={`${base.wrap} ${styles.reasons}`}>
          <div>
            <p className={base.eyebrow}>Why clients partner with us</p>
            <h2 className={svc.h2}>The practical reasons properties choose Regency.</h2>
          </div>
          <ol>
            {REASONS.map((r, i) => (
              <li key={r.title}>
                <span className={svc.num}>0{i + 1}</span>
                <div>
                  <strong>{r.title}</strong>
                  <p>{r.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 08 Houston */}
      <section className={styles.houston} style={{ backgroundImage: `url(${IMG}/houston-city.jpg)` }}>
        <div className={`${base.wrap} ${styles.houstonInner}`}>
          <p className={base.eyebrow}>Proudly serving Houston</p>
          <h2>Local knowledge. Professional service. Long-term relationships.</h2>
          <p>
            We understand the properties, people and pace of Houston. Our local presence lets us build
            strong relationships and deliver parking solutions that fit the environments we serve.
          </p>
          <p className={svc.heroTags}>
            <span>Locally Owned</span>
            <span>Houston Based</span>
            <span>Service Driven</span>
          </p>
        </div>
      </section>

      {/* 09 Closing call to action */}
      <section className={svc.cta} style={{ backgroundImage: `url(${IMG}/Regency-valet1.jpg)`, backgroundPosition: '70% 40%' }}>
        <div className={`${base.wrap} ${svc.ctaInner}`}>
          <p className={base.eyebrow}>Let’s work together</p>
          <h2>Your property deserves a parking partner you can rely on.</h2>
          <p>
            Tell us about your property, event or parking needs. Our team is ready to discuss a solution
            built around you.
          </p>
          <div className={styles.ctaRow}>
            <a className={`${base.btn} ${svc.btnPlain}`} href={PROPOSAL}>
              Request a Proposal
              <Arrow />
            </a>
            <a className={`${base.btn} ${base.btnGhost} ${svc.btnPlain}`} href="#contact">
              Contact Us
              <Arrow />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
