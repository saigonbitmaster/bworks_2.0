export interface GitCommit {
  id: string;
  message: string;
  url: string;
  date: Date;
}

export interface FundTransaction {
  hash: string;
  amount: number;
  date: Date;
}

export interface RaList {
  count: number;
  data: any[];
}

export interface AddressUtxoType {
  tx_hash: string;
  block: string;
  amount: { unit: string; quantity: number }[];
}

export interface DashboardCardData {
  paidByPlutus: {
    numberOfJobs: number;
    totalAmount: number;
  };
  activeUsers: {
    jobSeekers: number;
    employers: number;
  };
  postedJobs: {
    postedJobs: number;
    bids: number;
  };
  plutusTxs: {
    lockTxs: number;
    unlockTxs: number;
  };
}

export type ProjectStatus = 'pending' | 'complete' | 'stopped';
export interface userJwtPayload {
  userId: string;
  username: string;
}

export interface MongooseQuery {
  filter: { [key: string]: any };
  sort: { [key: string]: any };
  select?: { [key: string]: number };
  skip: number;
  limit: number;
}

export interface CheckWalletType {
  amount: number;
  enough: boolean;
}
export interface GitLink {
  gitUrl: string;
}

export interface RequestUser {
  username: string;
  userId: string;
}

export interface Message {
  userId: string;
  body: string;
  createdAt: Date;
  id: string;
}
/*
 const event = {
      type: 'job' || 'payment' || 'message';
      userType: 'employer' || 'jobSeeker', -> to notify to employer or job seeker
      message: 'jobBidId' || 'plutusTxId',
    };
*/
export interface Event {
  type: string;
  userType?: string;
  message: string;
}

export interface TypeSkill {
  name: string;
}

export enum taskStatus {
  completed = 'completed',
  inProgress = 'inProgress',
  todo = 'todo',
}

export enum Role {
  Admin = 'admin',
  User = 'user',
}
