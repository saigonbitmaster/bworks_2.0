import { ToolService } from './service';
import { GitLink } from '../flatworks/types/types';
export declare class ToolController {
    private readonly service;
    constructor(service: ToolService);
    accountLanguages(gitLink: GitLink): Promise<{
        details: {};
        languages: any[];
    }>;
    checkWallet(res: any, query: any): Promise<any>;
    txsUtxo(res: any, query: any): Promise<any>;
    getCommits(res: any, query: any): Promise<any>;
}
