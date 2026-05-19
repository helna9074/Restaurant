import React, { useEffect } from "react";
import FormSelect from "@/components/ui/FormSelect";

import Submitbtn from "@/components/ui/submitbtn";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/ui/Input";
import ImageUploader from "@/components/ui/ImageUploader";
import { CategoryForm, CategorySchema } from "@/Schemas/menuSchemas";
import { TiInputChecked } from "react-icons/ti";
import { categoryTableData } from "@/types/menu";
import { FormatDate } from "@/helper/date";
type branches = {
  value: string;
  label: string;
  subLabel: string;
};
interface Props {
  branches: branches[];
  isEdit: boolean;
  onSubmit: (formData: FormData) => void;
  initialData?: categoryTableData | null;
  isSubmitting?: boolean;
}
const CategoryForm = ({
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
  } = useForm<CategoryForm>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      offer: {
        isActive: false,
        startDate: "",
        endDate: "",
        discount: 0,
      },
    },
  });

  const selectedBranches = watch("branchId");
  const offer = watch("offer");
  const isOffer = offer?.isActive;
  const submitHandler = (data: CategoryForm) => {
    console.log("this is the formData", data);

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === "img") {
        if (value instanceof File) {
          formData.append("img", value);
        } else if (typeof value === "string") {
          formData.append("img", value); // send existing image
        }
      } else if (key === "offer") {
        if (value?.isActive) {
          formData.append("offer", JSON.stringify(value));
        } else {
          formData.append("offer", JSON.stringify({ isActive: false }));
        }
      } else {
        formData.append(key, String(value ?? ""));
      }
    });
    for (let pair of formData.entries()) {
      console.log("cehckinh reach", pair[0], pair[1]);
    }
    onSubmit(formData);
  };
  const image = watch("img");
  useEffect(() => {
    if (initialData) {
      setValue("branchId", initialData.branchId);
      setValue("category", initialData.category);
      setValue("img", initialData.img);
      if (initialData.offer) {
        setValue("offer", {
          isActive: initialData.offer.isActive || false,
          startDate: FormatDate(initialData.offer.startDate),
          endDate: FormatDate(initialData.offer.endDate),

          discount: initialData.offer.discount || 0,
        });
      }
    }
  }, [initialData, setValue]);

  return (
    <form
      onSubmit={handleSubmit(submitHandler, (err) => console.log(err))}
      className="flex flex-col gap-3 items-center w-full justify-center"
    >
      <div className="w-1/2 flex flex-col gap-2">
        <FormSelect
          placeholder="Select Branch"
          options={branches}
          label="Branch"
          onChange={(val) => {
            setValue("branchId", val as string);
          }}
          value={selectedBranches}
          isMulti={false}
          error={errors.branchId?.message}
          disabled={isEdit}
        />

        <Input
          type="text"
          label="Category"
          error={errors.category?.message}
          register={register("category")}
        />
        <div className="flex gap-6">
          <ImageUploader
            onChange={(file) => setValue("img", file)}
            label={"Category Image"}
            value={image}
          />
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => {
              if (isOffer) {
                setValue("offer", {
                  isActive: false,
                  startDate: "",
                  endDate: "",
                  discount: 0,
                });
              } else {
                setValue("offer", {
                  isActive: true,
                  startDate: "",
                  endDate: "",
                  discount: 0,
                });
              }
            }}
          >
            <div className="w-5 h-5 border border-gray-400 rounded-sm flex items-center justify-center">
              {isOffer && <TiInputChecked className="text-lg text-green-500" />}
            </div>
            <span>Offer</span>

          </div>
         
        </div>
        {isOffer && (
          <div className="flex flex-col gap-2 mt-2">
            <Input
              type="date"
              label="Start Date"
              register={register("offer.startDate")}
              error={errors.offer?.startDate?.message}
            />

            <Input
              type="date"
              label="End Date"
              register={register("offer.endDate")}
              error={errors.offer?.endDate?.message}
            />

            <Input
              type="number"
              label="Discount %"
              register={register("offer.discount", { valueAsNumber: true })}
              error={errors.offer?.discount?.message}
          
            />
          </div>
        )}
         
      </div>

      <div className="w-1/2 flex justify-end">
        <Submitbtn type="submit" label="Add" loading={isSubmitting} />
      </div>
    </form>
  );
};

export default CategoryForm;
