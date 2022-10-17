export interface gitCommit {
  id: string;
  message: string;
  url: string;
  date: Date;
}

export interface fundTransaction {
  hash: string;
  amount: number;
  date: Date;
}

export interface raList {
  count: number;
  data: any[];
}

export interface addressUtxo {
  tx_hash: string;
  block: string;
  amount: { unit: string; quantity: number }[];
}

export type projectStatus = 'pending' | 'complete' | 'stopped';
export interface userJwtPayload {
  userId: string;
  username: string;
}

export interface mongooseQuery {
  filter: { [key: string]: any };
  sort: { [key: string]: any };
  skip: number;
  limit: number;
}

export interface checkWalletType {
  amount: number;
  enough: boolean;
}
export interface GitLink {
  gitUrl: string;
}
