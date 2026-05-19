import React, { useEffect, useRef, useState } from "react";
import FormSelect from "@/components/ui/FormSelect";
import { FaXmark } from "react-icons/fa6";
import Submitbtn from "@/components/ui/submitbtn";
import { useForm } from "react-hook-form";
import { PositionType } from "@/types/department";

import TagInput from "@/components/ui/TabInput";
import { MenuFormData, MenuSchema } from "@/Schemas/menuSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { menuTableData } from "@/types/menu";
type branches = {
  value: string;
  label: string;
  subLabel: string;
  
};
interface Props {
  branches: branches[];
  
  isEdit:boolean
  onSubmit: (branchId: string, menus: string[]) => void;
  initialData?: menuTableData | null;
  isSubmitting?: boolean;
 
}
const MenuForm = ({ branches, onSubmit, initialData ,isSubmitting,isEdit}: Props) => {

  const {handleSubmit,setValue,watch,formState:{errors}}=useForm<MenuFormData>({
     resolver:zodResolver(MenuSchema),
     defaultValues:{
        menus:[]
     }
   
  })
  const selectedBranch=watch("branchId")
  
  const fullmenus=watch("menus")


  const submitHandler=(data:MenuFormData)=>{
    console.log("reached")
    console.log("this it he data hnow",data)
    onSubmit(data.branchId,data.menus)
  }

    const AddMenu=(value:string)=>{
      if(!value) return 
      if(isEdit){
        setValue("menus",[value])
        return 
      }
      
      if(!fullmenus.includes(value)){
        setValue("menus",[...fullmenus,value])
      }
    }
  const inputRef=useRef<HTMLInputElement|null>(null)
  useEffect(() => {
    if (initialData) {
      setValue("branchId",initialData.branchId);
      setValue("menus",[initialData.menutype]);

    }
  }, [initialData]);

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col gap-3 items-center w-full justify-center">
      <div className="w-1/2">
        <FormSelect
         label="select branch"
          placeholder="Select Branch"
          options={branches}
          onChange={(val) => {setValue("branchId",val  as string);console.log(val,"val of branch")}}
          value={selectedBranch}
           isMulti={false}
          disabled={isEdit}
        />
      </div>
    
     <div className="w-1/2">
      <TagInput placeholder="Add menu" onAdd={AddMenu} label="" />
     </div>
      <div className="w-1/2 flex flex-wrap gap-2">
        {fullmenus.slice(0,isEdit?1:undefined).map((c) => (
          <div
            key={c}
            className="bg-input-box relative text-secondary px-2 py-1 rounded-md "
          >
            <span className="text-sm ">{c}</span>
            <div className="bg-input-box rounded-full p-1 absolute -right-2 -top-2 cursor-pointer flex mx-auto">
              <FaXmark
                className=" text-secondary hover:text-red-500 text-sm"
                onClick={() =>
                  setValue("menus",fullmenus.filter((v)=>v!==c))
                }
              />
            </div>
          </div>
        ))}
      </div>
      <div className="w-1/2 flex justify-end">
        <Submitbtn
          label="Add"
          loading={isSubmitting}
         
        />
      </div>
    </form>
  );
};

export default MenuForm;
