import { regencyBase } from './base';
import styles from './page.module.css';

export default async function RegencyNotFound() {
  const home = (await regencyBase()) || '/';
  return (
    <main className={styles.notFound}>
      <p className={styles.eyebrow}>Page not found</p>
      <h1>This page has moved or no longer exists.</h1>
      <p>Our website has a new look. Everything you need is a click away.</p>
      <a className={styles.btn} href={home}>Back to the homepage</a>
    </main>
  );
}
