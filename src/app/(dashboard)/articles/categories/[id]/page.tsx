import { Card } from "@/components/ui/card";
import { CategoryEditForm } from "@/features/article/components/CategoryEditForm";

const CategoryEdit = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  return (
    <Card className="max-w-xl p-3.5 rounded-md shadow-none gap-9 py-8 mx-auto">
      <CategoryEditForm id={id} />
    </Card>
  );
};

export default CategoryEdit;
