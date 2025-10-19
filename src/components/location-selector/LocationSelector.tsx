"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Country, useGetCountriesQuery } from "./countryApi";

interface LocationSelectorProps {
  disabled?: boolean;
  onCountryChange?: (country: Country | null) => void;
}

export const LocationSelector = ({
  disabled,
  onCountryChange,
}: LocationSelectorProps) => {
  const [openCountryDropdown, setOpenCountryDropdown] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  const { data: countries = [], isLoading, isError } = useGetCountriesQuery();

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    onCountryChange?.(country);
  };

  return (
    <div className="flex gap-4 w-full">
      <Popover open={openCountryDropdown} onOpenChange={setOpenCountryDropdown}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={openCountryDropdown}
            disabled={disabled || isLoading}
            className="w-full justify-between bg-white"
          >
            {selectedCountry ? (
              <div className="flex items-center gap-2">
                <Image
                  width={20}
                  height={20}
                  src={selectedCountry.flags.png}
                  alt={selectedCountry.name.common}
                  className="w-5 h-4 rounded-sm object-cover"
                />
                <span>{selectedCountry.name.common}</span>
              </div>
            ) : isLoading ? (
              <span>Loading...</span>
            ) : (
              <span>Select Country</span>
            )}
            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="p-0 w-[250px]">
          <Command>
            <CommandInput placeholder="Search country..." />
            <CommandList>
              {isError ? (
                <CommandEmpty>Error loading countries</CommandEmpty>
              ) : isLoading ? (
                <CommandEmpty>Loading...</CommandEmpty>
              ) : (
                <>
                  <CommandEmpty>No country found.</CommandEmpty>
                  <CommandGroup>
                    {countries.map((country: Country) => (
                      <CommandItem
                        key={country.name.common}
                        value={country.name.common}
                        onSelect={() => {
                          handleCountrySelect(country);
                          setOpenCountryDropdown(false);
                        }}
                        className="flex cursor-pointer items-center justify-between text-sm"
                      >
                        <div className="flex items-center gap-2">
                          <Image
                            width={20}
                            height={20}
                            src={country.flags.png}
                            alt={country.name.common}
                            className="w-5 h-4 rounded-sm object-cover"
                          />
                          <span>{country.name.common}</span>
                        </div>
                        <Check
                          className={cn(
                            "h-4 w-4",
                            selectedCountry?.name.common === country.name.common
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
