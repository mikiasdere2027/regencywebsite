import DemoForm from './DemoForm';
import { PHONE, SERVICE_NAMES } from './site';
import styles from './page.module.css';

/**
 * The hero's "Quick Request" lead card (name, phone/email, service), emailed
 * to Regency through DemoForm. Styled for a dark background.
 */
export default function QuickRequestCard({ services = SERVICE_NAMES }: { services?: readonly string[] }) {
  return (
    <div className={styles.quickCard}>
      <h2>Quick Request</h2>
      <p>Let’s discuss how our valet and parking solutions can elevate your guest experience.</p>
      <DemoForm
        variant="icon"
        submitLabel="Submit Request"
        fields={[
          { name: 'name', label: 'Name', required: true, wide: true, icon: 'user' },
          { name: 'contact', label: 'Phone / Email', required: true, wide: true, icon: 'contact' },
          { name: 'service', label: 'Service Needed', options: [...services], required: true, wide: true, icon: 'car' },
        ]}
      />
      <p className={styles.quickNote}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
        </svg>
        Prefer to talk? Call <a href={`tel:${PHONE.replace(/-/g, '')}`}>{PHONE}</a>
      </p>
    </div>
  );
}
