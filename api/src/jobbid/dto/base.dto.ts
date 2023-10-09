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
  isPaid: boolean;
  hasPrototype: boolean;
  prototypeLink: string;
  isCompleted: boolean;
  description: string;
}
