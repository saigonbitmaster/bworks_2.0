import { GitLink } from '../../flatworks/types';
declare const AccountLanguages: (gitLink: GitLink) => Promise<{
    details: {};
    languages: any[];
}>;
declare const RepoCommits: (gitLink: string) => Promise<any>;
declare const RepoCodeScan: (gitLink: string) => Promise<any>;
export { AccountLanguages, RepoCommits, RepoCodeScan };
