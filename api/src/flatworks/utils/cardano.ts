import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';
import { AddressUtxoType } from '../types/types';
import { CheckWalletType } from '../types/types';

const AddressUtxo = (
  address: string,
  httpService: HttpService,
): Promise<AddressUtxoType[]> => {
  const projectId = process.env.BLOCKFROST_projectId;
  const blockfrostUrl = process.env.blockfrostUrl;

  return httpService
    .get(`${blockfrostUrl}/addresses/${address}/utxos`, {
      headers: {
        projectId: projectId,
      },
    })
    .pipe(map((resp) => resp.data))
    .toPromise();
};

const TxsUtxo = (txHash: string, httpService: HttpService): Promise<any[]> => {
  const projectId = process.env.BLOCKFROST_projectId;
  const blockfrostUrl = process.env.blockfrostUrl;

  return httpService
    .get(`${blockfrostUrl}/txs/${txHash}/utxos`, {
      headers: {
        projectId: projectId,
      },
    })
    .pipe(map((resp) => resp.data))
    .toPromise();
};

const CheckWallet = (
  address: string,
  amount: number,
  httpService: HttpService,
): Promise<CheckWalletType> => {
  const projectId = process.env.BLOCKFROST_projectId;
  const blockfrostUrl = process.env.blockfrostUrl;
  const result = { amount: 0, isEnough: false };

  return httpService
    .get(`${blockfrostUrl}/addresses/${address}`, {
      headers: {
        projectId: projectId,
      },
    })
    .pipe(map((resp) => resp.data))
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

export { AddressUtxo, TxsUtxo, CheckWallet };
