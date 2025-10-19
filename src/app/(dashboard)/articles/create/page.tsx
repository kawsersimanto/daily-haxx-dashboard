import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { ArticleForm } from "@/features/article/components/ArticleForm";

const CreateArticlePage = () => {
  return (
    <div>
      <Card className="max-w-4xl mx-auto px-10">
        <CardTitle className="flex items-center gap-3">
          <h2 className="font-work-sans font-medium text-lg">Create Article</h2>
        </CardTitle>
        <CardDescription>
          <ArticleForm />
        </CardDescription>
      </Card>
    </div>
  );
};

export default CreateArticlePage;
