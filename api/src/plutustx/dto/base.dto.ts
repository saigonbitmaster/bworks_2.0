export class BasePlutusTxDto {
  name: string;
  jobBidId: string;
  assetName: string;
  amount: number;
  lockedTxHash: string;
  unlockedTxHash: string;
  lockDate: Date;
  unlockDate: Date;
  txMessage: string;
  description: string;
}
