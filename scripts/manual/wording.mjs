// Corrections of systematic machine-translation errors in the Russian source text.
// Only unambiguous terms are replaced, with explicit case forms so the sentence keeps its grammar;
// replacements keep the capital letter of the original. Headings are replaced only on an exact match,
// because the same words are correct in running text ("удаление DTC").

const w = '(?![\\p{L}\\p{N}])';
const phrase = (from, to) => [new RegExp(`(?<![\\p{L}\\p{N}])${from}${w}`, 'giu'), to];

export const WORDING_FIXES = Object.freeze([
  // "Combination meter": the instrument cluster, not a "combined counter".
  ...[
    ['комбин(?:ированн|ационн)ый счетчик', 'щиток приборов'],
    ['комбин(?:ированн|ационн)ого счетчика', 'щитка приборов'],
    ['комбин(?:ированн|ационн)ому счетчику', 'щитку приборов'],
    ['комбин(?:ированн|ационн)ым счетчиком', 'щитком приборов'],
    ['комбин(?:ированн|ационн)ом счетчике', 'щитке приборов'],
    ['комбин(?:ированн|ационн)ых счетчиков', 'щитка приборов'],
    ['комбин(?:ированн|ационн)ыми счетчиками', 'щитком приборов'],
    ['комбинации счетчиков', 'щитка приборов'],
    ['комбинация счетчиков', 'щиток приборов'],
  ].map(([from, to]) => phrase(from, to)),
  // "IG coil": ignition coil.
  phrase('катушк(а|и|у|е|ой|ам|ами|ах) IG', 'катушк$1 зажигания'),
  // Brake caliper "slide pin".
  ...[
    ['скользящий штифт', 'направляющий палец'], ['скользящего штифта', 'направляющего пальца'],
    ['скользящему штифту', 'направляющему пальцу'], ['скользящим штифтом', 'направляющим пальцем'],
    ['скользящем штифте', 'направляющем пальце'], ['скользящие штифты', 'направляющие пальцы'],
    ['скользящих штифтов', 'направляющих пальцев'],
  ].map(([from, to]) => phrase(from, to)),
  // Camshaft: "cam angle sensor", intake/exhaust cam (VVT), cam sprocket.
  phrase('угла поворота кулачка', 'положения распредвала'),
  phrase('(впускного|выпускного) кулачка', '$1 распредвала'),
  phrase('распределительного кулачка', 'распредвала'),
  phrase('звездочки кулачка', 'звездочки распредвала'),
  phrase('2-кулачковый', 'DOHC'),
  // Airbag "inflator modules": the airbag modules themselves. Specific phrases first, then the generic noun.
  phrase('(?:накачки|накачивания|надува) сиденья водителя', 'подушки безопасности водителя'),
  phrase('(?:накачки|накачивания|надува)(?: воздуха)? (?:пассажирского сиденья|сиденья пассажира)', 'подушки безопасности пассажира'),
  phrase('накачку пассажирского сиденья', 'подушку безопасности пассажира'),
  phrase('надува сидений водителя и пассажира', 'подушек безопасности водителя и пассажира'),
  phrase('(модул\\p{L}*) (?:накачки|накачивания) пассажира', '$1 подушки безопасности пассажира'),
  phrase('(модул\\p{L}*) (?:надува|надувания) (левой |правой )?шторки', '$1 $2шторки безопасности'),
  phrase('(модул\\p{L}*) (?:надува|надувания) штор', '$1 шторок безопасности'),
  phrase('(модул\\p{L}*) бокового (?:накачивания|надува)', '$1 боковой подушки безопасности'),
  phrase('бокового (?:накачивания|надува)', 'боковой подушки безопасности'),
  phrase('(?:системы|цепи) (?:надувания|накачивания|надува)', 'цепи срабатывания'),
  phrase('линии (?:надувания|накачивания)', 'линии срабатывания'),
  phrase('пассажирский инфляторный модуль', 'модуль подушки безопасности пассажира'),
  phrase('нерасширенный модуль инфлятора', 'несработавший модуль подушки безопасности'),
  phrase('(модул(?:и|ей|ями|ях)) (?:накачки|накачивания|надува|надувания|надувателя|инфлятора)(?: воздуха)?', '$1 подушек безопасности'),
  phrase('(модул(?:ь|я|ю|ем|е)) (?:накачки|накачивания|надува|надувания|надувателя|инфлятора)(?: воздуха)?', '$1 подушки безопасности'),
  // "Driving test" is a test drive.
  phrase('пройдите экзамен по вождению', 'выполните пробную поездку'),
  phrase('экзамена по вождению', 'пробной поездки'),
  phrase('экзамен по вождению', 'пробную поездку'),
  // "Perform." after a link to a procedure; the source questions end with an ASCII and a full-width "?".
  [/(?<![\p{L}\p{N}])Осуществлять\./gu, '— выполните.'],
  [/\?？|？/gu, '?'],
  // Column headings of DTC tables.
  phrase('Детали диагноза', 'Условие обнаружения'),
  phrase('Предполагаемое место дефекта', 'Возможное место неисправности'),
  // "Transmission", "body ground", "washer (motor)", "play, looseness", "pedal play".
  phrase('передача инфекции', 'трансмиссия'),
  phrase('тело земля', 'масса кузова'),
  phrase('двигатель стиральной машины', 'двигатель омывателя'),
  phrase('двигателя стиральной машины', 'двигателя омывателя'),
  phrase('стиральная машина', 'омыватель'),
  phrase('стиральной машины', 'омывателя'),
  phrase('(стеклоочистител(?:ь|я)) и шайбы', '$1 и омывателя'),
  phrase('SW шайбы', 'SW омывателя'),
  phrase('играй, расслабься', 'люфт, ослабление креплений'),
  phrase('Играйте в педаль и зазор между ней и половицей', 'Свободный ход педали и зазор между ней и полом'),
]);

// Text nodes that are wrong only on their own, as table cells and section names ("тело" is "Body").
export const WHOLE_TEXT_FIXES = Object.freeze(new Map([
  ['тело', 'кузов'],
  ['приостановка', 'подвеска'],
  ['схватить', 'сцепление'],
]));

// Whole headings (normalized whitespace, any case) and their replacements.
export const HEADING_FIXES = Object.freeze(new Map([
  ['удаление', 'Снятие'],
  ['разложение', 'Разборка'],
  ['инспекция', 'Проверка'],
  ['детали диагностики/предполагаемое местонахождение дефекта', 'Условия обнаружения DTC и возможные места неисправности'],
  ['точка подъема и точка подъема домкрата', 'Точки установки подъёмника и домкрата'],
  ['отказоустойчивое управление', 'Аварийный режим'],
]));

const keepCase = (match, replacement) => match[0] !== match[0].toLowerCase() ? replacement[0].toUpperCase() + replacement.slice(1) : replacement;

export function fixWording(text, fixes = WORDING_FIXES) {
  const whole = WHOLE_TEXT_FIXES.get(text.trim().toLowerCase());
  if (whole) return text.replace(text.trim(), keepCase(text.trim(), whole));
  let result = text;
  for (const [pattern, to] of fixes) result = result.replace(pattern, (...args) => {
    const groups = args.slice(1, args.findIndex(a => typeof a === 'number'));
    return keepCase(args[0], to.replace(/\$(\d)/g, (_, n) => groups[n - 1] ?? ''));
  });
  return result;
}

export function fixHeading(text) {
  return HEADING_FIXES.get(text.replace(/\s+/g, ' ').trim().toLowerCase()) ?? null;
}
