import { UsersTable } from "@/features/user/components/UsersTable";
import { users } from "@/features/user/user.constants";

const UsersPage = () => {
  return (
    <>
      <UsersTable data={users} />
    </>
  );
};

export default UsersPage;
