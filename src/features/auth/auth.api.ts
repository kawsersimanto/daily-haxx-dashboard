import { baseApi } from "@/redux/api/baseApi";

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
  }),
});

export const { useSendOtpMutation, useVerifyOtpMutation } = userApi;
