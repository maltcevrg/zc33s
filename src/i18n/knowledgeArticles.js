// Метаданные и оглавления без HTML: доступны без загрузки текстов статей.
export const ruKnowledgeArticles = [
  {
    "slug": "zc33s-faq",
    "title": "Краткое FAQ по авто",
    "category": "car",
    "additionalCategories": [
      "hardware"
    ],
    "readingTime": "12 мин",
    "summary": "Регламенты планового ТО, заправочные объёмы, выбор моторного и трансмиссионного масла, свечи зажигания, тормозные колодки, фильтры и артикулы проверенных аналогов.",
    "meta": {
      "updated": "Октябрь 2026",
      "reviewer": "GunRace",
      "compatibility": "Suzuki Swift Sport ZC33S (2017–2024), двигатель K14C Boosterjet, 6-МКПП / 6-АКПП (Япония, Европа)",
      "note": "Спецификации жидкостей и артикулы проверены на практике участниками сообщества."
    },
    "toc": [
      "Топливная система: какой бензин лить?",
      "Моторное масло и фильтр",
      "Фильтры",
      "Охлаждающая жидкость (Антифриз)",
      "Масло в АКПП и МКПП",
      "Свечи зажигания",
      "Тормозная система",
      "Щетки стеклоочистителя",
      "Колесные диски, резина и крепеж",
      "Лампы освещения",
      "Аккумуляторная батарея (АКБ)",
      "Прокладки и метизы турбины",
      "Опоры (подушки) двигателя и кронштейны",
      "Комплект сцепления (для МКПП)",
      "Приводы, стабилизаторы и прочие запчасти",
      "Заводские коды кузовных красок"
    ]
  },
  {
    "slug": "ecu-flashing",
    "title": "Прошивка авто своими руками",
    "category": "ecu",
    "additionalCategories": [
      "diagnostics"
    ],
    "readingTime": "9 мин",
    "summary": "Пошаговая инструкция по самостоятельной прошивке ЭБУ: выбор адаптера (Scanmatik, Tactrix), программаторы (PCMFlash), считывание стока, запись калибровки и протоколы безопасности.",
    "meta": {
      "updated": "Октябрь 2026",
      "reviewer": "GunRace",
      "compatibility": "Suzuki Swift Sport ZC33S, ЭБУ Bosch MED17.9.63, двигатель K14C (дорестайл DBA и рестайл 4BA)",
      "note": "Обязательно сохраняйте резервную копию стоковой заводской прошивки перед любыми операциями записи."
    },
    "toc": [
      "ГДЕ КУПИТЬ",
      "ЧТО НУЖНО",
      "ПОДГОТОВКА РАЗЪЁМА И ПИТАНИЯ",
      "ПОРЯДОК ПОДКЛЮЧЕНИЯ",
      "ОБЩИЙ ПОРЯДОК РАБОТЫ В ПРОГРАММЕ",
      "ПЕРЕД ПРОШИВКОЙ НА НОВЫЙ ФАЙЛ"
    ]
  },
  {
    "slug": "tuning-stages",
    "title": "Гид по прошивкам и стадиям тюнинга",
    "category": "ecu",
    "additionalCategories": [
      "hardware"
    ],
    "readingTime": "14 мин",
    "summary": "Подробный разбор стадий Stage 1, Stage 2, Stage 3/3+, библиотека калибровок GunRace, Alientech, Monster Sport, SWK, требования к октановому числу бензина и аппаратной части.",
    "meta": {
      "updated": "Октябрь 2026",
      "reviewer": "GunRace",
      "compatibility": "Suzuki Swift Sport ZC33S, двигатель K14C, МКПП / АКПП, бензин АИ-95 / АИ-98 / АИ-100",
      "note": "Софт подбирается строго под версию базового ПО в заводском ЭБУ автомобиля."
    },
    "toc": [
      "Stage 1: Базовый чип-тюнинг (до 165 л.с. на АИ-95)",
      "Stage 2: Умеренный тюнинг (расчетные 170 л.с.)",
      "Stage 2+: Продвинутый уровень (180 л.с. на АИ-100)",
      "Stage 3: Серьезный тюнинг (185–220 л.с.)",
      "Stage 3+ (240+ л.с.): Максимум мощности",
      "Библиотека прошивок: Автоматическая трансмиссия (АТ)",
      "Библиотека прошивок: Механическая коробка передач (МТ)",
      "<span style=\"color:red\">Критическое обновление алгоритма подбора (Актуально с 2026 года)</span>"
    ]
  },
  {
    "slug": "buying-zc33s",
    "title": "Гайд по покупке Suzuki Swift Sport ZC33S",
    "category": "car",
    "additionalCategories": [
      "diagnostics"
    ],
    "readingTime": "15 мин",
    "summary": "Отличия рестайлинга от дорестайлинга, типичные болячки (подушки двигателя, ЛКП, сетка банджо-болта турбины), диагностика радара Safety, чтение аукционного листа и звуки K14C.",
    "meta": {
      "updated": "Октябрь 2026",
      "reviewer": "GunRace",
      "compatibility": "Suzuki Swift Sport ZC33S (DBA-ZC33S, 4BA-ZC33S), все рынки (JDM, Европа, Мексика)",
      "note": "Рекомендуется к обязательному прочтению перед осмотром или заказом автомобиля из Японии."
    },
    "toc": [
      "Индексы кузова: как отличить рестайлинг от дорестайлинга",
      "Комплектации: Base против Safety",
      "Ключевые отличия Рестайлинга от Дорестайлинга",
      "Типичные проблемы («Болячки») ZC33S",
      "Диагностика радара (для комплектации Safety)",
      "Чек-лист перед покупкой в России",
      "Характерные звуки и особенности работы двигателя K14C"
    ]
  },
  {
    "slug": "diagnostics",
    "title": "Диагностика и параметры по логам: AFR, Knock, Boost, IAT, EGT",
    "category": "diagnostics",
    "additionalCategories": [
      "ecu"
    ],
    "readingTime": "8 мин",
    "summary": "Практический справочник по ключевым параметрам безопасности: допустимый диапазон AFR, контроль откатов угла опережения зажигания, кривая наддува, температура впуска IAT и расчётный EGT.",
    "meta": {
      "updated": "Октябрь 2026",
      "reviewer": "GunRace",
      "compatibility": "Suzuki Swift Sport ZC33S, двигатель K14C Boosterjet, ЭБУ Bosch MED17.9.63",
      "note": "Параметры сняты и верифицированы на диностендах и в дорожных тестах на автомобилях SST."
    },
    "toc": [
      "AFR (Air-Fuel Ratio) — Соотношение воздух/топливо",
      "Knock (Детонация и откаты УОЗ)",
      "Boost — Давление наддува",
      "IAT (Intake Air Temperature) — Температура воздуха на впуске",
      "EGT (Exhaust Gas Temperature) — Температура выхлопных газов"
    ]
  },
  {
    "slug": "hardware",
    "title": "Hardware: руководство по компонентам ZC33S",
    "category": "hardware",
    "additionalCategories": [
      "car"
    ],
    "readingTime": "10 мин",
    "summary": "Подбор и совместимость основных компонентов: фронтальные интеркулеры, спортивные даунпайпы, гибридные турбины GunRace GR30/GR39, усиленное сцепление и свечи зажигания.",
    "meta": {
      "updated": "Октябрь 2026",
      "reviewer": "GunRace",
      "compatibility": "Suzuki Swift Sport ZC33S, двигатель K14C Boosterjet (все годы выпуска)",
      "note": "Все компоненты проверены на совместимость со штатным подкапотным пространством ZC33S."
    },
    "toc": [
      "Интеркулер (Intercooler)",
      "Даунпайп (Downpipe)",
      "Турбокомпрессоры (Турбины серии GunRace GR)",
      "Комплект сцепления",
      "Свечи зажигания"
    ]
  }
];

export const enKnowledgeArticles = [
  {
    "slug": "zc33s-faq",
    "title": "ZC33S FAQ: Maintenance & OEM Parts Guide",
    "category": "car",
    "additionalCategories": [
      "hardware"
    ],
    "readingTime": "12 min",
    "summary": "Scheduled maintenance, fluid capacities, engine and transmission oil, spark plugs, brake pads, filters and proven OEM equivalents for ZC33S.",
    "meta": {
      "updated": "October 2026",
      "reviewer": "GunRace",
      "compatibility": "Suzuki Swift Sport ZC33S (2017–2024), K14C Boosterjet, 6-MT / 6-AT (Japan, Europe)",
      "note": "Fluid specs and part numbers verified in practice by community members."
    },
    "toc": [
      "Fuel System: What Fuel to Use?",
      "Engine Oil & Filter",
      "Filters",
      "Coolant (Antifreeze)",
      "ATF & Manual Transmission Oil",
      "Spark Plugs",
      "Brake System",
      "Windshield Wipers",
      "Wheels, Tires & Fasteners",
      "Lighting Bulbs",
      "Battery (12V)",
      "Turbo Gaskets & Hardware",
      "Engine Mounts & Brackets",
      "Clutch Kit (MT)",
      "Driveshafts, Stabilizers & Other Parts",
      "Factory Paint Codes"
    ]
  },
  {
    "slug": "ecu-flashing",
    "title": "DIY ECU Flashing Guide",
    "category": "ecu",
    "additionalCategories": [
      "diagnostics"
    ],
    "readingTime": "9 min",
    "summary": "Step-by-step DIY ECU flashing: choosing adapter (Scanmatik, Tactrix), flashers (PCMFlash), stock readout, calibration write and safety protocols.",
    "meta": {
      "updated": "October 2026",
      "reviewer": "GunRace",
      "compatibility": "Suzuki Swift Sport ZC33S, Bosch MED17.9.63 ECU, K14C (pre-facelift DBA and facelift 4BA)",
      "note": "Always keep a backup of stock factory calibration before any write operations."
    },
    "toc": [
      "WHERE TO BUY",
      "WHAT YOU NEED",
      "CONNECTOR & POWER PREPARATION",
      "CONNECTION PROCEDURE",
      "GENERAL SOFTWARE WORKFLOW",
      "BEFORE FLASHING NEW FILE"
    ]
  },
  {
    "slug": "tuning-stages",
    "title": "Tuning Stages & Firmware Guide",
    "category": "ecu",
    "additionalCategories": [
      "hardware"
    ],
    "readingTime": "14 min",
    "summary": "Detailed breakdown of Stage 1, Stage 2, Stage 3/3+, GunRace, Alientech, Monster Sport, SWK calibration library, fuel octane and hardware requirements.",
    "meta": {
      "updated": "October 2026",
      "reviewer": "GunRace",
      "compatibility": "Suzuki Swift Sport ZC33S, K14C, MT / AT, RON 95 / 98 / 100",
      "note": "Software is matched strictly to base ECU software version in the car."
    },
    "toc": [
      "Stage 1: Basic chip tuning (up to 165 hp on AI-95)",
      "Stage 2: Moderate tuning (calculated 170 hp)",
      "Stage 2+: Advanced level (180 hp on AI-100)",
      "Stage 3: Serious tuning (185–220 hp)",
      "Stage 3+ (240+ hp): Maximum power",
      "Firmware library: automatic transmission (AT)",
      "Firmware library: manual transmission (MT)",
      "Critical update to the selection algorithm (relevant from 2026)"
    ]
  },
  {
    "slug": "buying-zc33s",
    "title": "Buying Guide: Suzuki Swift Sport ZC33S",
    "category": "car",
    "additionalCategories": [
      "diagnostics"
    ],
    "readingTime": "15 min",
    "summary": "Facelift vs pre-facelift differences, common issues (engine mounts, paint, turbo banjo mesh), Safety radar diagnostics, auction sheet reading and K14C sounds.",
    "meta": {
      "updated": "October 2026",
      "reviewer": "GunRace",
      "compatibility": "Suzuki Swift Sport ZC33S (DBA-ZC33S, 4BA-ZC33S), all markets (JDM, Europe, Mexico)",
      "note": "Highly recommended to read before inspecting or ordering a car from Japan."
    },
    "toc": [
      "Body indexes: how to tell facelift from pre-facelift",
      "Trims: Base vs Safety",
      "Key differences between facelift and pre-facelift",
      "Typical issues (“sores”) of the ZC33S",
      "Radar diagnostics (for the Safety trim)",
      "Pre-purchase checklist in Russia",
      "Characteristic sounds and K14C engine features"
    ]
  },
  {
    "slug": "diagnostics",
    "title": "Diagnostics & Log Parameters: AFR, Knock, Boost, IAT, EGT",
    "category": "diagnostics",
    "additionalCategories": [
      "ecu"
    ],
    "readingTime": "8 min",
    "summary": "Practical reference for key safety parameters: AFR range, ignition retard monitoring, boost curve, intake temperature IAT and calculated EGT.",
    "meta": {
      "updated": "October 2026",
      "reviewer": "GunRace",
      "compatibility": "Suzuki Swift Sport ZC33S, K14C Boosterjet, Bosch MED17.9.63 ECU",
      "note": "Parameters taken and verified on dynos and road tests on SST cars."
    },
    "toc": [
      "AFR (Air-Fuel Ratio)",
      "Knock (Detonation & Ignition Retard)",
      "Boost — Charge Pressure",
      "IAT (Intake Air Temperature)",
      "EGT (Exhaust Gas Temperature)"
    ]
  },
  {
    "slug": "hardware",
    "title": "Hardware: ZC33S Components Guide",
    "category": "hardware",
    "additionalCategories": [
      "car"
    ],
    "readingTime": "10 min",
    "summary": "Selection and compatibility of core components: front-mount intercoolers, sport downpipes, GunRace GR30/GR39 hybrid turbos, upgraded clutch and spark plugs.",
    "meta": {
      "updated": "October 2026",
      "reviewer": "GunRace",
      "compatibility": "Suzuki Swift Sport ZC33S, K14C Boosterjet (all years)",
      "note": "All components checked for compatibility with stock ZC33S engine bay."
    },
    "toc": [
      "Intercooler",
      "Downpipe",
      "Turbochargers (GunRace GR Series)",
      "Clutch Kit",
      "Spark Plugs"
    ]
  }
];
