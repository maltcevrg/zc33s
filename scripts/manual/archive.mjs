import { spawnSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve, sep } from 'node:path';

export function normalizeArchivePath(name) {
  const path = name.replaceAll('\\', '/');
  if (!path || path.startsWith('/') || /[:\0*?]/.test(path) || path.split('/').some(p => p === '..' || p === '.')) {
    throw new Error(`Unsafe archive path: ${name}`);
  }
  return path.replace(/\/$/, '');
}

export function validateArchiveEntries(names) {
  const paths = new Map();
  for (const name of names) {
    const path = normalizeArchivePath(name);
    const key = path.toLowerCase();
    if (paths.has(key)) throw new Error(`Duplicate archive path: ${path}`);
    paths.set(key, path);
  }
  return [...paths.values()];
}

export function decodeListing(bytes, encoding) {
  return new TextDecoder(encoding, { fatal: true }).decode(bytes).replace(/^\uFEFF/, '');
}

export function openArchive(archivePath, { unrarPath, listingEncoding = process.env.UNRAR_LIST_ENCODING || (process.platform === 'win32' ? 'ibm866' : 'utf-8') } = {}) {
  const executable = unrarPath || process.env.UNRAR_PATH || (process.platform === 'win32' ? 'C:/Program Files/WinRAR/UnRAR.exe' : 'unrar');
  if (!existsSync(archivePath)) throw new Error('Archive not found');
  const run = (args, maxBuffer = 32 * 1024 * 1024) => {
    const result = spawnSync(executable, args, { maxBuffer, windowsHide: true });
    if (result.error) throw result.error;
    if (result.status !== 0) throw new Error(`UnRAR failed (${result.status}): ${result.stderr?.toString().slice(0, 400)}`);
    return result.stdout;
  };
  // This Windows UnRAR emits OEM console bytes even with -scu; its encoding is explicit and configurable.
  const listed = decodeListing(run(['lb', resolve(archivePath)]), listingEncoding).trim().split(/\r?\n/).filter(Boolean);
  const normalized = validateArchiveEntries(listed);
  const originalNames = new Map(normalized.map((name, i) => [name, listed[i]]));
  // One UnRAR process per entry is slow for thousands of files: extract once into a private temp directory.
  let extracted = null;
  const extractedRoot = () => {
    if (!extracted) {
      extracted = mkdtempSync(join(tmpdir(), 'manual-archive-'));
      run(['x', '-inul', '-y', resolve(archivePath), extracted + sep], 1024 * 1024);
    }
    return extracted;
  };
  return {
    list: () => [...normalized],
    read(path) {
      const name = normalizeArchivePath(path);
      if (!originalNames.has(name)) throw new Error(`Archive entry missing: ${name}`);
      const root = extractedRoot();
      const file = resolve(root, originalNames.get(name));
      if (!file.startsWith(root + sep)) throw new Error(`Unsafe archive path: ${name}`);
      return readFileSync(file);
    },
    close() {
      if (extracted) rmSync(extracted, { recursive: true, force: true });
      extracted = null;
    },
  };
}
