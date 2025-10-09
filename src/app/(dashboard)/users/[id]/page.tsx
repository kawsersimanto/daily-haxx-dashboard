import { UserProfileCard } from "@/features/user/components/UserProfileCard";
import { users } from "@/features/user/user.constants";

const UserDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  console.log(id);

  return (
    <div className="flex items-center justify-center">
      <UserProfileCard user={users[0]} />
    </div>
  );
};

export default UserDetails;
