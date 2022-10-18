"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rankPrice = exports.rankLanguage = exports.rankBid = void 0;
const rankLanguage = (gitLanguages, requiredLanguages) => {
    const matchedLangues = requiredLanguages.filter((language) => gitLanguages.includes(language));
    return (matchedLangues.length / requiredLanguages.length) * 4;
};
exports.rankLanguage = rankLanguage;
const rankPrice = (minPrice, maxPrice, placedPrice) => {
    return ((maxPrice - placedPrice) / (maxPrice - minPrice)) * 4;
};
exports.rankPrice = rankPrice;
const rankBid = (languageRank, priceRank, hasPrototype) => {
    return (languageRank * 3 + priceRank) / 4 + (hasPrototype ? 1 : 0);
};
exports.rankBid = rankBid;
//# sourceMappingURL=rankBid.js.map