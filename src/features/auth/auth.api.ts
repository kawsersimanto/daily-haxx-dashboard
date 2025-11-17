import { baseApi } from "@/redux/api/baseApi";
import { ApiResponse } from "@/types/api";
import { IUser } from "../user/user.interface";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendOtp: builder.mutation({
      query: (email) => ({
        url: "/otp/send",
        method: "POST",
        body: { email },
      }),
    }),
    verifyOtp: builder.mutation({
      query: ({ email, otp }) => ({
        url: "/otp/verify",
        method: "POST",
        body: { email, otp: Number(otp) },
      }),
    }),
    updateProfile: builder.mutation<
      ApiResponse<IUser>,
      {
        user: Partial<IUser>;
      }
    >({
      query: (body) => ({
        url: `/users/profile`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["auth"],
    }),
    login: builder.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["auth"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["auth"],
    }),
    getProfile: builder.query<ApiResponse<IUser>, string>({
      query: () => `/users/profile`,
      providesTags: ["auth"],
    }),
  }),
});

export const {
  useSendOtpMutation,
  useLoginMutation,
  useVerifyOtpMutation,
  useUpdateProfileMutation,
  useLogoutMutation,
  useGetProfileQuery,
} = userApi;
