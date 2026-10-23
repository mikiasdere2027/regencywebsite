import type { Metadata } from 'next';
import HeroSlider, { type Highlight, type Slide } from './HeroSlider';
import StepForm from './StepForm';
import ClientsSection from './ClientsSection';
import ScrollZoomCar from './ScrollZoomCar';
import ServiceIcon, { type ServiceIconName } from './ServiceIcon';
import { IMG, PHONE } from './site';
import styles from './page.module.css';

/**
 * Website redesign mockup for a prospect, Regency Parking Services (Houston
 * valet). Every word and photo is theirs, lifted from regencyparkingservice.com;
 * only the design is new. It renders without Rem Assist's chrome (see
 * components/layout/SiteChrome.tsx), is noindex, and is deliberately absent from
 * ROUTES in lib/site.ts so it never reaches the sitemap or nav. The forms are
 * visual only.
 */

export const metadata: Metadata = {
  title: { absolute: 'Regency Valet Parking Services | Houston Valet Parking Service' },
  description:
    'Regency Parking Services — locally owned Houston valet for hotels, private and corporate events, hospitals, high-rise condominiums and transportation.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Regency Valet Parking Services',
    siteName: 'Regency Parking Services',
    url: '/',
    images: ['/images/clients/regency/Regency-valet1.jpg'],
  },
};

const SLIDES: Slide[] = [
  {
    title: 'Serve With Mission',
    body: 'Shaping and altering the structure of customer service for the modern era.',
    image: `${IMG}/Regency-valet1.jpg`,
  },
  {
    title: 'Service Focused Company',
    body: 'We are passionate about providing the best possible experience to our partners and customers. Our vision has always been and always will be about the quality of service and execution of our commitments.',
    image: `${IMG}/Regency-valet2.jpg`,
  },
  {
    title: 'Customers First',
    body: 'We connect with our customers even just for a few moments. Sure, it starts with that first encounter, but our work goes much farther than that. From the opening of the door to the parking of the car to the return of the keys; we are fully engaged with our customers.',
    image: `${IMG}/Regency-valet3.jpg`,
  },
  {
    title: 'Partner to Grow',
    body: 'To us being a partner is not just a job it’s our passion. We work together to create long-term and sustainable relationships with our partners and staff. Our commitment is to hold each other accountable to the highest of standards.',
    image: `${IMG}/valet.jpg`,
  },
];

// Mobile shows this one static intro instead of the rotating slide copy.
const MOBILE_INTRO = {
  title: 'Premier Valet & Parking Services',
  body: 'Serving hotels, hospitals, events and high-rise condos across Houston.',
};

const SERVICES: { title: string; icon: ServiceIconName; body: string }[] = [
  { title: 'Hotels', icon: 'hotel', body: 'Elevate guest experiences with seamless, professional valet services.' },
  {
    title: 'Private Events',
    icon: 'event',
    body: 'Ensure your special moments run smoothly with trusted parking and valet support.',
  },
  {
    title: 'Hospitals',
    icon: 'hospital',
    body: 'Provide safe, efficient parking solutions for patients, visitors and staff.',
  },
  {
    title: 'Corporate Events',
    icon: 'corporate',
    body: 'Make a lasting impression with professional parking and valet services for your business events.',
  },
  {
    title: 'High Rise Condos',
    icon: 'condo',
    body: 'Premium parking management for residents and guests, with reliable, courteous service.',
  },
  {
    title: 'Transportation',
    icon: 'shuttle',
    body: 'Keep your operations moving with professional parking and ground transportation support.',
  },
];

const HIGHLIGHTS: Highlight[] = [
  { title: '40+ Years', detail: 'Combined experience', icon: 'years' },
  { title: 'Four Seasons & Omni', detail: 'Leadership background', icon: 'hotel' },
  { title: 'On Site', detail: 'Manager on every shift', icon: 'shield' },
  { title: 'Houston', detail: 'Locally owned', icon: 'pin' },
];

const CLIENTS = [
  'Corporate offices',
  'Social events',
  'High-rise living',
  'Private parties',
  'Hotels & restaurants',
  'Entertainment venues',
];

const PILLARS = [
  {
    title: 'Our Mission',
    body: 'Our mission is to deliver exceptional service to every customer every time. We do this by having each member of our staff living by the principles of our company.',
  },
  {
    title: 'Our Services',
    body: 'We are passionate about providing the best possible experience to our partners and customers. Our vision has always been and always will be about the quality of service and execution of our commitments.',
  },
  {
    title: 'Our Customers',
    body: 'We connect with our customers even just for a few moments. From the opening of the door to the parking of the car to the return of the keys; we are fully engaged with our customers.',
  },
  {
    title: 'Our Partners',
    body: 'To us being a partner is not just a job it’s our passion. We work together to create long-term and sustainable relationships with our partners and staff.',
  },
];

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


export default function RegencyPage() {
  return (
    <main>
      <HeroSlider slides={SLIDES} highlights={HIGHLIGHTS} mobileIntro={MOBILE_INTRO} />

      <section id="service" className={`${styles.section} ${styles.services}`}>
        <div className={`${styles.wrap} ${styles.servicesSplit}`}>
          <header className={styles.servicesIntro}>
            <p className={`${styles.eyebrow} ${styles.eyebrowRule}`}>What we do</p>
            <h2 className={styles.servicesTitle}>Parking Solutions Built Around Your Property</h2>
            <p className={styles.lede}>
              From high-end hotels to corporate events, we deliver professional valet and parking
              management services that enhance guest experiences and keep your operations running
              smoothly.
            </p>
            <a className={styles.textLink} href="#quote">
              Explore our services
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 12h14m-6-6 6 6-6 6" />
              </svg>
            </a>
          </header>
          <div className={styles.serviceGrid}>
            {SERVICES.map((s) => (
              <a key={s.title} href="#quote" className={styles.serviceCard}>
                <span className={styles.cardTop}>
                  <ServiceIcon name={s.icon} />
                  <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.cardArrow}>
                    <path d="M7 17 17 7M9 7h8v8" />
                  </svg>
                </span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <ClientsSection />

      <section
        className={styles.advantage}
        style={{ backgroundImage: `url(${IMG}/houston-city.jpg)` }}
      >
        <div className={`${styles.wrap} ${styles.advantageInner}`}>
          <div>
            <p className={styles.eyebrow}>The Regency advantage</p>
            <h2 className={styles.h2}>Forty years of front-drive experience, on every shift.</h2>
          </div>
          <div className={styles.advantageBody}>
            <p>
              Regency Parking Services offers a distinct operating advantage over our competitors.
              Collectively we have gathered over 40 years of parking management skills from
              prestigious hotels such as The Four Seasons and Omni Houston Hotels. To complement our
              experienced staff, we provide an experienced manager on site at all times.
            </p>
            <p>
              We offer extensive experience in providing valet services to anyone who wishes to
              create an exceptional first impression. Our services extend to a vast array of
              clients including:
            </p>
            <ul className={styles.chips}>
              {CLIENTS.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.philosophy}`}>
        <div className={`${styles.wrap} ${styles.philosophyInner}`}>
          <p className={styles.eyebrow}>Company philosophy</p>
          <blockquote className={styles.motto}>“Delivering on our promise of Excellence.”</blockquote>
          <div className={styles.philosophyCols}>
            <p>
              Valet service is a perfect opportunity to make a positive first impression; it is also
              the final touch your guests will encounter as you bid them a good evening after your
              special event. We believe every occasion and company is unique and our job is to meet
              and exceed the expectations of every client. At Regency Parking Services, our customers
              always come first.
            </p>
            <ScrollZoomCar src="/images/car.png" />
            <p>
              We believe that we are an extension of your company and always strive to deliver an
              experience that won’t soon be forgotten by your customers or guests. Our commitment to
              you is to deliver excellent service without fail — every customer, every event, every
              time. This is our foundation and how Regency Parking Services is emerging as a leading
              valet company.
            </p>
          </div>
        </div>
      </section>

      <section id="about" className={`${styles.section} ${styles.about}`}>
        <div className={`${styles.wrap} ${styles.aboutGrid}`}>
          <div className={styles.aboutPhoto}>
            {/* eslint-disable-next-line @next/next/no-img-element -- static client asset, sized by CSS */}
            <img src={`${IMG}/Regency-valet3.jpg`} alt="A Regency valet greeting a guest at the car door" />
          </div>
          <div>
            <p className={styles.eyebrow}>About us</p>
            <h2 className={styles.h2}>Regency Parking Services LLC</h2>
            <p>
              Regency Parking is a locally owned and operated company in Houston, Texas. We have over
              40 combined years in the industry. Our services range from hotels, restaurants,
              entertainment venues, hospitals, high rise condominiums, and private events.
            </p>
            <p>
              Our proven history of reliability, professionalism, and problem solving make Regency
              Parking Services the number one choice to fulfill the unique requirements of all of our
              clients. Our goal is to provide exceptional service to each client every time without
              exception. We accomplish this by staying innovative and staying ahead of our
              competition.
            </p>
            <p>
              Regency Parking employs and personally trains professional staff with impeccable
              driving records and past employment history. We ensure our staff members are
              well-groomed, polite, guest service oriented, timely, and professional. We hire only
              those individuals that share our philosophy and goals.
            </p>
          </div>
        </div>
        <div className={styles.wrap}>
          <div className={styles.pillars}>
            {PILLARS.map((p, i) => (
              <article key={p.title}>
                <span className={styles.pillarNum}>0{i + 1}</span>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="quote" className={`${styles.section} ${styles.quote}`}>
        <div className={`${styles.wrap} ${styles.quoteGrid}`}>
          <div className={styles.quoteIntro}>
            <p className={styles.eyebrow}>Proposal request</p>
            <h2 className={styles.h2}>Tell us about your event.</h2>
            <p>
              Weddings, galas, corporate functions or an ongoing property contract — share the
              details and our team will put together a proposal tailored to your guests.
            </p>
            <a className={styles.phoneLink} href={`tel:${PHONE.replace(/-/g, '')}`}>
              Prefer to talk? Call {PHONE}
            </a>
          </div>
          <StepForm
            className={styles.form}
            steps={[
              {
                title: 'Your details',
                hint: 'Who should we send the proposal to?',
                fields: [
                  { name: 'name', label: 'Name', required: true },
                  { name: 'business', label: 'Name of business' },
                  { name: 'email', label: 'Email', type: 'email', required: true },
                  { name: 'phone', label: 'Phone', type: 'tel' },
                  { name: 'cell', label: 'Cell', type: 'tel', span: 6 },
                ],
              },
              {
                title: 'Event details',
                hint: 'When and where is it happening?',
                fields: [
                  { name: 'day', label: 'Day', options: DAYS, span: 2 },
                  { name: 'date', label: 'Event date', type: 'date', span: 2 },
                  { name: 'time', label: 'Event time', type: 'time', span: 2 },
                  { name: 'street', label: 'Street address', span: 6 },
                  { name: 'city', label: 'City', span: 2 },
                  { name: 'state', label: 'State', span: 2 },
                  { name: 'zip', label: 'Zip code', span: 2 },
                  { name: 'message', label: 'Additional event information', textarea: true, span: 6 },
                ],
              },
            ]}
          />
        </div>
      </section>
    </main>
  );
}
