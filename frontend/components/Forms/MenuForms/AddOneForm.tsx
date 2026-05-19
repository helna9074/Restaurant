import React, { useEffect, useRef, useState } from "react";
import FormSelect from "@/components/ui/FormSelect";

import Submitbtn from "@/components/ui/submitbtn";
import { useFieldArray, useForm } from "react-hook-form";

import { AddOnFormData, AddOnSchema, MenuFormData, MenuSchema } from "@/Schemas/menuSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { menuTableData } from "@/types/menu";
import Input from "@/components/ui/Input";
import { TiInputChecked } from "react-icons/ti";
import { FaPlus, FaTrash } from "react-icons/fa";
type branches = {
  value: string;
  label: string;
  subLabel: string;
  
};
interface Props {
  branches: branches[];
  
  isEdit:boolean
  onSubmit: (branchId: string, addOn: string,portions?:{portion:string,price:number}[]) => void;
  initialData?: menuTableData | null;
  isSubmitting?: boolean;
 
}
const AddOneForm = ({ branches, onSubmit, initialData ,isSubmitting,isEdit}: Props) => {

  const {handleSubmit,setValue,watch,control,formState:{errors},register}=useForm<AddOnFormData>({
     resolver:zodResolver(AddOnSchema),
     defaultValues:{
        portions:[],
        addOn:"",
        branchId:""
     }
   
  })
  const{fields,append,remove}=useFieldArray({
    control,
    name:"portions"
  })
  const selectedBranch=watch("branchId")
  
 
 const hasPortions=fields.length>0

  const submitHandler=(data:AddOnFormData)=>{
    console.log("reached")
    console.log("this it he data hnow",data)
    onSubmit(data.branchId,data.addOn,data.portions)
  }

    // const AddMenu=(value:string)=>{
    //   if(!value) return 
    //   if(isEdit){
    //     setValue("menus",[value])
    //     return 
    //   }
      
    //   if(!fullmenus.includes(value)){
    //     setValue("menus",[...fullmenus,value])
    //   }
    // }
  const inputRef=useRef<HTMLInputElement|null>(null)
  useEffect(() => {
    if (initialData) {
      setValue("branchId",initialData.branchId);
      setValue("addOn",initialData.addOn);
      setValue("portions",initialData.portions);

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
      
        <Input
          type="text"
          label="Add ones Name"
          error={errors.addOn?.message}
          register={register("addOn")}
        />
         <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => {if(hasPortions){
                      remove();
                    }else{
                      append({portion:"",price:0})
                    }}
                  }
                  >
                    <div className="w-5 h-5 border border-gray-400 rounded-sm flex items-center justify-center">
                      {hasPortions && <TiInputChecked className="text-lg text-green-500" />}
                    </div>
                    <span>Offer</span>
        
                  </div>
                  {fields.map((f,i)=> (
                    <div key={f.id} className="flex gap-2">
                      <Input type='text' register={register(`portions.${i}.portion`)}/>
                      <Input type="text" register={register(`portions.${i}.price`,{
                        valueAsNumber:true
                      })}/>
                     <FaPlus
            className="cursor-pointer text-green-500"
            onClick={() =>
              append({
                portion: "",
                price: 0,
              })
            }
          />

          {/* Remove */}
          <FaTrash
            className="cursor-pointer text-red-500"
            onClick={() => remove(i)}
          />
                    </div>
                  ))}
                 
     {/* <div className="w-1/2">
      <TagInput placeholder="Add menu" onAdd={AddMenu} label="" />
     </div> */}
      {/* <div className="w-1/2 flex flex-wrap gap-2">
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
      </div> */}
      <div className="w-1/2 flex justify-end">
        <Submitbtn
          label="Add"
          loading={isSubmitting}
         
        />
      </div>
    </form>
  );
};

export default AddOneForm;
