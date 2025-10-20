import { baseApi } from "@/redux/api/baseApi";
import { ApiResponse } from "@/types/api";
import { ISubscription } from "./subscription.interface";

export const subscriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSubscriptions: builder.query<ApiResponse<ISubscription[], false>, void>({
      query: () => "/subscription-plans",
      providesTags: ["subscription"],
    }),
    getSubscriptionById: builder.query<ISubscription, string>({
      query: (id) => `/subscription-plans/${id}`,
    }),
    createSubscription: builder.mutation<ISubscription, Partial<ISubscription>>(
      {
        query: (body) => ({ url: "/subscription-plans", method: "POST", body }),
        invalidatesTags: ["subscription"],
      }
    ),
    updateSubscription: builder.mutation<
      ISubscription,
      Partial<ISubscription> & { id: string }
    >({
      query: ({ id, ...body }) => ({
        url: `/subscription-plans/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["subscription"],
    }),
    deleteSubscription: builder.mutation<
      { success: boolean; id: string },
      string
    >({
      query: (id) => ({ url: `/subscription-plans/${id}`, method: "DELETE" }),
      invalidatesTags: ["subscription"],
    }),
  }),
});

export const {
  useGetSubscriptionsQuery,
  useGetSubscriptionByIdQuery,
  useCreateSubscriptionMutation,
  useUpdateSubscriptionMutation,
  useDeleteSubscriptionMutation,
} = subscriptionApi;
