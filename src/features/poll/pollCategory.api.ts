import { baseApi } from "@/redux/api/baseApi";
import { ApiParams, ApiResponse } from "@/types/api";
import { IPollCategories } from "./poll.interface";

export const pollApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPollCategories: builder.query<
      ApiResponse<IPollCategories[], true>,
      Partial<ApiParams>
    >({
      query: ({ page, limit }) => `/poll-category?page=${page}&limit=${limit}`,
      providesTags: ["pollCategories"],
    }),
    getPollCategoryById: builder.query<IPollCategories, string>({
      query: (id) => `/poll-category/${id}`,
    }),
    createPollCategory: builder.mutation<
      IPollCategories,
      Partial<IPollCategories>
    >({
      query: (body) => ({ url: "/poll-category", method: "POST", body }),
    }),
    updatePollCategory: builder.mutation<
      IPollCategories,
      Partial<IPollCategories> & { id: string }
    >({
      query: ({ id, ...body }) => ({
        url: `/poll-category/${id}`,
        method: "PUT",
        body,
      }),
    }),
    deletePollCategory: builder.mutation<
      { success: boolean; id: string },
      string
    >({
      query: (id) => ({ url: `/poll-category/${id}`, method: "DELETE" }),
    }),
  }),
});

export const {
  useGetPollCategoriesQuery,
  useGetPollCategoryByIdQuery,
  useCreatePollCategoryMutation,
  useUpdatePollCategoryMutation,
  useDeletePollCategoryMutation,
} = pollApi;
