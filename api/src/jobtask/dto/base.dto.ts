import { taskStatus } from 'src/flatworks/types/types';
export class BaseJobTaskDto {
  name: string;
  creator: string;
  updater: string;
  jobId: string;
  jobSeekerId: string;
  employerId: string;
  status: taskStatus;
  deadline: Date;
  startDate: Date;
  completedPercentage: number;
  gitLink: string;
  completeDate: Date;
  description: string;
}
