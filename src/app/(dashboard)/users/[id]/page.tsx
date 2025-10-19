import { UserDetails } from "@/features/user/components/UserDetails";

const UserDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  return (
    <div className="flex items-center justify-center">
      <UserDetails id={id} />
    </div>
  );
};

export default UserDetailsPage;
