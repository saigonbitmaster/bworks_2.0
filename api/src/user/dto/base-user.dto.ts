export class BaseUserDto {
  username: string;
  userId: string;
  email: string;
  contact: string;
  gitLink: string;
  isShowEmail: boolean;
  isShowContact: boolean;
  fullName: string;
  refreshToken: string;
  role: any[];
  skills: any[];
  isJobSeeker: boolean;
  isEmployer: boolean;
  isNotified: boolean;
  password: string;
  isApproved: boolean;
  workHoursPerMonth: number;
  description: string;
}
