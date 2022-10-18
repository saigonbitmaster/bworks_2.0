declare const rankLanguage: (gitLanguages: any, requiredLanguages: any) => number;
declare const rankPrice: (minPrice: any, maxPrice: any, placedPrice: any) => number;
declare const rankBid: (languageRank: any, priceRank: any, hasPrototype: any) => number;
export { rankBid, rankLanguage, rankPrice };
