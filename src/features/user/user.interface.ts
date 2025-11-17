export enum IRole {
  ADMIN = "ADMIN",
  USER = "USER",
}

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profileImage: string | null;
  companyName: string;
  jobTitle: string;
  jobFunction: string;
  country: string;
  jobLevel: string;
  companyIndustry: string;
  companySize: string;
  postalCode: string;
  phone: string;
  isEmailVerified: boolean;
  role: IRole;
  isActive: boolean;
  hasActiveSubscription: boolean;
  stripeCustomerId: string;
  createdAt: string;
  updatedAt: string;
}
