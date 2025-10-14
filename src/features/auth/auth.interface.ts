import { IUser } from "@/features/user/user.interface";

export interface AuthState {
  email: string;
  currentStep: number;
  totalSteps: number;
  token: string;
  user: IUser | null;
}

export interface VerifyOtpData {
  token: string;
  user?: IUser | null;
}
