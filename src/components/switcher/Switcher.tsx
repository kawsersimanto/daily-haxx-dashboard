"use client";

import Moon from "@/assets/navbar/moon.svg";
import Sun from "@/assets/navbar/sun.svg";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

const Switcher = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="w-auto h-auto border-none focus-visible:ring-0 focus-visible:bg-transparent hover:bg-transparent hover:shadow-none"
      >
        <Button
          variant="outline"
          size="icon"
          className="hover:bg-transparent !bg-transparent"
        >
          {resolvedTheme === "light" && (
            <Image
              src={Sun}
              alt="Sun icon"
              width={25}
              height={25}
              className="xl:w-[25px] w-[20px] xl:h-[25px] h-[20px] object-contain"
            />
          )}
          {resolvedTheme === "dark" && (
            <Image
              src={Moon}
              alt="Moon icon"
              width={25}
              height={25}
              className="xl:w-[25px] w-[20px] xl:h-[25px] h-[20px] object-contain"
            />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="font-medium"
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="font-medium"
        >
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="font-medium"
        >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Switcher;
