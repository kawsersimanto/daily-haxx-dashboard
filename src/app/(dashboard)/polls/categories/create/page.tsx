import { Card } from "@/components/ui/card";
import { PollCategoryForm } from "@/features/poll-category/components/PollCategoryForm";

const CreatePoll = () => {
  return (
    <Card className="max-w-xl p-3.5 rounded-md shadow-none gap-9 py-8 mx-auto">
      <PollCategoryForm />
    </Card>
  );
};

export default CreatePoll;
