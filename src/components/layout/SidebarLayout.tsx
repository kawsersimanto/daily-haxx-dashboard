import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const SidebarLayout = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <section
      className={cn(
        "grid lg:grid-cols-[1fr_360px] gap-6 pt-4 pb-10",
        className
      )}
    >
      {children}
    </section>
  );
};

export default SidebarLayout;
