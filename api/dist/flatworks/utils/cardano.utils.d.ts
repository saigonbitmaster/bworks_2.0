import { HttpService } from '@nestjs/axios';
import { AddressUtxoType } from '../types';
import { CheckWalletType } from '../types';
declare const AddressUtxo: (address: string, httpService: HttpService) => Promise<AddressUtxoType[]>;
declare const TxsUtxo: (txHash: string, httpService: HttpService) => Promise<any[]>;
declare const CheckWallet: (address: string, amount: number, httpService: HttpService) => Promise<CheckWalletType>;
export { AddressUtxo, TxsUtxo, CheckWallet };
