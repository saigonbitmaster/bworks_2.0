import { Queue } from 'bull';
export declare class QueueController {
    private readonly QueueQueue;
    constructor(QueueQueue: Queue);
    analyzeGit(postBody: any): Promise<void>;
    createWallet(postBody: any): Promise<void>;
    getJobs(res: any, query: any): Promise<any>;
}
