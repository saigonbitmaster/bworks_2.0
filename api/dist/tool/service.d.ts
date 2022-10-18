import { HttpService } from '@nestjs/axios';
import { CheckWalletType, GitLink, AddressUtxoType } from '../flatworks/types/types';
export declare class ToolService {
    private readonly httpService;
    constructor(httpService: HttpService);
    accountLanguages(gitLink: GitLink): Promise<{
        details: {};
        languages: any[];
    }>;
    repoCommits(gitLink: string): Promise<any>;
    addressUtxo(address: string): Promise<AddressUtxoType[]>;
    txsUtxo(txHash: string): Promise<any[]>;
    checkWallet(address: string, amount: number): Promise<CheckWalletType>;
    repoCodeScan(gitLink: string): Promise<any>;
}
