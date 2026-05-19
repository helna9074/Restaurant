"use client";
import React, { useEffect, useState } from "react";
import Input from "@/components/ui/Input";
import FormSelect from "@/components/ui/FormSelect";
import { SlPicture } from "react-icons/sl";
import {
  Countryopt,
  stateData,
  workingDaysOptions,
} from "@/constants/Branchdata";
import Checkbox from "@/components/ui/checkbox";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BranchFormDAta, branchSchema } from "@/Schemas/branchSchema";
import Submitbtn from "@/components/ui/submitbtn";
import { Branch } from "@/types/branch";

interface Props {
  onSubmit: (formData: FormData) => void;
  onCancel: () => void;
  isEditing?: boolean;
  isSubmitting?: boolean;
  isOpen: boolean;
  initialData?: Branch | null;
}
const BranchForm = ({
  initialData,
  onCancel,
  onSubmit,
  isEditing,
  isSubmitting,
  isOpen,
}: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm<BranchFormDAta>({
    resolver: zodResolver(branchSchema),
    defaultValues: { reservationRequired: false, HalalCertified: false },
  });

  useEffect(() => {
    if (!isOpen) return;
    reset({
      ...initialData,
      logo: initialData?.logo || "",
      HalalCertified: initialData?.HalalCertified ?? false, // ✅ FIX
      reservationRequired: initialData?.reservationRequired ?? false, // safety
    });

    console.log("this is the initial datas", initialData);
  }, [isOpen, initialData]);
  const [preview, setPreview] = useState("");

  const country = watch("country");
  const logo = watch("logo");
  const stateOptions = stateData[country] || [];

  useEffect(() => {
    if (!logo) return;
    if (typeof logo === "string") {
      setPreview(logo);
    } else {
      const url = URL.createObjectURL(logo);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [logo]);
  const Submit = async (data: BranchFormDAta) => {
    console.log("this is the formData", data);

    console.log("this is the logo sending", data.logo);
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key === "logo") {
        if (value instanceof File) {
          formData.append("logo", value);
        }
      } else {
        formData.append(key, String(value ?? ""));
      }
    });
    onSubmit(formData);
  };
  console.log(errors, "thisese are the errors");
  return (
    <form
      onSubmit={handleSubmit(Submit)}
      className="w-full p-5 flex flex-col gap-4"
    >
      <div className="grid grid-cols-2 gap-7">
        <Input
          type="text"
          placeholder="Enter name"
          label="Name"
          register={register("name")}
                     error={errors.name?.message}
    
    />
        <Input
          type="text"
          placeholder="Enter Address"
          label="Address"
          register={register("address")}
          error={errors.address?.message}
            
 />
      </div>
      <div className="grid grid-cols-2 gap-7">
        <Input
          type="text"
          placeholder="Enter Phone No"
          label="Phone No"
          register={register("phone")}
                     error={errors.phone?.message}
   
   />
        <Input
          type="text"
          placeholder="Enter Lan Line No"
          label="Lan Line No"
          register={register("LanLine")}
          error={errors.LanLine?.message}
            
 />
      </div>
      <div className="grid grid-cols-3 gap-7 items-center content-center justify-center">
        <Controller
          control={control}
          name="country"
          render={({ field }) => (
            <FormSelect
              placeholder="Select country"
              options={Countryopt}
              onChange={(value) => {
                field.onChange(value);
                setValue("state", "");
              }}
              value={field.value || ""}
              label="Country"
              error={errors.country?.message}
            
              />
          )}
        />
        <Controller
          control={control}
          name="state"
          render={({ field }) => (
            <FormSelect
              disabled={!country}
              placeholder="Select state"
              options={stateOptions}
              onChange={field.onChange}
              value={field.value || ""}
              label="State"
              error={errors.state?.message}
            />
          )}
        />
        <Input
          type="text"
          placeholder="Enter city"
          label="City"
          register={register("city")}
          error={errors.city?.message}
        />
      </div>
      <div className=" grid grid-cols-6  gap-4 justify-center items-center">
        <div className="grid col-span-3">
          <Input
            type="file"
            label="Logo"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setValue("logo", file);
            }}
          />
        </div>
        <div className=" grid col-span-1 justify-center items-center lg:h-24 w-20 h-20 bg-input-box rounded-2xl text-text-secondary">
          {logo ? (
            <img
              src={preview}
              alt="logo"
              className="w-full h-full object-cover  "
            />
          ) : (
            <SlPicture className="text-5xl " />
          )}
        </div>

        <div className="grid col-span-2 gap-7">
          <Controller
            control={control}
            name="workingDays"
            render={({ field }) => (
              <FormSelect
                placeholder="Select"
                options={workingDaysOptions}
                onChange={field.onChange}
                value={field.value || ""}
                label="Working Days"
              />
            )}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-7">
        <Input
          type="text"
          label="Opening Time"
          register={register("openingtime")}
        />
        <Input
          type="text"
          label="Closing Time"
          register={register("closingtime")}
        />
      </div>
      <div className="grid grid-cols-2 gap-7">
        <Input
          type="text"
          label="Currency"
          placeholder="Enter Currency"
          register={register("currency")}
        />
        <Input
          type="text"
          label="Currency Symbol"
          placeholder="Add Symbol"
          register={register("currencySymbol")}
        />
      </div>
      <div className="grid grid-cols-2 gap-7">
        <Input
          type="text"
          label="Owner Name"
          placeholder="Enter Name"
          register={register("ownername")}
          error={errors.ownername?.message}
        />
        <Input
          type="text"
          label="Owner Email"
          placeholder="Enter Email"
          register={register("email")}
          error={errors.email?.message}
        />
      </div>
      <div className="grid grid-cols-2 gap-7">
        <Input
          type="text"
          label="Minimum Order Value"
          placeholder="Enter Value"
          register={register("ordervalue")}
        />
        <Input
          type="text"
          label="Average Prepation Time"
          placeholder="Enter pre Time"
          register={register("pretime")}
        />
      </div>
      <div className="flex gap-5 mt-3">
        <Controller
          control={control}
          name="reservationRequired"
          render={({ field }) => (
            <Checkbox
              onChange={field.onChange}
              checked={field.value}
              label="Reservation Required"
            />
          )}
        />
        <Controller
          control={control}
          name="HalalCertified"
          render={({ field }) => (
            <Checkbox
              onChange={field.onChange}
              checked={field.value}
              label="Hala Certified"
            />
          )}
        />
      </div>
      <div className="flex ms-auto">
        <Submitbtn
          loading={isSubmitting}
          label={isEditing ? "update" : "Add"}
        />
      </div>
    </form>
  );
};

export default BranchForm;
