import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Payment } from "@/features/payment/components/Payment";

const PaymentDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  return (
    <div>
      <Card className="max-w-4xl mx-auto px-10">
        <CardTitle className="flex items-center gap-3">
          <h2 className="font-work-sans font-medium text-lg sr-only">
            View Payment Details
          </h2>
        </CardTitle>
        <CardDescription>
          <Payment id={id} />
        </CardDescription>
      </Card>
    </div>
  );
};

export default PaymentDetailsPage;
