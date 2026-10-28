// {count} is replaced with the number of published documents.
export const manualContent = {
  ru: {
    title:'Руководство по ремонту', back:'База знаний', car:'Suzuki Swift Sport ZC33S',
    scope:'Двигатель K14C · {count} материалов', sourceNote:'Текст руководства на русском языке.', sectionNote:'Раздел {section}', engineNote:'двигатель {engine}',
    contents:'Оглавление', search:'Поиск по руководству', placeholder:'Название, текст или номер документа', clear:'Очистить поиск',
    results:'Найдено материалов', noResults:'Материалы не найдены. Попробуйте другое слово или очистите поиск.', searchLoading:'Загрузка поиска…',
    loading:'Загрузка руководства…', loadingDocument:'Загрузка инструкции…', error:'Не удалось загрузить материал. Проверьте соединение и повторите попытку.', retry:'Повторить загрузку',
    unavailable:'Этот материал пока не перенесён на сайт', unavailableNote:'Сейчас на сайте раздел «Двигатель» для K14C: {count} материалов. Ссылка сохранена из оригинального руководства.',
    unknown:'Материал не найден', unknownNote:'Проверьте адрес или выберите инструкцию в оглавлении.', return:'К оглавлению',
    copy:'Скопировать ссылку', copied:'Ссылка скопирована', manualCopy:'Скопируйте ссылку из поля', print:'Печать', previous:'Предыдущий материал', next:'Следующий материал',
    openImage:'Увеличить схему', close:'Закрыть', imageDialog:'Просмотр иллюстрации', zoomIn:'Увеличить', zoomOut:'Уменьшить', reset:'Сбросить', original:'Открыть изображение отдельно',
    imageError:'Иллюстрация не загрузилась. Откройте изображение отдельно или повторите загрузку страницы.',
    scanReference:'Справка по активному тесту сканера пока не перенесена на сайт',
    cardTitle:'Руководство по ремонту Suzuki Swift', cardDescription:'Двигатель K14C: управление двигателем, контроль выбросов, электрооборудование, механика, смазка, охлаждение, топливо, зажигание, запуск, зарядка и выхлоп. Схемы, диагностика и моменты затяжки.', cardLink:'Открыть руководство',
  },
  en: {
    title:'Repair manual', back:'Knowledge base', car:'Suzuki Swift Sport ZC33S',
    scope:'K14C engine · {count} documents', sourceNote:'The original manual text is in Russian.', sectionNote:'Section {section}', engineNote:'{engine} engine',
    contents:'Contents', search:'Search the manual', placeholder:'Title, text or document ID', clear:'Clear search',
    results:'Documents found', noResults:'No documents found. Try another word or clear the search.', searchLoading:'Loading search…',
    loading:'Loading manual…', loadingDocument:'Loading document…', error:'The material could not be loaded. Check your connection and try again.', retry:'Try again',
    unavailable:'This material has not been published on the site yet', unavailableNote:'The site currently includes the K14C engine section: {count} documents. This reference is retained from the original manual.',
    unknown:'Document not found', unknownNote:'Check the address or choose a document from the contents.', return:'Back to contents',
    copy:'Copy link', copied:'Link copied', manualCopy:'Copy the link from this field', print:'Print', previous:'Previous document', next:'Next document',
    openImage:'Enlarge illustration', close:'Close', imageDialog:'Illustration viewer', zoomIn:'Zoom in', zoomOut:'Zoom out', reset:'Reset', original:'Open image separately',
    imageError:'The illustration could not be loaded. Open the image separately or reload the page.',
    scanReference:'The scan tool active test reference has not been published on the site yet',
    cardTitle:'Suzuki Swift repair manual', cardDescription:'K14C engine: engine management, emission control, engine electrical, mechanical, lubrication, cooling, fuel, ignition, starting, charging and exhaust. Diagrams, diagnostics and tightening torques.', cardLink:'Open manual',
  },
};

export const fillLabel = (text,values) => text.replace(/\{(\w+)\}/g,(_,key)=>values[key]??'');
