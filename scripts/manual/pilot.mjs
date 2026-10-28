// Ignition / K14C pilot documents: kept as a regression set with source-verified counts.
export const PILOT_IDS = [
  'AJPHSB0P1832001', 'AJPHSB0P1833001', 'AJPHSB0P1834001', 'AJPHSB0P1834002',
  'AJPHSB0P1836001', 'AJPHSB0P1836002', 'AJPHSB0P1836003', 'AJPHSB0P1836004',
  'AJPHSB0P1836005', 'AJPHSB0P1837001', 'AJPHSB0P1838001',
];
export const PILOT_COUNTS = Object.freeze({graphic:12,table:5,testgroup:9,result:18,action:18});

// Published scope: section files of webdocstructure_XX.xml and the configuration variant chosen in each.
// Sections without variants use the source's "configtype none title" entry.
export const MANUAL_SCOPE = Object.freeze({
  id: 'engine-k14c',
  variant: 'K14C',
  sectionFiles: ['10','11','12','13','14','15','16','17','18','19','1A','1B'],
});
export const NO_VARIANT = 'configtype none title';
export const IMAGE_QUALITY = 80;
