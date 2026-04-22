"use client";
import React, { useEffect, useState } from "react";
import Input from "../../ui/Input";
import FormSelect from "../../ui/FormSelect";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Submitbtn from "../../ui/submitbtn";
import { Branch } from "@/types/branch";
import { PersonalFormData, PersonalSchema } from "@/Schemas/departmentSchema";

interface branchOpt{
  label:string,
  value:string,
  subLabel:string
}
interface Props {
  onSubmit: (data: PersonalFormData) => void;
  onCancel: () => void;
  isEditing?: boolean;
  isSubmitting?: boolean;
  isOpen: boolean;
  initialData?: PersonalFormData | null;
  branches:branchOpt[]
}
const PersonalForm = ({
  initialData,
  onCancel,
  onSubmit,
  isEditing,
  isSubmitting,
  isOpen,
  branches,
}: Props) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<PersonalFormData>({
    resolver: zodResolver(PersonalSchema),
    // defaultValues:initialData||{
    //   firstName: "",
    //   lastName: "",
    //   email: "",
    //   phone: "",
    //   branch: "",
    //   address: "",
    //   nationality: "",
    //   gender: "",
    // }
  });

 useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData]);

  


  
  const Submit = async (data: PersonalFormData) => {
    console.log("this is the formData", data);

    onSubmit(data)

   
  };
  console.log(errors, "thisese are the errors");
  return (
    <form
      onSubmit={handleSubmit(Submit)}
      className="w-full p-5 flex flex-col gap-4"
    >
      <Controller
          control={control}
          name="branch"
          render={({ field }) => (
            <FormSelect
              placeholder="Select Branch"
              options={branches}
              onChange={(value) => {
                field.onChange(value);
              
              }}
              disabled={isEditing}
              value={field.value || ""}
             
              error={errors.branch?.message}
            
              />
             
          )}
          />
      <div className="grid grid-cols-2 gap-7">
        <Input
          type="text"
          placeholder="Enter FristName"
          label="First Name"
          register={register("firstName")}
                     error={errors.firstName?.message}
    
    />
        <Input
          type="text"
          placeholder="Enter LastName"
          label="LastName"
          register={register("lastName")}
          error={errors.lastName?.message}
            
 />
      </div>
      <div className="grid grid-cols-2 gap-7">
        <Input
          type="text"
          placeholder="Enter Email"
          label="Email"
          register={register("email")}
                     error={errors.email?.message}
   
   />
        <Input
          type="text"
          placeholder="Enter Contanct No."
          label="Contanct No."
          register={register("phone")}
          error={errors.phone?.message}
            
 />
      </div>
      <div className="grid grid-cols-2 gap-7">
        
       
        <Input
          type="text"
          placeholder="Enter Address"
          label="Address"
          register={register("address")}
          error={errors.address?.message}
        />
         
        <Input
          type="text"
          placeholder="Enter Gender"
          label="Gender"
          register={register("gender")}
          error={errors.gender?.message}
        />
      </div>
        <Input
          type="text"
          placeholder="Enter Nationality"
          label="Nationality"
          register={register("nationality")}
          error={errors.nationality?.message}
        />
     
    
      <div className="flex ms-auto">
        <Submitbtn
          loading={isSubmitting}
          label={isEditing ? "update" : "Add"}
        />
      </div>
    </form>
  );
};

export default PersonalForm;
