import { baseApi } from "@/redux/api/baseApi";
import { ApiParams, ApiResponse } from "@/types/api";
import { IPollCategories } from "./poll-category.interface";

export const pollApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPollCategories: builder.query<
      ApiResponse<IPollCategories[], true>,
      Partial<ApiParams>
    >({
      query: ({ page, limit, searchTerm }) => ({
        url: `/poll-category`,
        params: { page, limit, searchTerm },
      }),
      providesTags: ["pollCategories"],
      keepUnusedDataFor: 60,
    }),
    getPollCategoryById: builder.query<ApiResponse<IPollCategories>, string>({
      query: (id) => `/poll-category/${id}`,
    }),
    createPollCategory: builder.mutation<
      IPollCategories,
      Partial<IPollCategories>
    >({
      query: (body) => ({ url: "/poll-category", method: "POST", body }),
      invalidatesTags: ["pollCategories"],
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
      invalidatesTags: ["pollCategories"],
    }),
    deletePollCategory: builder.mutation<
      { success: boolean; id: string },
      string
    >({
      query: (id) => ({ url: `/poll-category/${id}`, method: "DELETE" }),
      invalidatesTags: ["pollCategories"],
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
