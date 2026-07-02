import React, { useEffect } from "react";
import FormSelect from "@/components/ui/FormSelect";
import Submitbtn from "@/components/ui/submitbtn";
import { useFieldArray, useForm } from "react-hook-form";
import { AddOnFormData, AddOnSchema } from "@/Schemas/menuSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/ui/Input";
import { TiInputChecked } from "react-icons/ti";
import { FaPlus, FaTrash } from "react-icons/fa";
import { addOnTableData } from "@/types/menu";

type Branch = {
  value: string;
  label: string;
  subLabel: string;
};

interface Props {
  branches: Branch[];
  isEdit: boolean;
  onSubmit: (
    branchId: string,
    addOn: string,
    portions: { portion: string; price: number }[]
  ) => void;
  initialData?: addOnTableData | null;
  isSubmitting?: boolean;
}

const AddOneForm = ({
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
    control,
    register,
    formState: { errors },
  } = useForm<AddOnFormData>({
    resolver: zodResolver(AddOnSchema),
    defaultValues: {
      branchId: "",
      addOn: "",
      portions: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "portions",
  });

  const selectedBranch = watch("branchId");

  // checkbox state
  const hasPortions = fields.length > 0;

  const submitHandler = (data: AddOnFormData) => {
   
    console.log("submitting the data in the handler",data) 
    onSubmit(data.branchId, data.addOn, data.portions??[]);
  };

  useEffect(() => {
    if (initialData) {
      setValue("branchId", initialData.branchId);
      setValue("addOn", initialData.addOnName);

      if (initialData.portions) {
        setValue("portions", initialData.portions);
      }
    }
  }, [initialData, setValue]);

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
        onKeyDown={(e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  }}
      className="flex flex-col gap-4 items-center w-full"
    >
      {/* Branch */}
      <div className="w-1/2">
        <FormSelect
          label="Select Branch"
          placeholder="Select Branch"
          options={branches}
          value={selectedBranch}
          onChange={(val) => setValue("branchId", val as string)}
          isMulti={false}
          disabled={isEdit}
        />
      </div>

      {/* Addon Name */}
      <div className="w-1/2">
        <Input
          type="text"
          label="AddOn Name"
          register={register("addOn")}
          error={errors.addOn?.message}
        />
      </div>

      {/* Checkbox */}
      <div
        className="flex w-1/2 gap-2 cursor-pointer "
        onClick={() => {
          if (hasPortions) {
            remove();
          } else {
            append({ portion: "", price: 0 });
          }
        }}
      >
        <div className="w-5 h-5 border rounded flex justify-center items-center">
          {hasPortions && (
            <TiInputChecked className="text-green-500 text-lg" />
          )}
        </div>

        <span> Portions</span>
      </div>

      {/* Dynamic Portion Inputs */}
      {fields.map((field, i) => (
        <div
          key={field.id}
          className="w-1/2 flex gap-2 items-center justify-center"
        >
          <Input
            type="text"
            placeholder="Portion"
            register={register(`portions.${i}.portion`)}
            error={errors.portions?.[i]?.portion?.message}
          />

          <Input
            type="number"
            placeholder="Price"
            register={register(`portions.${i}.price`, {
              valueAsNumber: true,
            })}
            error={errors.portions?.[i]?.price?.message}
          
          />

          {/* Add More */}
          <FaPlus
            className="cursor-pointer text-green-500"
            size={30}
            onClick={() =>
              append({
                portion: "",
                price: 0,
              })
            }
          />

          {/* Remove */}
          <FaTrash
          size={30}
            className="cursor-pointer text-red-500"
            onClick={() => remove(i)}
          />
        </div>
      ))}

      {/* Submit */}
      <div className="w-1/2 flex justify-end">
        <Submitbtn label="Add" loading={isSubmitting} />
      </div>
    </form>
  );
};

export default AddOneForm;