import { Breadcrumbs } from "@/components/breadcrumbs/Breadcrumbs";
import { Dashboard } from "@/features/dashboard/components/Dashboard";

const DashboardPage = () => {
  return (
    <>
      <Breadcrumbs
        manual={[
          { label: "Dashboard", href: "/" },
          { label: "Home", href: "/" },
        ]}
      />
      <Dashboard />
    </>
  );
};

export default DashboardPage;
