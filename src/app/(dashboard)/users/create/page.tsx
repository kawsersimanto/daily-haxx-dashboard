import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { UserForm } from "@/features/user/components/UserForm";

const UserCreatePage = () => {
  return (
    <div>
      <Card className="max-w-4xl mx-auto px-10">
        <CardTitle className="flex items-center gap-3">
          <h2 className="font-work-sans font-medium text-lg">
            Create New User
          </h2>
        </CardTitle>
        <CardDescription>
          <UserForm />
        </CardDescription>
      </Card>
    </div>
  );
};

export default UserCreatePage;
