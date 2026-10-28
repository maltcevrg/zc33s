// {count} is replaced with the number of published documents.
export const manualContent = {
  ru: {
    showMore:'Показать ещё {count}', shownOf:'Показано {shown} из {total}', onThisPage:'В этом документе', toTop:'Наверх',
    bookmarks:'Закладки', recent:'Недавно открытые', clearRecent:'Очистить', bookmark:'В закладки', bookmarked:'В закладках', savedLocally:'Закладки и история хранятся только в этом браузере.', searchShortcut:'Клавиша «/» — перейти к поиску', dragHint:'Перетаскивайте увеличенную схему мышью; клавиши + и − меняют масштаб.',
    title:'Руководство по ремонту', back:'База знаний', car:'Suzuki Swift Sport ZC33S',
    scope:'K14C · 2WD · 6MT и 6AT · {count} материалов', sourceNote:'Текст руководства на русском языке.', sectionNote:'Раздел {section}', variantNote:'исполнение «{variant}»',
    contents:'Оглавление', search:'Поиск по руководству', placeholder:'Название, текст или номер документа', clear:'Очистить поиск',
    results:'Найдено материалов', noResults:'Материалы не найдены. Попробуйте другое слово или очистите поиск.', searchLoading:'Загрузка поиска…',
    loading:'Загрузка руководства…', loadingDocument:'Загрузка инструкции…', error:'Не удалось загрузить материал. Проверьте соединение и повторите попытку.', retry:'Повторить загрузку',
    unavailable:'Этот материал пока не перенесён на сайт', unavailableNote:'На сайте собраны материалы, относящиеся к ZC33S ({count}): двигатель K14C, передний привод, 6MT и 6AT. Полный привод, вариатор, AGS, гибридные системы и другие двигатели не публикуются. Ссылка сохранена из оригинального руководства.',
    unknown:'Материал не найден', unknownNote:'Проверьте адрес или выберите инструкцию в оглавлении.', return:'К оглавлению',
    copy:'Скопировать ссылку', copied:'Ссылка скопирована', manualCopy:'Скопируйте ссылку из поля', print:'Печать', previous:'Предыдущий материал', next:'Следующий материал',
    openImage:'Увеличить схему', close:'Закрыть', imageDialog:'Просмотр иллюстрации', zoomIn:'Увеличить', zoomOut:'Уменьшить', reset:'Сбросить', original:'Открыть изображение отдельно',
    imageError:'Иллюстрация не загрузилась. Откройте изображение отдельно или повторите загрузку страницы.',
    scanReference:'Справка по активному тесту сканера пока не перенесена на сайт',
    cardTitle:'Руководство по ремонту Suzuki Swift', cardDescription:'Двигатель K14C, подвеска, тормоза и ESP, 6MT и 6AT, рулевое управление, кондиционер, подушки безопасности, кузов, электрооборудование и системы помощи водителю. Схемы, диагностика и моменты затяжки.', cardLink:'Открыть руководство',
  },
  en: {
    showMore:'Show {count} more', shownOf:'Showing {shown} of {total}', onThisPage:'In this document', toTop:'Back to top',
    bookmarks:'Bookmarks', recent:'Recently opened', clearRecent:'Clear', bookmark:'Bookmark', bookmarked:'Bookmarked', savedLocally:'Bookmarks and history are stored in this browser only.', searchShortcut:'Press “/” to jump to search', dragHint:'Drag the enlarged diagram with the mouse; the + and − keys change the zoom.',
    title:'Repair manual', back:'Knowledge base', car:'Suzuki Swift Sport ZC33S',
    scope:'K14C · 2WD · 6MT and 6AT · {count} documents', sourceNote:'The original manual text is in Russian.', sectionNote:'Section {section}', variantNote:'variant “{variant}”',
    contents:'Contents', search:'Search the manual', placeholder:'Title, text or document ID', clear:'Clear search',
    results:'Documents found', noResults:'No documents found. Try another word or clear the search.', searchLoading:'Loading search…',
    loading:'Loading manual…', loadingDocument:'Loading document…', error:'The material could not be loaded. Check your connection and try again.', retry:'Try again',
    unavailable:'This material has not been published on the site yet', unavailableNote:'The site includes the material that applies to the ZC33S ({count} documents): K14C engine, front-wheel drive, 6MT and 6AT. 4WD, CVT, AGS, hybrid systems and other engines are not published. This reference is retained from the original manual.',
    unknown:'Document not found', unknownNote:'Check the address or choose a document from the contents.', return:'Back to contents',
    copy:'Copy link', copied:'Link copied', manualCopy:'Copy the link from this field', print:'Print', previous:'Previous document', next:'Next document',
    openImage:'Enlarge illustration', close:'Close', imageDialog:'Illustration viewer', zoomIn:'Zoom in', zoomOut:'Zoom out', reset:'Reset', original:'Open image separately',
    imageError:'The illustration could not be loaded. Open the image separately or reload the page.',
    scanReference:'The scan tool active test reference has not been published on the site yet',
    cardTitle:'Suzuki Swift repair manual', cardDescription:'K14C engine, suspension, brakes and ESP, 6MT and 6AT, steering, air conditioning, airbags, body, electrical and driver assistance systems. Diagrams, diagnostics and tightening torques.', cardLink:'Open manual',
  },
};

export const fillLabel = (text,values) => text.replace(/\{(\w+)\}/g,(_,key)=>values[key]??'');
