import { execSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');
const siteDir = join(projectRoot, '_site');

let built = false;

export function ensureBuilt() {
  if (built) return;
  if (!existsSync(join(siteDir, 'index.html'))) {
    execSync('npx eleventy', { cwd: projectRoot, stdio: 'pipe' });
  }
  built = true;
}

export function readPage(relativePath) {
  ensureBuilt();
  return readFileSync(join(siteDir, relativePath), 'utf-8');
}

export function readSource(relativePath) {
  return readFileSync(join(projectRoot, 'src', relativePath), 'utf-8');
}

export function readJson(relativePath) {
  return JSON.parse(readFileSync(join(projectRoot, 'src', relativePath), 'utf-8'));
}
