import React, { useEffect, useRef, useState } from "react";
import FormSelect from "@/components/ui/FormSelect";

import Submitbtn from "@/components/ui/submitbtn";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { TableFormData, TableSchema } from "@/Schemas/tableSchema";

import Input from "@/components/ui/Input";
import { FloorTableData, TableData } from "@/types/table";
import { useFloor } from "@/hooks/useFloors";
type branches = {
  value: string;
  label: string;
  subLabel: string;
};
interface Props {
  branches: branches[];
  isEdit: boolean;
  onSubmit: (
    selectedBranch: string,
    floorName: string,
    table: string,
    capacity: number,
  ) => void;
  initialData?: TableData | null;
  isSubmitting?: boolean;
}
const TableForm = ({
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
  } = useForm<TableFormData>({
    resolver: zodResolver(TableSchema),
  });

  const selectedBranches = watch("selectedBranch");
  const { data: floors } = useFloor(selectedBranches);
  const selectedFloor = watch("floorName");
  const FloorOptions = floors.map((f) => ({ value: f._id, label: f.name }));

  const submitHandler = (data: TableFormData) => {
    onSubmit(data.selectedBranch, data.floorName, data.table, data.capacity);
  };
  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (initialData) {
      setValue("selectedBranch", initialData.branchId);
      setValue("floorName", initialData.floor);
      setValue("table", initialData.table);
      setValue("capacity", initialData.capacity);
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
        <FormSelect
          placeholder="Select Floor"
          options={FloorOptions}
          onChange={(val) => {
            setValue("floorName", val as string);
          }}
          value={selectedFloor}
          isMulti={false}
        />

        <Input
          type="text"
          label="Table"
          error={errors.table?.message}
          register={register("table")}
        />
        <Input
          type="text"
          label="Capacity"
          error={errors.capacity?.message}
          register={register("capacity", { valueAsNumber: true })}
        />
      </div>
      <div className="w-1/2 flex justify-end">
        <Submitbtn type="submit" label="Add" loading={isSubmitting} />
      </div>
    </form>
  );
};

export default TableForm;
