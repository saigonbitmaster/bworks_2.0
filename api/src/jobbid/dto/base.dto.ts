import { Message } from '../../flatworks/types/types';
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
  messages: Message[];
  isApproved: boolean;
  description: string;
}
