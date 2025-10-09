import { Card } from "@/components/ui/card";
import { CreateCategoryForm } from "@/features/article/components/CreateCategoryForm";

const CreateCategories = () => {
  return (
    <Card className="max-w-xl p-3.5 rounded-md shadow-none gap-9 py-8 mx-auto">
      <CreateCategoryForm />
    </Card>
  );
};

export default CreateCategories;
