import { baseApi } from "@/redux/api/baseApi";
import { ApiParams, ApiResponse } from "@/types/api";
import { IPaymentRecord } from "./payment.interface";

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPayments: builder.query<
      ApiResponse<IPaymentRecord[], true>,
      Partial<ApiParams>
    >({
      query: ({ page, limit }) => ({
        url: `/subscription-payments`,
        params: { page, limit },
      }),
      providesTags: ["payments"],
    }),
    getPaymentById: builder.query<ApiResponse<IPaymentRecord>, string>({
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
