import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeArchivePath, validateArchiveEntries, decodeListing } from './archive.mjs';

test('Windows OEM file names decode without destroying Cyrillic paths', () => {
  assert.equal(decodeListing(Buffer.from('90e3aaaea2aea4e1e2a2ae', 'hex'), 'ibm866'), 'Руководство');
});

test('archive rejects traversal, absolute and ambiguous names', () => {
  for (const path of ['../escape', 'a/../b', 'C:\\escape.xml', '/escape', '\\\\host\\share', 'a\0b', 'a:stream', 'a/*']) {
    assert.throws(() => normalizeArchivePath(path), path);
  }
  assert.equal(normalizeArchivePath('руководство\\Xml\\A.xml'), 'руководство/Xml/A.xml');
  assert.throws(() => validateArchiveEntries(['a/b.xml', 'a\\b.xml']));
  assert.throws(() => validateArchiveEntries(['a/B.xml', 'a/b.xml']));
});
