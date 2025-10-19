const SubscriptionDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  console.log(id);

  return <div className="max-w-3xl mx-auto">Subscription Details</div>;
};

export default SubscriptionDetailsPage;
