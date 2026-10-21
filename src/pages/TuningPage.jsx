import tuningCards from '../data/cards-tuning.js';
import CardListPage from '../components/CardListPage';
import useCards from '../i18n/useCards';

function TuningPage() {
  const cards = useCards(tuningCards);

  return <CardListPage i18nKey="tuning" cards={cards} />;
}

export default TuningPage;
