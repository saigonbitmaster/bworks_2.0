declare const rankLanguage: (gitLanguages: string[], requiredLanguages: string[]) => number;
declare const rankPrice: (minPrice: number, maxPrice: number, placedPrice: number) => number;
declare const rankBid: (languageRank: number, priceRank: number, hasPrototype: boolean) => number;
export { rankBid, rankLanguage, rankPrice };
