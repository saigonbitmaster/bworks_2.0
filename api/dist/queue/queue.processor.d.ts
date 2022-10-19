import { Job } from 'bull';
export declare class QueueProcessor {
    private readonly logger;
    onActive(job: Job): void;
    onComplete(job: Job): void;
    createWallet(job: Job): void;
    analyzeGit(job: Job): void;
    execShell(job: Job): void;
}
