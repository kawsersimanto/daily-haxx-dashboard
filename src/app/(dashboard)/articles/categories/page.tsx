"use client";

import { useGetCategoriesQuery } from "@/features/article/articleCategory.api";
import { CategoryTable } from "@/features/article/components/CategoriesTable";

const ArticleCategoryPage = () => {
  const { data } = useGetCategoriesQuery();
  const categories = data?.data || [];

  return <CategoryTable data={categories} />;
};

export default ArticleCategoryPage;
