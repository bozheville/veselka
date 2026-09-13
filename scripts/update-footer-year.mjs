import { readFileSync, writeFileSync } from 'fs';

const path = 'public/locales/en/footer.json';
const currentYear = new Date().getFullYear();

const content = readFileSync(path, 'utf8');
const updated = content.replace(/updated in \d{4}/, `updated in ${currentYear}`);

if (updated !== content) {
  writeFileSync(path, updated);
}
