import React from 'react'
import { IoMdCheckboxOutline, IoMdSquareOutline } from "react-icons/io";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
interface Props{
    onChange:(value:boolean)=>void
    checked?:boolean
    label:string
}
const checkbox = ({onChange,checked,label}:Props) => {
  return (
    <label className='flex items-center gap-2 cursor-pointer'>
         <input
        type="checkbox"
        className="peer hidden"
        checked={checked??false}
        onChange={(e) => onChange(e.target.checked)}
       

      />

      {checked ? (
           <IoMdCheckboxOutline size={22} className="text-gray-500" />
      ) : (
           <IoMdSquareOutline size={22} className="text-gray-500" /> 
      )
      }
       
    
      


      <span className="text-text-secondary">{label}</span>
    </label>
  )
}

export default checkbox
