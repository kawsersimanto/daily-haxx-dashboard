import { useGetArticlesQuery } from "@/features/article/article.api";

export const useArticle = () => {
  const { data, isLoading, error } = useGetArticlesQuery();
  return { data, isLoading, error };
};
