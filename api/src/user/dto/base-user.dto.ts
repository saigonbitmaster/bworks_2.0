export class BaseUserDto {
  username: string;
  userId: string;
  email: string;
  contact: string;
  fullName: string;
  refreshToken: string;
  role: any[];
  skills: any[];
  isJobSeeker: boolean;
  isEmployer: boolean;
  password: string;
  description: string;
}
