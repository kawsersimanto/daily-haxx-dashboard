import { Logo } from "@/components/logo/Logo";
import { Card, CardDescription } from "@/components/ui/card";
import { SignInForm } from "@/features/auth/components/SignInForm";

const LoginPage = () => {
  return (
    <Card className="max-w-[530px] mx-auto py-12 relative">
      <CardDescription>
        <div className="flex justify-center mb-[38px]">
          <Logo className="w-[140px]" />
        </div>
        <SignInForm />
      </CardDescription>
    </Card>
  );
};

export default LoginPage;
