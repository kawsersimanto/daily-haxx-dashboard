import { baseApi } from "@/redux/api/baseApi";
import { Subscription } from "./subscription.interface";

export const subscriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSubscriptions: builder.query<Subscription[], void>({
      query: () => "/subscription",
    }),
    getSubscriptionById: builder.query<Subscription, string>({
      query: (id) => `/subscription/${id}`,
    }),
    createSubscription: builder.mutation<Subscription, Partial<Subscription>>({
      query: (body) => ({ url: "/subscription", method: "POST", body }),
    }),
    updateSubscription: builder.mutation<Subscription, Partial<Subscription> & { id: string }>(
      { query: ({ id, ...body }) => ({ url: `/subscription/${id}`, method: "PUT", body }) }
    ),
    deleteSubscription: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({ url: `/subscription/${id}`, method: "DELETE" }),
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
