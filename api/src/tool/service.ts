import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import {
  CheckWalletType,
  GitLink,
  AddressUtxoType,
} from '../flatworks/types/types';
import {
  AccountLanguages,
  RepoCommits,
  RepoCodeScan,
} from '../flatworks/utils/github';
import { AddressUtxo, TxsUtxo, CheckWallet } from '../flatworks/utils/cardano';

@Injectable()
export class ToolService {
  constructor(private readonly httpService: HttpService) {}

  async accountLanguages(gitLink: GitLink) {
    return await AccountLanguages(gitLink);
  }

  async repoCommits(gitLink: string): Promise<any> {
    return await RepoCommits(gitLink);
  }

  addressUtxo(address: string): Promise<AddressUtxoType[]> {
    return AddressUtxo(address, this.httpService);
  }

  txsUtxo(txHash: string): Promise<any[]> {
    return TxsUtxo(txHash, this.httpService);
  }

  checkWallet(address: string, amount: number): Promise<CheckWalletType> {
    return CheckWallet(address, amount, this.httpService);
  }

  async repoCodeScan(gitLink: string): Promise<any> {
    return await RepoCodeScan(gitLink);
  }
}
