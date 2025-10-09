"use client";

import { useGetArticlesQuery } from "@/features/article/article.api";
import { IArticle } from "@/features/article/article.interface";
import { ArticleTable } from "@/features/article/components/ArticleTable";
import { ApiMeta, ApiResponse } from "@/types/api";

const ArticlePage = () => {
  const { data } =
    useGetArticlesQuery<
      ApiResponse<{ meta: ApiMeta; data: { data: IArticle[] } }>
    >();

  const articles = data?.data?.data || [];

  return (
    <div>
      <ArticleTable data={articles} />
    </div>
  );
};

export default ArticlePage;
