import { GitLink } from '../types/types';
declare const AccountLanguages: (gitLink: GitLink) => Promise<{
    details: {};
    languages: any[];
}>;
declare const RepoCommits: (gitLink: string) => Promise<any>;
declare const RepoCodeScan: (gitLink: string) => Promise<any>;
declare const AccountLanguagesForUser: (gitLink: GitLink, userId: string) => Promise<any>;
export { AccountLanguages, RepoCommits, RepoCodeScan, AccountLanguagesForUser };
