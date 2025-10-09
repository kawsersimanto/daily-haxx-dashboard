import { UsersTable } from "@/features/user/components/UsersTable";
import { users } from "@/features/user/user.constants";

const UsersPage = () => {
  return (
    <div className="pt-10">
      <UsersTable data={users} />
    </div>
  );
};

export default UsersPage;
