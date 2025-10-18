"use client";

import { ArticleDataTable } from "@/features/article/components/ArticleDataTable";

const ArticlePage = () => {
  // const { data } =
  //   useGetArticlesQuery<
  //     ApiResponse<{ meta: ApiMeta; data: { data: IArticle[] } }>
  //   >();
  // const articles = data?.data?.data || [];

  return (
    <div>
      <ArticleDataTable />
    </div>
  );
};

export default ArticlePage;
