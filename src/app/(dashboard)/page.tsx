import { Breadcrumbs } from "@/components/breadcrumbs/Breadcrumbs";
import { Dashboard } from "@/features/dashboard/components/Dashboard";

const DashboardPage = () => {
  return (
    <>
      <div className="bg-white py-6 md:px-10 px-5 shadow-[0_5px_20px_0_rgba(38,3,71,0.06)]">
        <h2>Dashboard</h2>
      </div>
      <div>
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
