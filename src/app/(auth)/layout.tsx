const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <section className="flex items-center justify-center h-dvh py-8">
      <div className="container">{children}</div>
    </section>
  );
};

export default AuthLayout;
