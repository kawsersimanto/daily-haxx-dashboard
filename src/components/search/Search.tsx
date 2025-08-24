"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  term: string;
  setTerm: (e: string) => void;
  triggerSearch: () => void;
}

export const SearchBar = ({ term, setTerm, triggerSearch }: SearchBarProps) => {
  return (
    <div className="flex w-full">
      <div className="relative w-full">
        <Search className="pointer-events-none absolute top-1/2 -translate-y-1/2 w-[15px] h-[15px] object-contain left-[15px]" />
        <Input
          type="text"
          placeholder="Search here"
          className="h-full md:px-10 ps-10 pe-2 py-4 font-medium rounded-tr-none rounded-br-none md:text-base text-sm"
          name="newsletterSearch"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && triggerSearch()}
        />
      </div>
      <Button
        onClick={triggerSearch}
        variant="default"
        className="h-auto rounded-tl-none rounded-bl-none md:px-7.5 px-4 uppercase md:text-base text-sm"
        disabled={!term}
      >
        Search
      </Button>
    </div>
  );
};
