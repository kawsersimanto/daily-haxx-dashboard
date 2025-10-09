import { baseApi } from "@/redux/api/baseApi";
import { ApiResponse } from "@/types/api";
import { IArticle } from "./article.interface";

export const articleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getArticles: builder.query<IArticle[], void>({
      query: () => "/articles",
      providesTags: ["articles"],
    }),
    getArticleById: builder.query<IArticle, string>({
      query: (id) => `/articles/${id}`,
    }),
    getArticleBySlug: builder.query<ApiResponse<IArticle>, string>({
      query: (slug) => `/articles/slug/${slug}`,
    }),
    createArticle: builder.mutation<IArticle, Partial<IArticle>>({
      query: (body) => ({ url: "/articles", method: "POST", body }),
    }),
    updateArticle: builder.mutation<
      IArticle,
      Partial<IArticle> & { id: string }
    >({
      query: ({ id, ...body }) => ({
        url: `/articles/${id}`,
        method: "PUT",
        body,
      }),
    }),
    deleteArticle: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({ url: `/articles/${id}`, method: "DELETE" }),
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
