// Ignition / K14C pilot documents: kept as a regression set with source-verified counts.
export const PILOT_IDS = [
  'AJPHSB0P1832001', 'AJPHSB0P1833001', 'AJPHSB0P1834001', 'AJPHSB0P1834002',
  'AJPHSB0P1836001', 'AJPHSB0P1836002', 'AJPHSB0P1836003', 'AJPHSB0P1836004',
  'AJPHSB0P1836005', 'AJPHSB0P1837001', 'AJPHSB0P1838001',
];
export const PILOT_COUNTS = Object.freeze({graphic:12,table:5,testgroup:9,result:18,action:18});

// [section file code of webdocstructure_XX.xml, ...variant branches]. No branch means the source's
// variant-free "configtype none title" entry. Several branches are published where equipment differs
// between ZC33S cars (SRS 4ch/10ch, plain/adaptive cruise control).
// Left out: 4WD (3B differential, 3C transfer, 3D propeller shaft, 2C/3A 4WD branches), CVT (5E), AGS (5D),
// 5MT, drum rear brakes, idle stop (10I), hybrid and mild hybrid (11, 11A, 11B, 10K, overview 11).
const section = (code, ...variants) => Object.freeze({code, variants: Object.freeze(variants)});
export const MANUAL_SCOPE = Object.freeze({
  id: 'zc33s',
  chapters: Object.freeze([
    {number:'0', title:'Общие сведения', sections:[section('F0','спорт'),section('00'),section('01'),section('02')]},
    {number:'1', title:'Двигатель', sections:[section('F1','спорт'),section('10'),
      ...['11','12','13','14','15','16','17','18','19','1A','1B'].map(code=>section(code,'K14C'))]},
    {number:'2', title:'Подвеска', sections:[section('F2'),section('20'),section('21'),section('22'),section('23','2WD'),section('24')]},
    {number:'3', title:'Приводные валы', sections:[section('F3'),section('30'),section('31','передний')]},
    {number:'4', title:'Тормоза', sections:[section('F4'),section('40'),section('41'),section('42'),section('43','диск'),section('44'),section('46')]},
    {number:'5', title:'Трансмиссия', sections:[section('F5'),section('50'),section('51'),section('52','6MT'),section('53')]},
    {number:'6', title:'Рулевое управление', sections:[section('F6'),section('60'),section('61'),section('62'),section('63')]},
    {number:'7', title:'Отопление и кондиционер', sections:[section('F7'),section('70'),section('72')]},
    {number:'8', title:'Подушки и ремни безопасности', sections:[section('F8'),section('80'),section('81'),section('82','4ch','10ch')]},
    {number:'9', title:'Кузов и электрооборудование', sections:[section('F9'),section('90'),
      ...['91','92','93','94','95','96','97','98','9A','9B','9C','9F'].map(code=>section(code))]},
    {number:'10', title:'Системы управления', sections:[section('FA'),section('A0'),
      section('A1','круиз-контроль','адаптивный круиз-контроль'),section('A2'),section('A3'),section('A5'),section('A8','K14C'),section('AA')]},
  ].map(chapter=>Object.freeze({...chapter,sections:Object.freeze(chapter.sections)}))),
});
export const NO_VARIANT = 'configtype none title';

// Site titles where the source section title is a mistranslation or an overview of the chapter.
// The source title stays in index.json as sourceTitle.
export const SECTION_TITLES = Object.freeze({
  F0:'обзор', F1:'обзор', F2:'обзор', F3:'обзор', F4:'обзор', F5:'обзор', F6:'обзор', F7:'обзор', F8:'обзор', F9:'обзор', FA:'обзор',
  '01':'введение', 19:'запуск', 53:'сцепление', 62:'рулевое управление', 97:'сиденья', '9B':'кузов',
  // Machine-translated section names that read wrong: "engine electrical devices", "engine mechanical", "washer", etc.
  13:'электрооборудование двигателя', 14:'механическая часть двигателя', 21:'общая диагностика подвески',
  31:'приводные валы', 41:'тормозная система', 61:'общая диагностика рулевого управления', 63:'усилитель рулевого управления',
  82:'подушки безопасности SRS и преднатяжители ремней', 93:'приборы и информация для водителя', 94:'стеклоочистители и омыватели',
  95:'стекла, стеклоподъемники и зеркала', 96:'дверные замки', 98:'наружная и внутренняя отделка', '9A':'капот, крылья и двери',
  '9C':'лакокрасочное покрытие', A2:'электрооборудование кузова', A3:'иммобилайзер', AA:'системы помощи водителю',
});

// Exact repairs of malformed source XML, applied before parsing and listed in report.json.
export const SOURCE_FIXES = Object.freeze({
  // An unescaped "<" in running text makes the XML ill-formed.
  AJPHSB0PF40I007: [['отклонения от курса < целевая', 'отклонения от курса &lt; целевая']],
});
export const IMAGE_QUALITY = 80;
