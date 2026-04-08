import React from "react";
import { CiSearch } from "react-icons/ci";
interface Props {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
}
const SearchBar = ({ onChange, value, className, placeholder }: Props) => {
  return (
    <div
      className={`flex items-center ${className ? className : "border-2 rounded-full w-52"}  px-3 py-1 relative `}
    >
      <CiSearch size={20} className="absolute right-2" />
      <input
        type="text"

        className="outline-0 w-full"
        onChange={(e) => onChange(e.target.value)}
        value={value}
        placeholder={placeholder||"Search"}
      />
    </div>
  );
};

export default SearchBar;
