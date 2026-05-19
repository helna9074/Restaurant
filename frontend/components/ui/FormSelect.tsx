"use client";
import React, { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SearchBar from "../TableComponents/SearchBar";
import { useDebounce } from "@/hooks/useDebounce";
interface Option {
  value: string;
  label: string;
  subLabel?: string;
}
interface Props {
  placeholder: string;
  options: Option[];
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  label?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
  setOpen?: (value: boolean) => void;
  open?: boolean;
  isMulti?: boolean;
}

const FormSelect = ({
  placeholder,
  setOpen,
  open,
  options,
  value,
  onChange,
  label,
  error,
  disabled,
  className,

  isMulti,
}: Props) => {
  const [search, setSearch] = useState("");
  const debouncedValue = useDebounce(search, 400);
  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(debouncedValue.toLowerCase()),
  );
  const selectedValues = Array.isArray(value) ? value : value ? [value] : [];
  const handleSelect = (val: string) => {
    if (isMulti) {
      let updated: string[];

      updated = Array.from(new Set([...selectedValues, val]));

      onChange?.(updated);
    } else {
      onChange?.(val);
      setOpen?.(false);
    }
  };
  return (
    <div>
      <label className="text-text-secondary ms-2">{label}</label>

      <Select
        key={Array.isArray(value) ? value.join(",") : value}
        value={isMulti ? undefined : (value as string)}
        onValueChange={handleSelect}
        onOpenChange={setOpen}
        open={open}
      >
        <SelectTrigger
          disabled={disabled}
          className={`${className ? className : "w-full p-3! h-fit! bg-input-box! rounded-xl  text-text-secondary"}  `}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent
          className="z-100 w-80 max-w-full px-2"
          position="popper"
          side="bottom"
          align="start"
          sideOffset={4}
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          <div
            onKeyDown={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            className="flex justify-center items-center"
          >
            <SearchBar
              value={search}
              onChange={setSearch}
              className="w-full mx-auto border rounded-lg"
            />
          </div>

          {filteredOptions.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              <div className="flex flex-col text-start  ">
                <span>{item.label}</span>
                <span className="text-xs text-text-secondary">
                  {item.subLabel}
                </span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};
export default FormSelect;
