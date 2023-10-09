/*
rankLanguage: return score of match jobSeeker git used language and required languages for a posted job: 0-4
rankPrice: return score of match placed price with given budget: 0-4
rankBid: return final score of match for given bid: number 0-5
*/

const rankLanguage = (
  gitLanguages: string[],
  requiredLanguages: string[],
): number => {
  const matchedLangues = requiredLanguages.filter((language) =>
    gitLanguages.includes(language),
  );
  if (requiredLanguages.length === 0) return 0;
  return (matchedLangues.length / requiredLanguages.length) * 4;
};

const rankPrice = (
  minPrice: number,
  maxPrice: number,
  placedPrice: number,
): number => {
  return ((maxPrice - placedPrice) / (maxPrice - minPrice)) * 4;
};

const rankBid = (
  languageRank: number,
  priceRank: number,
  hasPrototype: boolean,
): number => {
  return (languageRank * 3 + priceRank) / 4 + (hasPrototype ? 1 : 0);
};

const rankJobBid = (
  gitLanguages: string[],
  requiredLanguages: string[],
  minPrice: number,
  maxPrice: number,
  placedPrice: number,
  hasPrototype: boolean,
) => {
  const languageRate = rankLanguage(gitLanguages, requiredLanguages);
  const priceRate = rankPrice(minPrice, maxPrice, placedPrice);
  return rankBid(languageRate, priceRate, hasPrototype);
};
export { rankBid, rankLanguage, rankPrice, rankJobBid };
