import { cpSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const output = join(root, '.next', 'standalone');
const copies = [
  [join(root, 'public'), join(output, 'public')],
  [join(root, '.next', 'static'), join(output, '.next', 'static')],
];

for (const [source, destination] of copies) {
  if (!existsSync(source)) throw new Error(`Standalone package source is missing: ${source}`);
  mkdirSync(dirname(destination), { recursive: true });
  cpSync(source, destination, { recursive: true, force: true });
}

console.log(`Standalone bundle staged at ${output}`);
