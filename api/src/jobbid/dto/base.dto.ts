export class BaseJobBidDto {
  name: string;
  jobId: string;
  jobSeekerId: string;
  employerId: string;
  bidDate: Date;
  completeDate: Date;
  bidValue: number;
  isSelected: boolean;
  isSignedTx: boolean;
  jobDone: boolean;
  isPaid: boolean;
  hasPrototype: boolean;
  prototypeLink: string;
  isCompleted: boolean;
  isApproved: boolean;
  description: string;
}
