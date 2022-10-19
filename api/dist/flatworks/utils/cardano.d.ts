import { HttpService } from '@nestjs/axios';
import { AddressUtxoType } from '../types/types';
import { CheckWalletType } from '../types/types';
declare const AddressUtxo: (address: string, httpService: HttpService) => Promise<AddressUtxoType[]>;
declare const TxsUtxo: (txHash: string, httpService: HttpService) => Promise<any[]>;
declare const CheckWallet: (address: string, amount: number, httpService: HttpService) => Promise<CheckWalletType>;
declare const CreateWallet: (userId: string) => void;
export { AddressUtxo, TxsUtxo, CheckWallet, CreateWallet };
