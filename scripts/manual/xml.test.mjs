import test from 'node:test';
import assert from 'node:assert/strict';
import { parseXmlStrict } from './xml.mjs';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { PILOT_IDS } from './pilot.mjs';

test('XML preserves mixed text and numerical character references', () => {
  const doc = parseXmlStrict('<ptxt>A<emph>18</emph> B&#176;</ptxt>');
  assert.equal(doc.documentElement.textContent, 'A18 B°');
});
test('XML rejects malformed markup, unknown and external entities', () => {
  for (const xml of ['<a>&unknown;</a>', '<a><b></a>', '<!DOCTYPE a SYSTEM "https://example.com/evil"><a/>', '<!DOCTYPE a [<!ENTITY x SYSTEM "file:///secret">]><a>&x;</a>']) {
    assert.throws(() => parseXmlStrict(xml));
  }
});
test('local entity declarations respect comments and preserve structural symbols', () => {
  const entitySource = '<!-- <!ENTITY deg "wrong"> --><!ENTITY deg "&#176;"><!ENTITY star "<symbol name=\'star\' type=\'chara\'/>">';
  const doc = parseXmlStrict('<a>&deg;&star;</a>', { entitySource });
  assert.equal(doc.documentElement.firstChild.data, '°');
  assert.equal(doc.getElementsByTagName('symbol')[0].getAttribute('name'), 'star');
  assert.throws(() => parseXmlStrict('<a>&loop;</a>', { entitySource: '<!ENTITY loop "&loop;">' }));
});
test('only expected local DTD include is permitted', () => {
  const xml = '<!DOCTYPE suzuki [<!ENTITY % sdatacharaents SYSTEM "..\\config8\\sdatacharaents.txt">%sdatacharaents;]><suzuki>&deg;</suzuki>';
  assert.equal(parseXmlStrict(xml, { entitySource: '<!ENTITY deg "&#176;">' }).documentElement.textContent, '°');
  assert.throws(() => parseXmlStrict(xml));
});

test('all real pilot XML files parse and fixture hashes match source manifest', () => {
  const read = name => readFileSync(new URL(`./fixtures/${name}`, import.meta.url));
  const manifest = JSON.parse(read('manifest.json'));
  for (const [name, record] of Object.entries(manifest)) {
    assert.equal(createHash('sha256').update(read(name)).digest('hex'), record.sha256, name);
  }
  for (const id of PILOT_IDS) {
    const doc = parseXmlStrict(read(`${id}.xml`).toString('utf8'), { entitySource: read('sdatacharaents.txt').toString('utf8') });
    assert.equal(doc.getElementsByTagName('servinfo')[0].getAttribute('servinfosgmlid'), id);
  }
});
