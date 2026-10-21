// Маппинг старых модулей (?module=01) на чистые URL базы знаний.
// Вынесено отдельно, чтобы не подтягивать в бандл полные тексты статей.
export const FAQ_MODULE_REDIRECTS = {
  '01': '/knowledge/zc33s-faq',
  '02': '/knowledge/ecu-flashing',
  '03': '/knowledge/tuning-stages',
  '04': '/knowledge/buying-zc33s',
};
