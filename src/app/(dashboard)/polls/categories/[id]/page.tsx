import { Card } from "@/components/ui/card";

const PollEdit = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  console.log(id);

  return (
    <Card className="max-w-xl p-3.5 rounded-md shadow-none gap-9 py-8 mx-auto">
      Poll Edit
    </Card>
  );
};

export default PollEdit;
