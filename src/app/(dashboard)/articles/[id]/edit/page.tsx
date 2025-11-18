import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { ArticleEditForm } from "@/features/article/components/ArticleEditForm";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  console.log(id);

  return (
    <Card className="max-w-4xl mx-auto px-10">
      <CardTitle className="flex items-center gap-3">
        <h2 className="font-work-sans font-medium text-lg">View Department</h2>
      </CardTitle>
      <CardDescription>
        <ArticleEditForm id={id} />
      </CardDescription>
    </Card>
  );
};

export default Page;
