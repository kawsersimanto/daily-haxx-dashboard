"use client";

import { IRole, IUser } from "@/features/user/user.interface";
import { useAppSelector } from "@/redux/hook";
import {
  clearToken,
  decodeStoredToken,
  decodeToken,
  extractErrorMessage,
  saveToken,
} from "@/utils/tokenHandler";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

import { UseAuthReturn } from "../auth.interface";

import {
  useGetProfileQuery,
  useLoginMutation,
  useLogoutMutation,
  useSendOtpMutation,
  useUpdateProfileMutation,
  useVerifyOtpMutation,
} from "../auth.api";
import { reset, setEmail, setToken, setUser } from "../store/auth.slice";

export const useAuth = (): UseAuthReturn => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { user, token, email } = useAppSelector((state) => state.auth);

  const [sendOtp, { isLoading: sendOtpLoading }] = useSendOtpMutation();
  const [verifyOtp, { isLoading: verifyOtpLoading }] = useVerifyOtpMutation();
  const [login, { isLoading: loginLoading }] = useLoginMutation();
  const [updateProfile, { isLoading: updateProfileLoading }] =
    useUpdateProfileMutation();
  const [logout, { isLoading: logoutLoading }] = useLogoutMutation();

  const { data: profileData, isLoading: profileLoading } = useGetProfileQuery(
    "",
    {
      skip: !token,
    }
  );

  const profile = profileData?.data || null;

  const isLoading =
    sendOtpLoading ||
    verifyOtpLoading ||
    loginLoading ||
    updateProfileLoading ||
    logoutLoading ||
    profileLoading;

  // ---- SEND OTP ----
  const handleSendOtp = useCallback(
    async ({ email }: { email: string }) => {
      try {
        const response = await sendOtp(email).unwrap();
        dispatch(setEmail(email));
        return response;
      } catch (error) {
        throw new Error(extractErrorMessage(error, "Failed to send OTP"));
      }
    },
    [sendOtp, dispatch]
  );

  // ---- LOGIN ----
  const handleLogin = useCallback(
    async ({ email, otp }: { email: string; otp: number }) => {
      try {
        const response = await login({ email, otp }).unwrap();
        const token: string = response?.data?.token;

        if (!token) {
          throw new Error("No token received from login");
        }

        const decodedUser = decodeToken(token);
        if (!decodedUser) {
          throw new Error("Failed to decode user from token");
        }

        dispatch(setToken(token));
        dispatch(setUser(decodedUser as IUser));

        saveToken(token);
        router.push("/");
      } catch (error) {
        throw new Error(extractErrorMessage(error, "Login failed"));
      }
    },
    [login, dispatch, router]
  );

  // ---- VERIFY OTP ----
  const handleVerifyOtp = useCallback(
    async ({ email, otp }: { email: string; otp: string }) => {
      try {
        const response = await verifyOtp({ email, otp }).unwrap();
        const token: string = response?.data?.token;

        if (!token) {
          throw new Error("No token received from OTP verification");
        }

        const decodedUser = decodeToken(token);
        if (!decodedUser) {
          throw new Error("Failed to decode user from token");
        }

        dispatch(setEmail(email));
        dispatch(setToken(token));
        dispatch(setUser(decodedUser as IUser));

        saveToken(token);
        router.push("/");
      } catch (error) {
        throw new Error(extractErrorMessage(error, "OTP verification failed"));
      }
    },
    [verifyOtp, dispatch, router]
  );

  // ---- UPDATE PROFILE ----
  const handleUpdateProfile = useCallback(
    async (userData: Partial<IUser>) => {
      try {
        const response = await updateProfile({
          user: userData,
        }).unwrap();

        const updatedUser = response?.data;
        if (updatedUser) {
          dispatch(setUser(updatedUser));
        }

        return response;
      } catch (error) {
        throw new Error(extractErrorMessage(error, "Failed to update profile"));
      }
    },
    [updateProfile, dispatch]
  );

  // ---- LOGOUT ----
  const handleLogout = useCallback(async () => {
    try {
      await logout({}).unwrap();
      dispatch(reset());
      clearToken();
      router.push("/login");
    } catch (error) {
      throw new Error(extractErrorMessage(error, "Logout failed"));
    }
  }, [logout, dispatch, router]);

  // ---- ROLE HELPERS ----
  const getUserRole = useCallback((): IRole | null => {
    const decoded = decodeStoredToken();
    return decoded?.role || null;
  }, []);

  const hasRole = useCallback(
    (requiredRoles: IRole[]): boolean => {
      const role = getUserRole();
      return role ? requiredRoles.includes(role) : false;
    },
    [getUserRole]
  );

  const isAdmin = useCallback((): boolean => hasRole([IRole.ADMIN]), [hasRole]);

  const isUser = useCallback((): boolean => hasRole([IRole.USER]), [hasRole]);

  return {
    user,
    token,
    email,
    profile,
    isLoading,
    isAuthenticated: Boolean(token),
    handleSendOtp,
    handleLogin,
    handleVerifyOtp,
    handleUpdateProfile,
    handleLogout,
    getUserRole,
    hasRole,
    isAdmin,
    isUser,
  };
};
