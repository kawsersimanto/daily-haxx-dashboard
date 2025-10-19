const PollDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  console.log(id);

  return <div className="max-w-3xl mx-auto">Poll Details</div>;
};

export default PollDetailsPage;
