export class BasePlutusTxDto {
  name: string;
  jobBidId: string;
  empId: string;
  jskId: string;
  assetName: string;
  amount: number;
  lockedTxHash: string;
  unlockedTxHash: string;
  lockDate: Date;
  unlockDate: Date;
  lockMessage: string;
  unlockMessage: string;
  datumUnlockPublicKeyHash: string;
  scriptAddress: string;
  description: string;
}
