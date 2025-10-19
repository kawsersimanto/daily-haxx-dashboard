import { baseApi } from "@/redux/api/baseApi";
import { Poll } from "./poll.interface";

export const pollApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPolls: builder.query<Poll[], void>({
      query: () => "/poll",
    }),
    getPollById: builder.query<Poll, string>({
      query: (id) => `/poll/${id}`,
    }),
    createPoll: builder.mutation<Poll, Partial<Poll>>({
      query: (body) => ({ url: "/poll", method: "POST", body }),
    }),
    updatePoll: builder.mutation<Poll, Partial<Poll> & { id: string }>(
      { query: ({ id, ...body }) => ({ url: `/poll/${id}`, method: "PUT", body }) }
    ),
    deletePoll: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({ url: `/poll/${id}`, method: "DELETE" }),
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
