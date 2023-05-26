export class BaseUserDto {
  username: string;
  userId: string;
  email: string;
  fullName: string;
  refreshToken: string;
  role: any[];
  isJobSeeker: boolean;
  isEmployer: boolean;
  password: string;
}
