import { Card, CardDescription, CardTitle } from "@/components/ui/card";

const CreateSubscriptionPage = () => {
  return (
    <div>
      <Card className="max-w-4xl mx-auto px-10">
        <CardTitle className="flex items-center gap-3">
          <h2 className="font-work-sans font-medium text-lg">
            Create Subscription
          </h2>
        </CardTitle>
        <CardDescription>Subscription Form</CardDescription>
      </Card>
    </div>
  );
};

export default CreateSubscriptionPage;
