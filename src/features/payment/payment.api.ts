import { baseApi } from "@/redux/api/baseApi";
import { ApiResponse } from "@/types/api";
import { IPaymentRecord } from "./payment.interface";

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPayments: builder.query<ApiResponse<IPaymentRecord[]>, void>({
      query: () => "/subscription-payments",
      providesTags: ["payments"],
    }),
    getPaymentById: builder.query<IPaymentRecord, string>({
      query: (id) => `/subscription-payments/${id}`,
    }),
    createPayment: builder.mutation<IPaymentRecord, Partial<IPaymentRecord>>({
      query: (body) => ({
        url: "/subscription-payments",
        method: "POST",
        body,
      }),
    }),
    updatePayment: builder.mutation<
      IPaymentRecord,
      Partial<IPaymentRecord> & { id: string }
    >({
      query: ({ id, ...body }) => ({
        url: `/subscription-payments/${id}`,
        method: "PUT",
        body,
      }),
    }),
    deletePayment: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/subscription-payments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["payments"],
    }),
  }),
});

export const {
  useGetPaymentsQuery,
  useGetPaymentByIdQuery,
  useCreatePaymentMutation,
  useUpdatePaymentMutation,
  useDeletePaymentMutation,
} = paymentApi;
