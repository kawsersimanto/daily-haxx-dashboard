import { baseApi } from "@/redux/api/baseApi";
import { Payment } from "./payment.interface";

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPayments: builder.query<Payment[], void>({
      query: () => "/payment",
    }),
    getPaymentById: builder.query<Payment, string>({
      query: (id) => `/payment/${id}`,
    }),
    createPayment: builder.mutation<Payment, Partial<Payment>>({
      query: (body) => ({ url: "/payment", method: "POST", body }),
    }),
    updatePayment: builder.mutation<Payment, Partial<Payment> & { id: string }>(
      { query: ({ id, ...body }) => ({ url: `/payment/${id}`, method: "PUT", body }) }
    ),
    deletePayment: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({ url: `/payment/${id}`, method: "DELETE" }),
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
