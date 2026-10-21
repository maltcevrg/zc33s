import customCards from 'virtual:custom-cards';
import CardListPage from '../components/CardListPage';
import useCards from '../i18n/useCards';

function CustomPage() {
  const cards = useCards(customCards);

  return <CardListPage i18nKey="custom" cards={cards} />;
}

export default CustomPage;
