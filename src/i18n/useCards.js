import { useMemo } from 'react';
import { useLanguage } from './I18nContext';
import { translations } from './translations';

/**
 * Подменяет текстовые поля карточек (card.txt) переводом для текущего языка.
 * Изображения и id остаются неизменными.
 *
 * Ключ перевода — id карточки (имя папки), с запасным вариантом по заголовку.
 */
export function useCards(cards) {
  const { lang } = useLanguage();

  return useMemo(() => {
    if (!cards) return [];
    if (lang === 'ru') return cards;

    const dictionary = translations.en?.cards || {};
    return cards.map((card) => {
      const localized = dictionary[card.id] || dictionary[card.title];
      if (!localized) return card;
      return { ...card, ...localized, images: card.images };
    });
  }, [cards, lang]);
}

export default useCards;
