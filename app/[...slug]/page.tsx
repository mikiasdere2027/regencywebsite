import { notFound } from 'next/navigation';

/**
 * Any path on regencyparkingservice.com that isn't a Regency page lands here
 * (middleware.ts rewrites everything into this subtree), so it gets Regency's
 * 404 inside Regency's layout instead of Rem Assist's.
 */
export default function RegencyCatchAll() {
  notFound();
}
