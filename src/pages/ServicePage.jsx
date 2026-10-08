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
          в разделах «База знаний» и «Каталог деталей».
        </p>
        <TelegramCta note="Telegram-контакт предназначен для консультаций по технической информации. Сайт не оформляет заказы и не принимает платежи." />
      </div>
    </section>
  );
}

export default ServicePage;
