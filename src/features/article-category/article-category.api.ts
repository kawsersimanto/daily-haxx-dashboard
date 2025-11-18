import { baseApi } from "@/redux/api/baseApi";
import { ApiParams, ApiResponse } from "@/types/api";
import { IArticleCategory } from "./article-category.interface";

export const articleCategoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<
      ApiResponse<IArticleCategory[], true>,
      Partial<ApiParams>
    >({
      query: ({ page, limit, searchTerm }) => ({
        url: "/article-category",
        params: { page, limit, searchTerm },
      }),
      providesTags: ["articleCategories"],
    }),
    getCategoryById: builder.query<ApiResponse<IArticleCategory>, string>({
      query: (id) => `/article-category/${id}`,
    }),
    createCategory: builder.mutation<
      ApiResponse<IArticleCategory>,
      Partial<IArticleCategory>
    >({
      query: (body) => ({
        url: "/article-category",
        method: "POST",
        body,
      }),
      invalidatesTags: ["articleCategories"],
    }),
    updateCategory: builder.mutation<
      ApiResponse<IArticleCategory>,
      Partial<IArticleCategory> & { id: string }
    >({
      query: ({ id, ...body }) => ({
        url: `/article-category/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["articleCategories"],
    }),
    deleteCategory: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/article-category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["articleCategories"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = articleCategoryApi;
