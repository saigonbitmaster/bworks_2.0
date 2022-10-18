"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckWallet = exports.TxsUtxo = exports.AddressUtxo = void 0;
const operators_1 = require("rxjs/operators");
const AddressUtxo = (address, httpService) => {
    const projectId = process.env.BLOCKFROST_projectId;
    const blockfrostUrl = process.env.blockfrostUrl;
    return httpService
        .get(`${blockfrostUrl}/addresses/${address}/utxos`, {
        headers: {
            projectId: projectId,
        },
    })
        .pipe((0, operators_1.map)((resp) => resp.data))
        .toPromise();
};
exports.AddressUtxo = AddressUtxo;
const TxsUtxo = (txHash, httpService) => {
    const projectId = process.env.BLOCKFROST_projectId;
    const blockfrostUrl = process.env.blockfrostUrl;
    return httpService
        .get(`${blockfrostUrl}/txs/${txHash}/utxos`, {
        headers: {
            projectId: projectId,
        },
    })
        .pipe((0, operators_1.map)((resp) => resp.data))
        .toPromise();
};
exports.TxsUtxo = TxsUtxo;
const CheckWallet = (address, amount, httpService) => {
    const projectId = process.env.BLOCKFROST_projectId;
    const blockfrostUrl = process.env.blockfrostUrl;
    const result = { amount: 0, isEnough: false };
    return httpService
        .get(`${blockfrostUrl}/addresses/${address}`, {
        headers: {
            projectId: projectId,
        },
    })
        .pipe((0, operators_1.map)((resp) => resp.data))
        .toPromise()
        .then((data) => {
        result.amount =
            data.amount.map((item) => (item.unit == 'lovelace' ? item : null))[0]
                .quantity / 1000000;
        result.isEnough = result.amount >= amount;
        return result;
    })
        .catch((err) => err);
};
exports.CheckWallet = CheckWallet;
//# sourceMappingURL=cardano.utils.js.map