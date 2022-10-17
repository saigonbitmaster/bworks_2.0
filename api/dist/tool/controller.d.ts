import { ToolService } from './service';
import { GitLink } from '../flatworks/types';
export declare class ToolController {
    private readonly service;
    constructor(service: ToolService);
    getGitLanguages(gitLink: GitLink): Promise<{
        details: {};
        languages: any[];
    }>;
    checkWallet(res: any, query: any): Promise<any>;
    getUtxos(res: any, query: any): Promise<any>;
    getCommits(res: any, query: any): Promise<any>;
}
