import { Breadcrumbs } from "@/components/breadcrumbs/Breadcrumbs";
import { Dashboard } from "@/features/dashboard/components/Dashboard";

const DashboardPage = () => {
  return (
    <>
      <div className="p-5">
        <Breadcrumbs
          manual={[
            { label: "Dashboard", href: "/" },
            { label: "Home", href: "/" },
          ]}
        />
        <Dashboard />
      </div>
    </>
  );
};

export default DashboardPage;
