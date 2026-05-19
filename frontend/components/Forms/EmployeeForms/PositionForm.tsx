import React, { useEffect, useRef, useState } from "react";
import FormSelect from "@/components/ui/FormSelect";

import { FaXmark } from "react-icons/fa6";
import Submitbtn from "@/components/ui/submitbtn";
import { useForm } from "react-hook-form";

import { PositionFormData } from "@/Schemas/departmentSchema";
import { PositionType } from "@/types/department";
import { IoIosAdd } from "react-icons/io";
import TagInput from "@/components/ui/TabInput";
type branches = {
  value: string;
  label: string;
  subLabel: string;
  
};
type department={
    value:string,
    label:string
}
interface Props {
  branches: branches[];
  departments: department[]
  isEdit:boolean
  onSubmit: (selectedBranches: string, department: string, positions: string[]) => void;
  initialData?: PositionType | null;
  isSubmitting?: boolean;
  setFormBranchId:(value:string)=>void
}
const PositionForm = ({ branches, onSubmit, initialData ,isSubmitting,isEdit,departments,setFormBranchId}: Props) => {

  const {handleSubmit,setValue,watch,formState:{errors}}=useForm<PositionFormData>({
    // resolver:zodResolver(PositionSchema),
    defaultValues:{
      selectedBranches:"",
      selectedDepartment:"",
      positions:[]
    }
  })
  const selectedBranch=watch("selectedBranches")
  const selectedDepartment=watch("selectedDepartment")
  const positions=watch("positions")
  const selectedPositions = positions.filter((b) =>
    positions.includes(b),
  );
//   const selectedCustomerType = customerType.filter((p) =>
//     customer.includes(p.value),
//   );
  const submitHandler=(data:PositionFormData)=>{
    console.log("reached")
    console.log("this it he data hnow",data)
    onSubmit(data.selectedBranches,data.selectedDepartment,data.positions)
  }

    const AddPosition=(value:string)=>{
      if(!value) return 
      if(isEdit){
        setValue("positions",[value])
        return 
      }
      
      if(!positions.includes(value)){
        setValue("positions",[...positions,value])
      }
    }
  const inputRef=useRef<HTMLInputElement|null>(null)
  useEffect(() => {
    if (initialData) {
      setValue("selectedBranches",initialData.branch._id);
      setValue("positions",[initialData.position]);
      setValue("selectedDepartment",initialData.department._id);
    }
  }, [initialData]);
  // const [selectedValue, setSelectedValue] = useState("");
  // const [paymentValue, setPaymentValue] = useState("");
  return (
    <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col gap-3 items-center w-full justify-center">
      <div className="w-1/2">
        <FormSelect
          placeholder="Select Branch"
          options={branches}
          onChange={(val) => {setValue("selectedBranches",val  as string);setFormBranchId(val as string);console.log(val,"val of branch")}}
          value={selectedBranch}
           isMulti={false}
          disabled={isEdit}
        />
      </div>
    
      <div className="w-1/2">
        <FormSelect
          placeholder="Select"
          label="Select Department"
          options={departments}
          isMulti={false}
          onChange={(val) =>{ setValue("selectedDepartment",(val as string));console.log(val,"val of department")}}
          value={selectedDepartment}
          
          error={errors.selectedDepartment?.message}
        />
      </div>
      <TagInput placeholder="Add Positions" onAdd={AddPosition} label="Positions" />
      {/* <div className=" bg-input-box p-3 rounded-md flex  text-black"> */}
            {/* <input className="outline-0 flex-1"/> */}
             
              {/* <input
                ref={inputRef}
                className="outline-0 flex-1"
                placeholder="Add Positions"
               
                // register={register("departments")}
                type="text"
                onKeyDown={(e)=>{
                  if(e.key==="Enter"){
                    e.preventDefault();
                    AddPosition(e.currentTarget.value.trim())
                    e.currentTarget.value=""
                  }
                }}
      
                 */}
              {/* /> */}
       {/* <IoIosAdd size={30} className="text-black cursor-pointer hover:scale-110 transition " onClick={()=>{
       const value=inputRef.current?.value.trim()
       
        AddPosition(value||"")
        if(inputRef.current) inputRef.current.value=""
       }
      
       } /> */}
            {/* </div> */}
      <div className="w-1/2 flex flex-wrap gap-2">
        {selectedPositions.slice(0,isEdit?1:undefined).map((c) => (
          <div
            key={c}
            className="bg-input-box relative text-secondary px-2 py-1 rounded-md "
          >
            <span className="text-sm ">{c}</span>
            <div className="bg-input-box rounded-full p-1 absolute -right-2 -top-2 cursor-pointer flex mx-auto">
              <FaXmark
                className=" text-secondary hover:text-red-500 text-sm"
                onClick={() =>
                  setValue("positions",positions.filter((v)=>v!==c))
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

export default PositionForm;
