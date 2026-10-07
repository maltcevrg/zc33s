import TelegramCta from '../components/TelegramCta';

function ServicePage() {
  return (
    <section className="page">
      <h1 className="page__title">Обслуживание</h1>

      {/* Раздел наполняется; единственная точка контакта — официальный Telegram. */}
      <div className="page__intro">
        <p className="page__text">
          Раздел в разработке: собираем материалы по обслуживанию Suzuki Swift Sport ZC33S —
          регламенты, расходники и подготовку автомобиля к тюнингу. Часть сведений уже доступна
          в разделах «FAQ по авто» и «Каталог деталей».
        </p>
        <TelegramCta note="Состав работ по обслуживанию и подготовке к тюнингу согласовывается индивидуально." />
      </div>
    </section>
  );
}

export default ServicePage;
