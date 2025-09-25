// utils/createLucideIcon.tsx
import type { LucideProps } from "lucide-react";
import { forwardRef, JSX } from "react";

export function createLucideIcon(name: string, paths: JSX.Element[]) {
  const Component = forwardRef<SVGSVGElement, LucideProps>(
    (
      {
        color = "currentColor",
        size = 24,
        strokeWidth = 2,
        className,
        ...props
      },
      ref
    ) => (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        {...props}
      >
        {paths}
      </svg>
    )
  );

  Component.displayName = name;
  return Component;
}
