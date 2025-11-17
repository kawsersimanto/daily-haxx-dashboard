import { IRole, IUser } from "@/features/user/user.interface";
import { ApiResponse } from "@/types/api";

export interface AuthState {
  email: string;
  currentStep: number;
  totalSteps: number;
  token: string;
  user: Partial<IUser> | null;
}

export interface VerifyOtpData {
  token: string;
  user?: IUser | null;
}

export interface SendOtpCredentials {
  email: string;
}

export interface VerifyOtpCredentials {
  email: string;
  otp: string;
}

export interface UpdateProfileCredentials {
  user: Partial<IUser>;
}

export interface AuthResponse {
  data: {
    token: string;
    user?: IUser;
  };
  message: string;
}

export interface UseAuthReturn {
  user: Partial<IUser> | null;
  token: string | null;
  email: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  profile: Partial<IUser> | null;
  handleSendOtp: (
    credentials: SendOtpCredentials
  ) => Promise<ApiResponse<void>>;
  handleVerifyOtp: (credentials: VerifyOtpCredentials) => Promise<void>;
  handleUpdateProfile: (
    userData: Partial<IUser>
  ) => Promise<ApiResponse<IUser>>;
  handleLogout: () => Promise<void>;
  getUserRole: () => IRole | null;
  hasRole: (requiredRoles: IRole[]) => boolean;
  isAdmin: () => boolean;
  isUser: () => boolean;
  handleLogin: ({
    email,
    otp,
  }: {
    email: string;
    otp: number;
  }) => Promise<void>;
}
