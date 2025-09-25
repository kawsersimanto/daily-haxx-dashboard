import { Breadcrumbs } from "@/components/breadcrumbs/Breadcrumbs";

const DashboardPage = () => {
  return (
    <>
      <div>
        <Breadcrumbs
          manual={[
            { label: "Dashboard", href: "/" },
            { label: "Home", href: "/" },
          ]}
        />
      </div>
      asd
    </>
  );
};

export default DashboardPage;
