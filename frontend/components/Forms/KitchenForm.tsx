import React, { useEffect, useRef, useState } from "react";
import FormSelect from "@/components/ui/FormSelect";

import Submitbtn from "@/components/ui/submitbtn";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { FloorData, FloorSchema } from "@/Schemas/tableSchema";

import Input from "@/components/ui/Input";
import { FloorTableData } from "@/types/table";
import { KitchenFormData, KitchenSchema } from "@/Schemas/kitchenSchema";
import { kitchenTableData } from "@/types/kitchen";
type branches = {
  value: string;
  label: string;
  subLabel: string;
};
interface Props {
  branches: branches[];
  isEdit: boolean;
  onSubmit: (selectedBranch: string, kitchen: string) => void;
  initialData?: kitchenTableData | null;
  isSubmitting?: boolean;
}
const KitchenForm = ({
  branches,
  onSubmit,
  initialData,
  isSubmitting,
  isEdit,
}: Props) => {
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    register,
  } = useForm<KitchenFormData>({
    resolver: zodResolver(KitchenSchema),
  });

  const selectedBranches = watch("branchId");

  const submitHandler = (data: KitchenFormData) => {
    onSubmit(data.branchId, data.kitchen);
  };
  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (initialData) {
      setValue("branchId", initialData.branchId);
      setValue("kitchen", initialData.kitchen);
    }
  }, [initialData]);
  // const [selectedValue, setSelectedValue] = useState("");
  // const [paymentValue, setPaymentValue] = useState("");
  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="flex flex-col gap-3 items-center w-full justify-center"
    >
      <div className="w-1/2 flex flex-col">
        <FormSelect
          placeholder="Select Branch"
          options={branches}
          onChange={(val) => {
            setValue("branchId", val as string);
          }}
          value={selectedBranches}
          isMulti={false}
          disabled={isEdit}
        />

      
        <Input
          type="text"
          label="Kitchen Name"
          error={errors.kitchen?.message}
          register={register("kitchen")}
        />
      </div>
      <div className="w-1/2 flex justify-end">
        <Submitbtn type="submit" label="Add" loading={isSubmitting} />
      </div>
    </form>
  );
};

export default KitchenForm;
