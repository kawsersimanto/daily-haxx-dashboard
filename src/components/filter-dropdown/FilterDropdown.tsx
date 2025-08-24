"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterDropdownProps {
  category: string;
  setCategory: (value: string) => void;
  options: string[];
}

export const FilterDropdown = ({
  category,
  setCategory,
  options,
}: FilterDropdownProps) => {
  return (
    <Select value={category} onValueChange={setCategory}>
      <SelectTrigger className="!h-auto py-4">
        <SelectValue placeholder="Select Category" />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
