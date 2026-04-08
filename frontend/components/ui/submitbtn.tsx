import React from "react";
import { FaSpinner } from "react-icons/fa";

interface Props{
  loading?:boolean,
  label:string,
  onClick?:()=>void,
  type?:"submit"|"button"|"reset",
  className?:string
}
const submitbtn = ({ loading,label,onClick ,type,className}:Props) => {
  return (
    <button
    onClick={onClick}
      disabled={loading}
      type={type??"submit"}
      className={`${className? className:"bg-button-secondary text-black  w-20 "} rounded-lg px-4 py-2`}
    >
      {loading ? (
        <FaSpinner className="animate-spin fill-black flex mx-auto" />
      ) : (
        label
      )}
    </button>
  );
};

export default submitbtn;
