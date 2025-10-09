export type Role = "USER" | "ADMIN" | "MODERATOR";

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
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
  role: Role;
  isActive: boolean;
  hasActiveSubscription: boolean;
  stripeCustomerId: string;
  createdAt: string;
  updatedAt: string;
}
