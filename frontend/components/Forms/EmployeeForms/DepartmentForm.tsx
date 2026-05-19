import React, { useEffect, useRef, useState } from "react";
import FormSelect from "@/components/ui/FormSelect";
import { Branch, CustomerRow, CustomerType } from "@/types/branch";
import Input from "@/components/ui/Input";
import { FaXmark } from "react-icons/fa6";
import Submitbtn from "@/components/ui/submitbtn";
import { useForm } from "react-hook-form";
import { DepartmentFormData, DepartmentSchema } from "@/Schemas/departmentSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoIosAdd } from "react-icons/io";
import {  departmentType } from "@/types/department";
type branches = {
  value: string;
  label: string;
  subLabel: string;
  
};
interface Props {
  branches: branches[];
  isEdit:boolean
  onSubmit: (selectedBranches: string[], departments: string[]) => void;
  initialData?: departmentType | null;
  isSubmitting?: boolean;
}

const DepartmentForm = ({ branches, onSubmit, initialData ,isSubmitting,isEdit}: Props) => {
 
   const {handleSubmit,setValue,watch,formState:{errors},register}=useForm<DepartmentFormData>({
     resolver:zodResolver(DepartmentSchema),
     defaultValues:{
       selectedBranches:[],
       departments:[]
     }
   })
   const selectedBranches=watch("selectedBranches")
   const departments=watch("departments")
   const selectedBranchOptions = branches.filter((b) =>
     selectedBranches.includes(b.value),
   );
 const selectedDepartments=departments
  useEffect(() => {
    if (initialData) {
      setValue("selectedBranches",[initialData.branch._id]);
      setValue("departments",[initialData.department]);
    }
  }, [initialData]);

    const submitHandler=(data:DepartmentFormData)=>{
    
      onSubmit(data.selectedBranches,data.departments)
    }
    const addDepartment=(value:string)=>{
      if(!value) return 
      if(isEdit){
        setValue("departments",[value])
        return 
      }
        //  if (departments.length >= 5) {
        //   alert("Max 5 departments allowed");
        //   return;
        // }
      if(!departments.includes(value)){
        setValue("departments",[...departments,value])
      }
    }
    const inputRef=useRef<HTMLInputElement|null>(null)
  return (
    <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col gap-3 items-center w-full justify-center">
      <div className="w-1/2">
        <FormSelect
          placeholder="Select Branch"
          options={branches}
          onChange={(val) => {setValue("selectedBranches",val as string[]);console.log(val,"val of branch")}}
          value={selectedBranches}
           isMulti={!isEdit}
          disabled={isEdit}
          error={errors.selectedBranches?.message}
        />
      </div>
      <div className="w-1/2 flex flex-wrap gap-2">
        {selectedBranchOptions.map((branch) => (
          <div
            key={branch.value}
            className="bg-input-box  relative text-secondary px-2 py-1 rounded-md "
          >
            <span className="text-sm">{branch.label}</span>
            <div className="bg-input-box rounded-full p-1 absolute -right-2 -top-2 cursor-pointer flex mx-auto">
              <FaXmark
                className=" text-secondary hover:text-red-500 text-sm"
                onClick={() =>
                  setValue("selectedBranches",selectedBranches.filter((v) => v !== branch.value))
                }
              />
            </div>
          </div>
        ))}
      </div>
      <div className="w-1/2">
      <div className=" bg-input-box p-3 rounded-md flex  text-black">
      {/* <input className="outline-0 flex-1"/> */}
       
        <input
          ref={inputRef}
          className="outline-0 flex-1"
          placeholder="Select"
         
          // register={register("departments")}
          type="text"
          onKeyDown={(e)=>{
            if(e.key==="Enter"){
              e.preventDefault();
              addDepartment(e.currentTarget.value.trim())
              e.currentTarget.value=""
            }
          }}

          
        />
 <IoIosAdd size={30} className="text-black cursor-pointer hover:scale-110 transition " onClick={()=>{
 const value=inputRef.current?.value.trim()
 
  addDepartment(value||"")
  if(inputRef.current) inputRef.current.value=""
 }

 } />
      </div>
      {errors.departments?.message && <p className="text-red-500 text-left">{errors.departments?.message}</p>}
      </div>
      <div className="w-1/2 flex flex-wrap gap-2">
        {selectedDepartments.slice(0,isEdit?1:undefined).map((c) => (
          <div
            key={c}
            className="bg-input-box relative text-secondary px-2 py-1 rounded-md "
          >
            <span className="text-sm ">{c}</span>
            <div className="bg-input-box rounded-full p-1 absolute -right-2 -top-2 cursor-pointer flex mx-auto">
              <FaXmark
                className=" text-secondary hover:text-red-500 text-sm"
                onClick={() =>
                  setValue("departments",departments.filter((v)  => v !== c))
                }
              />
            </div>
          </div>
        ))}
      </div>
      <div className="w-1/2 flex justify-end">
        <Submitbtn
        type="submit"
          label={isEdit? "Update":"Add"}
          loading={isSubmitting}

        />
      </div>
    </form>
  );
};

export default DepartmentForm;

