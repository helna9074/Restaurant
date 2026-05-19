import React, { useRef } from "react";
import { IoIosAdd } from "react-icons/io";

interface TagInputProps {
  placeholder?: string;
  onAdd: (value: string) => void;
  label?:string
}

const TagInput = ({ placeholder, onAdd, label }: TagInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAdd = () => {
    const value = inputRef.current?.value.trim();
    if (!value) return;

    onAdd(value);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <>
        <label>{label}</label>
   
    <div className="bg-input-box p-3 rounded-md flex text-black">
      <input
        ref={inputRef}
        className="outline-0 flex-1"
        placeholder={placeholder}
        type="text"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleAdd();
          }
        }}
      />

      <IoIosAdd
        size={30}
        className="text-black cursor-pointer hover:scale-110 transition"
        onClick={handleAdd}
      />
    </div>
    </>
  );
};

export default TagInput;