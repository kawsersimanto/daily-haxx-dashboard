import { ArticleDetailsCard } from "@/features/article/components/ArticleDetailsCard";

const ArticleDetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  return (
    <div className="max-w-3xl mx-auto">
      <ArticleDetailsCard slug={slug} />
    </div>
  );
};

export default ArticleDetailsPage;
