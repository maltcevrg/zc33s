import { DOMParser } from '@xmldom/xmldom';

const BUILTIN = new Set(['lt', 'gt', 'amp', 'apos', 'quot']);

function localEntities(source) {
  const clean = source.replace(/<!--[\s\S]*?-->/g, '');
  const map = new Map();
  const rest = clean.replace(/<!ENTITY\s+([A-Za-z][\w.-]*)\s+("[^"]*"|'[^']*')\s*>/g, (_, name, quoted) => {
    const value = quoted.slice(1, -1);
    if (map.has(name) || /&[A-Za-z][\w.-]*;/.test(value) || /<!|SYSTEM|PUBLIC/i.test(value)) {
      throw new Error(`Unsupported or recursive entity: ${name}`);
    }
    map.set(name, value);
    return '';
  });
  if (rest.trim()) throw new Error('Unsupported entity declaration');
  return map;
}

export function parseXmlStrict(source, { entitySource } = {}) {
  let xml = source.replace(/^\uFEFF/, '');
  const dtd = xml.match(/<!DOCTYPE[\s\S]*?(?:\]>|>)/i);
  if (dtd) {
    // The only permitted DTD is the manual's fixed local parameter-entity include.
    const expected = /^<!DOCTYPE\s+suzuki\s*\[\s*<!ENTITY\s+%\s+sdatacharaents\s+SYSTEM\s+(["'])\.\.[\\/]config8[\\/]sdatacharaents\.txt\1\s*>\s*%sdatacharaents;\s*\]>$/;
    // A DTD's first > is inside its internal subset, so locate the complete subset first.
    const end = xml.indexOf(']>', dtd.index);
    const whole = end >= 0 ? xml.slice(dtd.index, end + 2) : dtd[0];
    if (!entitySource || !expected.test(whole)) throw new Error('Unsupported external DTD');
    xml = xml.slice(0, dtd.index) + xml.slice(dtd.index + whole.length);
  }
  if (/<!DOCTYPE|<!ENTITY/i.test(xml)) throw new Error('Unexpected XML declaration');
  const entities = entitySource ? localEntities(entitySource) : new Map();
  xml = xml.replace(/&([A-Za-z][\w.-]*);/g, (ref, name) => {
    if (BUILTIN.has(name)) return ref;
    if (!entities.has(name)) throw new Error(`Unknown entity: ${name}`);
    return entities.get(name);
  });
  const parsed = new DOMParser({ onError(level, message) { throw new Error(`XML ${level}: ${message}`); } }).parseFromString(xml, 'text/xml');
  if (!parsed.documentElement) throw new Error('XML has no root');
  return parsed;
}
