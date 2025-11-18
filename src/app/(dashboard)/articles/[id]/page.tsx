import { ArticleDetailsCard } from "@/features/article/components/ArticleDetailsCard";

const ArticleDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  return (
    <div className="max-w-3xl mx-auto">
      <ArticleDetailsCard id={id} />
    </div>
  );
};

export default ArticleDetailsPage;
