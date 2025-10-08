import { Breadcrumbs } from "@/components/breadcrumbs/Breadcrumbs";

const UsersLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Breadcrumbs />
      {children}
    </>
  );
};

export default UsersLayout;
