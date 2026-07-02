import React, { useEffect } from "react";
import FormSelect from "@/components/ui/FormSelect";
import Submitbtn from "@/components/ui/submitbtn";
import { useFieldArray, useForm } from "react-hook-form";
import { FoodFormData, FoodSchema } from "@/Schemas/menuSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/ui/Input";
import { TiInputChecked } from "react-icons/ti";
import { addOnTableData, FoodEditData } from "@/types/menu";
import ImageUploader from "@/components/ui/ImageUploader";
import { FaPlus, FaTrash } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { FormatDate } from "@/helper/date";

type Branch = {
  value: string;
  label: string;
  subLabel: string;
};
type AddOn = {
  value: string;
  label: string;
  subLabel: string;
};

interface Props {
  branches: Branch[];
  addOns: AddOn[];
  categories: { value: string; label: string }[];
  kitchens: { value: string; label: string }[];
  isEdit: boolean;
  onSubmit: (formData: FormData) => void;
  initialData?: FoodEditData | null;
  isSubmitting?: boolean;
  setFormBranch: (val: string) => void;
}

const FoodForm = ({
  addOns,
  branches,
  onSubmit,
  initialData,
  isSubmitting,
  isEdit,
  categories,
  kitchens,
  setFormBranch,
}: Props) => {
  const {
    handleSubmit,
    setValue,
    watch,
    control,
    register,
    reset,
    formState: { errors },
  } = useForm<FoodFormData>({
    resolver: zodResolver(FoodSchema),
    defaultValues: {
      special: false,
      menuTypes: [],
      course: "",
      portions: [],
      addOn: [],
      offer: {
        isActive: false,
        startDate: "",
        endDate: "",
        discount: 0,
      },
    },
  });
  useEffect(() => {
    console.log("this is the addo0ns", addOns);
  }, [addOns]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "portions",
  });
  const selectedKitchen = watch("kitchen");
  const selectedBranch = watch("branchId");
  const selectedCategory = watch("category");
  // checkbox state
  // const isStarter = watch("starter");
  const course = watch("course");
 
  const menuTypes = watch("menuTypes") ?? [];
  const isSpecial = watch("special");
  const offer = watch("offer");
  const image = watch("img");
  const isOffer = offer?.isActive;
  const selectedAddOn = watch("addOn") ?? [];
  const hasPortions = fields.length > 0;
  useEffect(() => {
    console.log(errors);
  }, [errors]);
  const submitHandler = (data: FoodFormData) => {
    console.log("submit clicked", data);
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
      } else if (key === "menuTypes" || key === "addOn" || key === "portions") {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, String(value ?? ""));
      }
    });
    for (let pair of formData.entries()) {
      console.log("cehckinh reach", pair[0], pair[1]);
    }
    onSubmit(formData);
  };
  // const Addadon = (value: string) => {
  //   if (!value) return;
  //   const current = selectedAddOn ?? [];
  //   if (isEdit) {
  //     setValue("addOn", [value]);
  //     return;
  //   }

  //   if (!current.includes(value)) {
  //     setValue("addOn", [...current, value]);
  //   }
  // };

  useEffect(() => {
    reset({
      branchId: initialData?.branchId,
      category: initialData?.category?._id,
      kitchen: initialData?.kitchen?._id,
      foodName: initialData?.foodName,
      foodType: initialData?.foodType,
      menuTypes: initialData?.menuTypes,
      course: initialData?.course,
      portions: initialData?.portions,
      addOn: initialData?.addOn,
      special: initialData?.special,
      offer: {
        ...initialData?.offer,
        startDate: FormatDate(initialData?.offer?.startDate),
        endDate: FormatDate(initialData?.offer?.endDate),
      },
      img: initialData?.img,
    });
  }, [initialData]);
  const toggleMenuType = (value: "Breakfast" | "Lunch" | "Dinner") => {
    const current = menuTypes;

    if (current.includes(value)) {
      setValue(
        "menuTypes",
        current.filter((v) => v !== value),
      );
    } else {
      setValue("menuTypes", [...current, value]);
    }
  };
  const toggleCourse = (value: "starter" | "maincourse" | "dessert") => {
    setValue("course", course === value ? "" : value);
  };
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
      <div className=" w-full">
        <div className="w-1/2 ">
          <FormSelect
            label="Select Branch"
            placeholder="Select Branch"
            options={branches}
            value={selectedBranch}
            onChange={(val) => {
              setFormBranch(val as string);
              setValue("branchId", val as string);
            }}
            isMulti={false}
            disabled={isEdit}
          />
        </div>
      </div>
      <div className="w-full flex gap-2 ">
        <div className="flex flex-col gap-2 w-1/2">
          <FormSelect
            label="Category"
            placeholder="Select Category"
            options={categories}
            value={selectedCategory}
            onChange={(val) => setValue("category", val as string)}
            isMulti={false}
            disabled={isEdit}
          />
          <Input
            type="text"
            label="Food Name"
            register={register("foodName")}
            error={errors.foodName?.message}
          />
          <h3>Food Type</h3>
          <div className="flex gap-4 items-center">
            <input
              type="radio"
              id="veg"
              value="veg"
              {...register("foodType")}
              className=" accent-gray-500"
            />

            <label htmlFor="veg">Veg</label>

            <input
              type="radio"
              id="nonveg"
              value="nonveg"
              {...register("foodType")}
              className=" accent-gray-500"
            />

            <label htmlFor="nonveg">Non-Veg</label>
          </div>
          <h3>Menu Type</h3>
          <div className="flex gap-4 items-center">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => {
                toggleMenuType("Breakfast");
              }}
            >
              <div className="w-5 h-5 border border-gray-400 rounded-sm flex items-center justify-center">
                {menuTypes.includes("Breakfast") && (
                  <TiInputChecked className="text-lg text-green-500" />
                )}
              </div>
              <span>Breakfast</span>
            </div>
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => {
                toggleMenuType("Lunch");
              }}
            >
              <div className="w-5 h-5 border border-gray-400 rounded-sm flex items-center justify-center">
                {menuTypes.includes("Lunch") && (
                  <TiInputChecked className="text-lg text-green-500" />
                )}
              </div>
              <span>Lunch</span>
            </div>
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => {
                toggleMenuType("Dinner");
              }}
            >
              <div className="w-5 h-5 border border-gray-400 rounded-sm flex items-center justify-center">
                {menuTypes.includes("Dinner") && (
                  <TiInputChecked className="text-lg text-green-500" />
                )}
              </div>
              <span>Dinner</span>
            </div>
          </div>
          <h3>Course</h3>
          <div className="flex gap-4 items-center">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => {
                toggleCourse("starter");
              }}
            >
              <div className="w-5 h-5 border border-gray-400 rounded-sm flex items-center justify-center">
                {course === "starter" && (
                  <TiInputChecked className="text-lg text-green-500" />
                )}
              </div>
              <p className="text-red-500">{errors.menuTypes?.message}</p>
              <span>Starter</span>
            </div>
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => {
                toggleCourse("maincourse");
              }}
            >
              <div className="w-5 h-5 border border-gray-400 rounded-sm flex items-center justify-center">
                {course === "maincourse" && (
                  <TiInputChecked className="text-lg text-green-500" />
                )}
              </div>
              <span>Main Course</span>
            </div>
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => {
                toggleCourse("dessert");
              }}
            >
              <div className="w-5 h-5 border border-gray-400 rounded-sm flex items-center justify-center">
                {course === "dessert" && (
                  <TiInputChecked className="text-lg text-green-500" />
                )}
              </div>
              <span>Dessert</span>
            </div>
          </div>
          <h3>Portions</h3>
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
          </div>
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
        </div>

        <div className="flex flex-col gap-2 w-1/2">
          <FormSelect
            label="Kitchen"
            placeholder="Select Kitchen"
            options={kitchens}
            value={selectedKitchen}
            onChange={(val) => setValue("kitchen", val as string)}
            isMulti={false}
          />
          <div className="w-full flex gap-4 items-start">
            <div>
              <ImageUploader
                onChange={(file) => setValue("img", file)}
                value={image}
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex  gap-3 ">
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
                    {isOffer && (
                      <TiInputChecked className="text-lg text-green-500" />
                    )}
                  </div>
                  <span>Offer</span>
                </div>

                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => setValue("special", !isSpecial)}
                >
                  <div className="w-5 h-5 border border-gray-400 rounded-sm flex items-center justify-center">
                    {isSpecial && (
                      <TiInputChecked className="text-lg text-green-500" />
                    )}
                  </div>

                  <span>Special Food</span>
                </div>
              </div>

              {isOffer && (
                <div className=" flex flex-col  gap-2 ">
                  <div className="flex gap-2">
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
                  </div>
                  <div className="w-1/2">
                    <Input
                      type="number"
                      label="Discount %"
                      register={register("offer.discount", {
                        valueAsNumber: true,
                      })}
                      error={errors.offer?.discount?.message}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <h3>Add Ones Item</h3>
          <p>Define optional add-on for this food</p>
          <FormSelect
            label="add on"
            isMulti={true}
            placeholder="Select "
            options={addOns}
            value={selectedAddOn}
            onChange={(val) => {
              const current = selectedAddOn;
              const selected = Array.isArray(val) ? val.at(-1) : val;
              if (!selected) return;
              if (!current.includes(selected)) {
                setValue("addOn", [...current, selected]);
              }
              console.log(selected, "val of add on");
            }}
          />
          <div className="flex flex-wrap gap-2">
            {(selectedAddOn ?? []).map((id) => {
              const addon = addOns.find(
                (a) => a.value === id || a.label === id,
              );
              return (
                <div
                  key={id}
                  className="bg-input-box relative text-secondary px-2 py-1 rounded-md "
                >
                  <span className="text-sm ">{addon?.label}</span>
                  <div className="bg-input-box rounded-full p-1 absolute -right-2 -top-2 cursor-pointer flex mx-auto">
                    <FaXmark
                      className=" text-secondary hover:text-red-500 text-sm"
                      onClick={() =>
                        setValue(
                          "addOn",
                          (selectedAddOn ?? []).filter((v) => v !== id),
                        )
                      }
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Addon Name */}

      {/* Checkbox */}

      {/* Dynamic Portion Inputs */}

      {/* Submit */}
      <div className="w-1/2 flex justify-end">
        <Submitbtn label="Add" loading={isSubmitting} />
      </div>
    </form>
  );
};

export default FoodForm;
