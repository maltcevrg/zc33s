export const aboutContent = {
  ru: {
    title: 'О проекте',
    lead: 'Swift Sport Tuning — специализированный инженерно-технический проект по платформе Suzuki Swift Sport ZC33S. Решения формируются на основе измерений, логов и реального опыта эксплуатации конкретных конфигураций.',
    principle: 'Решения формируются на основе измерений, логов и опыта эксплуатации конкретных конфигураций ZC33S.',
    tocTitle: 'Содержание',
    ctaNote: 'Задать вопрос или обсудить проект можно в официальном Telegram-контакте.',
    sections: [
      {
        id: 'who-we-are',
        title: 'Кто мы',
        paragraphs: [
          'Swift Sport Tuning (SST) — это специализированный инженерный проект и экспертное сообщество владельцев Suzuki Swift Sport поколения ZC33S с турбомотором 1.4 Boosterjet (K14C).',
          'Мы сознательно отказались от мультибрендовости: наша работа сфокусирована исключительно на одной платформе. Мы глубоко знаем архитектуру двигателя K14C, конструктивные отличия японского (JDM) и европейского рынков, заводские алгоритмы блока управления, термонагруженность турбины и пределы надёжности каждого узла автомобиля.',
        ],
      },
      {
        id: 'gunrace',
        title: 'GunRace и связь с проектом',
        paragraphs: [
          'GunRace — ключевой инженерно-технический партнёр и разработчик проекта Swift Sport Tuning.',
          'GunRace является автором калибровок программного обеспечения блоков управления двигателем (ECU Bosch MED17.9.63), а также разработчиком и изготовителем оригинальной линейки гибридных турбокомпрессоров GunRace (GR25, GR30, GR39).',
          'Все прошивки, представленные на сайте SST — от городского Stage 1 под бензин АИ-95 до трековых конфигураций Stage 3+ на гибридных турбинах — разработаны, протестированы и валидированы GunRace. SST и GunRace работают в неразрывной связке: технические решения рассчитываются, собираются, откатываются на диностендах и проверяются по логам в реальных условиях.',
        ],
      },
      {
        id: 'what-we-do',
        title: 'Что мы делаем',
        items: [
          {
            title: 'Калибровки ECU',
            desc: 'Разработка и адаптация безопасных калибровок штатного блока управления Bosch MED17.9.63 для механических (MT) и автоматических (AT) трансмиссий. Точная настройка топливоподачи, зажигания, наддува, снятие ограничителя 180 км/ч, нормы Евро-2.',
          },
          {
            title: 'Разработка конфигураций',
            desc: 'Проектирование сбалансированных аппаратных решений: от базового ежедневного Stage 1 до трековых конфигураций мощностью 240+ л.с. с учётом термодинамики и ресурса двигателя.',
          },
          {
            title: 'Турбокомпрессоры',
            desc: 'Разработка, сборка и прецизионная балансировка гибридных турбин GunRace GR30 и GR39 на базе проверенных турбин Mitsubishi TD02/TD02L для безопасного увеличения расхода воздуха.',
          },
          {
            title: 'Компоненты',
            desc: 'Подбор, тестирование и адаптация увеличенных интеркулеров, даунпайпов, спортивных свечей зажигания, усиленных комплектов сцепления и доработанных опор двигателя.',
          },
          {
            title: 'Техническая база',
            desc: 'Создание открытой практической базы знаний по ZC33S, каталога оригинальных деталей и проверенных аналогов, а также подробных инструкций по самостоятельной прошивке и обслуживанию.',
          },
        ],
      },
      {
        id: 'how-we-test',
        title: 'Как тестируем',
        lead: 'Мы опираемся только на реальные факты и инструментальные замеры:',
        items: [
          { badge: 'Диностенд', title: 'Замеры на диностенде', desc: 'Фиксация внешней скоростной характеристики (мощность и крутящий момент) на профессиональных нагрузочных стендах Dyno Dynamics и SuperFlow без программных манипуляций с потерями.' },
          { badge: 'Логирование', title: 'Высокочастотное логирование', desc: 'Запись параметров работы ЭБУ на ходу с высокой дискретизацией по заводским протоколам во всех диапазонах оборотов и нагрузок.' },
          { badge: 'EGT', title: 'Контроль температуры выхлопных газов', desc: 'Непрерывный мониторинг термической нагрузки на выпускные клапаны и крыльчатку турбокомпрессора для исключения перегрева.' },
          { badge: 'AFR', title: 'Соотношение воздух/топливо', desc: 'Контроль состава смеси по широкополосному датчику кислорода — гарантия отсутствия опасного обеднения при пиковом наддуве.' },
          { badge: 'Boost', title: 'Давление наддува', desc: 'Контроль формы кривой наддува, спула и работы соленоида вестгейта для исключения передува (овербуста) и пульсаций.' },
          { badge: 'IAT', title: 'Температура воздуха на впуске', desc: 'Замер температуры воздуха до и после интеркулера для оценки тепловой эффективности и предотвращения откатов зажигания в жару.' },
          { badge: 'Дорога', title: 'Дорожные испытания', desc: 'Откатка плавности хода, отклика на педаль акселератора, переходных режимов, холодного пуска и стабильности круиз-контроля.' },
          { badge: 'Ресурс', title: 'Длительная эксплуатация', desc: 'Ресурсные тесты решений на тестовых автомобилях в реальных российских климатических условиях с пробегами в десятки тысяч километров.' },
        ],
      },
      {
        id: 'principles',
        title: 'Принцип проекта',
        paragraphs: ['Мы не пишем рекламные слоганы вроде «лучший тюнинг в России». Наш принцип предельно конкретен:'],
        quote: 'Решения формируются на основе измерений, логов и опыта эксплуатации конкретных конфигураций ZC33S.',
        afterQuote: 'Каждая опубликованная цифра подтверждена графиком стенда или логами. Мы открыто говорим о требованиях к октановому числу топлива, свечам зажигания и своевременному регламентному обслуживанию, потому что надёжность автомобиля важнее маркетинговых обещаний.',
      },
    ],
  },
  en: {
    title: 'About the Project',
    lead: 'Swift Sport Tuning is a specialized engineering project focused on the Suzuki Swift Sport ZC33S platform. Solutions are based on measurements, logs and real-world experience with specific configurations.',
    principle: 'Solutions are based on measurements, logs and real-world experience with specific ZC33S configurations.',
    tocTitle: 'Contents',
    ctaNote: 'Have questions or want to discuss the project? Reach us via the official Telegram contact.',
    sections: [
      {
        id: 'who-we-are',
        title: 'Who We Are',
        paragraphs: [
          'Swift Sport Tuning (SST) is a specialized engineering project and expert community of Suzuki Swift Sport ZC33S owners powered by the 1.4 Boosterjet (K14C) turbo engine.',
          'We deliberately abandoned multi-brand work: we focus exclusively on one platform. We deeply know the K14C architecture, differences between Japanese (JDM) and European markets, stock ECU algorithms, turbine thermal load and reliability limits of every component.',
        ],
      },
      {
        id: 'gunrace',
        title: 'GunRace and Its Connection to the Project',
        paragraphs: [
          'GunRace is the key engineering and technical partner and developer of Swift Sport Tuning.',
          'GunRace is the author of ECU calibrations for the Bosch MED17.9.63 engine control unit and the developer and manufacturer of the original GunRace hybrid turbocharger line (GR25, GR30, GR39).',
          'All tunes presented on SST — from city Stage 1 for RON 95 to track Stage 3+ on hybrid turbos — are developed, tested and validated by GunRace. SST and GunRace work as one: solutions are calculated, built, run on dynos and verified via logs in real conditions.',
        ],
      },
      {
        id: 'what-we-do',
        title: 'What We Do',
        items: [
          { title: 'ECU Calibrations', desc: 'Development and adaptation of safe calibrations for stock Bosch MED17.9.63 ECU for manual (MT) and automatic (AT) transmissions. Precise fuel, ignition and boost tuning, 180 km/h limiter removal, Euro-2.' },
          { title: 'Configuration Development', desc: 'Design of balanced hardware solutions: from daily Stage 1 to track builds with 240+ hp, considering thermodynamics and engine longevity.' },
          { title: 'Turbochargers', desc: 'Development, assembly and precision balancing of GunRace GR30 and GR39 hybrid turbos based on proven Mitsubishi TD02/TD02L for safe airflow increase.' },
          { title: 'Components', desc: 'Selection, testing and adaptation of larger intercoolers, downpipes, sport spark plugs, upgraded clutch kits and reinforced engine mounts.' },
          { title: 'Knowledge Base', desc: 'Creation of an open practical knowledge base for ZC33S, catalog of OEM parts and proven equivalents, plus detailed DIY flashing and maintenance guides.' },
        ],
      },
      {
        id: 'how-we-test',
        title: 'How We Test',
        lead: 'We rely only on real facts and instrumental measurements:',
        items: [
          { badge: 'Dyno', title: 'Dyno Measurements', desc: 'Recording power and torque curves on professional load dynos Dyno Dynamics and SuperFlow without software manipulation of losses.' },
          { badge: 'Logging', title: 'High-Frequency Logging', desc: 'Recording ECU parameters on the road with high sampling via factory protocols across all RPM and load ranges.' },
          { badge: 'EGT', title: 'Exhaust Gas Temperature Monitoring', desc: 'Continuous thermal load monitoring on exhaust valves and turbine wheel to prevent overheating.' },
          { badge: 'AFR', title: 'Air-Fuel Ratio', desc: 'Mixture control via wideband O2 sensor — ensures no dangerous lean condition at peak boost.' },
          { badge: 'Boost', title: 'Boost Pressure', desc: 'Monitoring boost curve, spool and wastegate solenoid for overboost and pulsation prevention.' },
          { badge: 'IAT', title: 'Intake Air Temperature', desc: 'Measuring air temperature before and after intercooler to assess thermal efficiency and prevent ignition retard in heat.' },
          { badge: 'Road', title: 'Road Testing', desc: 'Testing ride smoothness, throttle response, transient conditions, cold start and cruise control stability.' },
          { badge: 'Durability', title: 'Long-Term Operation', desc: 'Durability testing on test cars in real Russian climate conditions with tens of thousands of kilometers.' },
        ],
      },
      {
        id: 'principles',
        title: 'Project Principle',
        paragraphs: ['We don’t write slogans like “the best tuning in Russia.” Our principle is specific:'],
        quote: 'Solutions are based on measurements, logs and real-world experience with specific ZC33S configurations.',
        afterQuote: 'Every published figure is confirmed by a dyno chart or logs. We openly state fuel octane, spark plug and maintenance requirements because car reliability matters more than marketing promises.',
      },
    ],
  },
};
