export class BasePostJobDto {
  name: string;
  employerId: string;
  expireDate: Date;
  expectDate: Date;
  budget: number;
  minBidValue: number;
  requiredAmountToBid: number;
  skills: string[];
  tasks: string[];
  isApproved: boolean;
  currencyId: string;
  extraText: string;
  description: string;
}
