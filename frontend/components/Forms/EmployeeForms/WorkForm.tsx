import FormSelect from '@/components/ui/FormSelect'
import Input from '@/components/ui/Input'
import { WorkFormData, WorkSchema } from '@/Schemas/departmentSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import Submitbtn from "../../ui/submitbtn";
import { Branch } from "@/types/branch";

interface department{
    value:string
    label:string
}
interface positions{
    value:string
    label:string
}
 interface Props{
  
   departments:department[],
   positions:positions[],
   onSubmit: (data: WorkFormData) => void;
     onCancel: () => void;
     isEditing?: boolean;
     isSubmitting?: boolean;
     isOpen: boolean;
     initialData?: WorkFormData | null;
 }
const WorkForm = ({departments,positions,onSubmit,onCancel,isEditing,isSubmitting,isOpen,initialData}:Props) => {
     const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
      } = useForm<WorkFormData>({
        resolver: zodResolver(WorkSchema),
    
      });
      
        const Submit = async (data: WorkFormData) => {
          console.log("this is the formData", data);
          console.log("clicked submit")
          console.log(errors)
      
          onSubmit(data)
      
         
        };
        useEffect(()=>{
 if(initialData){
   reset(initialData)
 }
},[initialData])
  return (
     <form
         onSubmit={handleSubmit(
   Submit,
   (errors) => {
      console.log("Validation errors:", errors)
   }
 )}

          className="w-full p-5 flex flex-col gap-4"
        >
         
          <div className="grid grid-cols-2 gap-7">
             <Controller
              control={control}
              name="department"
              render={({ field }) => (
                <FormSelect
                  placeholder="Select"
                  options={departments}
                  onChange={(value) => {
                    field.onChange(value);
                  
                  }}
                  value={field.value || ""}
                 
                  error={errors.department?.message}
                
                  />
                 
              )}
              />
               <Controller
              control={control}
              name="position"
              render={({ field }) => (
                <FormSelect
                  placeholder="Select"
                  options={positions}
                  onChange={(value) => {
                    field.onChange(value);
                  
                  }}
                  value={field.value || ""}
                 
                  error={errors.position?.message}
                
                  />
                 
              )}
              />
          
          </div>
          <div className="grid grid-cols-2 gap-7">
            <Input
              type="text"
              placeholder="YYYY/MM/DD"
              label="Joining department"
              register={register("joiningDate")}
                         error={errors.joiningDate?.message}
       
       />
            <Input
              type="text"
              placeholder="Enter Salary"
              label="Salary"
              register={register("salary",{valueAsNumber:true})}
              error={errors.salary?.message}
                
     />
          </div>
          
        
          <div className="flex ms-auto">
            <Submitbtn
             type="submit"
              loading={isSubmitting}
              label={isEditing ? "update" : "Add"}
            />
          </div>
        </form>
  )
}

export default WorkForm
