import { baseApi } from "@/redux/api/baseApi";
import { ApiParams, ApiResponse } from "@/types/api";
import { IPoll } from "./poll.interface";

export const pollApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPolls: builder.query<ApiResponse<IPoll[], true>, Partial<ApiParams>>({
      query: ({ page, limit }) => `/polls?page=${page}&limit=${limit}`,
      providesTags: ["polls"],
    }),
    getPollById: builder.query<IPoll, string>({
      query: (id) => `/polls/${id}`,
    }),
    createPoll: builder.mutation<IPoll, Partial<IPoll>>({
      query: (body) => ({ url: "/polls", method: "POST", body }),
    }),
    updatePoll: builder.mutation<IPoll, Partial<IPoll> & { id: string }>({
      query: ({ id, ...body }) => ({
        url: `/polls/${id}`,
        method: "PUT",
        body,
      }),
    }),
    deletePoll: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({ url: `/polls/${id}`, method: "DELETE" }),
    }),
  }),
});

export const {
  useGetPollsQuery,
  useGetPollByIdQuery,
  useCreatePollMutation,
  useUpdatePollMutation,
  useDeletePollMutation,
} = pollApi;
