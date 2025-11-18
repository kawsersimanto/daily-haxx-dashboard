import { Card } from "@/components/ui/card";
import { PollCategoryEditForm } from "@/features/poll-category/components/PollCategoryEditForm";

const PollEdit = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return (
    <Card className="max-w-xl p-3.5 rounded-md shadow-none gap-9 py-8 mx-auto">
      <PollCategoryEditForm id={id} />
    </Card>
  );
};

export default PollEdit;
