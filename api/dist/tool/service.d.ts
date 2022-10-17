import { HttpService } from '@nestjs/axios';
import { addressUtxo } from '../flatworks/types';
import { checkWalletType, GitLink } from '../flatworks/types';
export declare class ToolService {
    private readonly httpService;
    constructor(httpService: HttpService);
    getGitHubLanguages(gitLink: GitLink): Promise<{
        details: {};
        languages: any[];
    }>;
    getAddressUtxo(address: string): Promise<addressUtxo[]>;
    getTxsUtxo(tx_hash: string): Promise<any[]>;
    checkWallet(address: string, amount: number): Promise<checkWalletType>;
    getRepoCommits(gitLink: string): Promise<any>;
    repoCodeScan(gitLink: string): Promise<any>;
}
