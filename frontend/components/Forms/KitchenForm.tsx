import React, { useEffect, useRef, useState } from "react";
import FormSelect from "@/components/ui/FormSelect";

import Submitbtn from "@/components/ui/submitbtn";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { FloorData, FloorSchema } from "@/Schemas/tableSchema";

import Input from "@/components/ui/Input";
import { FloorTableData } from "@/types/table";
type branches = {
  value: string;
  label: string;
  subLabel: string;
};
interface Props {
  branches: branches[];
  isEdit: boolean;
  onSubmit: (selectedBranch: string, floorName: string, count: number) => void;
  initialData?: FloorTableData | null;
  isSubmitting?: boolean;
}
const KitchenFloor = ({
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
  } = useForm<FloorData>({
    resolver: zodResolver(FloorSchema),
  });

  const selectedBranches = watch("selectedBranch");

  const submitHandler = (data: FloorData) => {
    onSubmit(data.selectedBranch, data.floorName, data.count);
  };
  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (initialData) {
      setValue("selectedBranch", initialData.branchId);
      setValue("floorName", initialData.name);
      setValue("count", initialData.count);
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
            setValue("selectedBranch", val as string);
          }}
          value={selectedBranches}
          isMulti={false}
          disabled={isEdit}
        />

        <Input
          type="text"
          label="Floor Name"
          error={errors.floorName?.message}
          register={register("floorName")}
        />
        <Input
          type="text"
          label="No. of Tables"
          error={errors.count?.message}
          register={register("count", { valueAsNumber: true })}
        />
      </div>
      <div className="w-1/2 flex justify-end">
        <Submitbtn type="submit" label="Add" loading={isSubmitting} />
      </div>
    </form>
  );
};

export default KitchenFloor;
