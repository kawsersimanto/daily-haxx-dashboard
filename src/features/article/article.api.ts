import { baseApi } from "@/redux/api/baseApi";
import { ApiParams, ApiResponse } from "@/types/api";
import { IArticle } from "./article.interface";

export const articleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getArticles: builder.query<
      ApiResponse<IArticle[], true>,
      Partial<ApiParams>
    >({
      query: ({ page, limit }) => `/articles?page=${page}&limit=${limit}`,
      providesTags: ["articles"],
    }),

    getArticleById: builder.query<ApiResponse<IArticle>, string>({
      query: (id) => `/articles/${id}`,
    }),

    getArticleBySlug: builder.query<ApiResponse<IArticle>, string>({
      query: (slug) => `/articles/slug/${slug}`,
    }),

    createArticle: builder.mutation<ApiResponse<IArticle>, Partial<IArticle>>({
      query: (body) => ({
        url: "/articles",
        method: "POST",
        body,
      }),
    }),

    updateArticle: builder.mutation<
      ApiResponse<IArticle>,
      Partial<IArticle> & { id: string }
    >({
      query: ({ id, ...body }) => ({
        url: `/articles/${id}`,
        method: "PUT",
        body,
      }),
    }),

    deleteArticle: builder.mutation<ApiResponse<{ id: string }>, string>({
      query: (id) => ({
        url: `/articles/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["articles"],
    }),
  }),
});

export const {
  useGetArticlesQuery,
  useGetArticleByIdQuery,
  useGetArticleBySlugQuery,
  useCreateArticleMutation,
  useUpdateArticleMutation,
  useDeleteArticleMutation,
} = articleApi;
