import FormSelect from "@/components/ui/FormSelect";
import Input from "@/components/ui/Input";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import Submitbtn from "@/components/ui/submitbtn";

import { UserSchema } from "@/Schemas/LoginSchema";
import { useEmployee } from "@/hooks/useEmployee";
import {
  
  UpdateUserData,
  UserFormValues,
  UserPayload,
} from "@/types/user";

interface Option {
  value: string;
  label: string;

  subLabel?: string;
}

interface Props {
  branches: Option[];

  onSubmit: (data: UserPayload) => void;
  onCancel?: () => void;
  isEdit?: boolean;
  isSubmitting?: boolean;

  initialData?: UpdateUserData | null;
}
const UserForm = ({
  onSubmit,
  isEdit = false,
  isSubmitting,
  initialData,
  branches,
}: Props) => {
  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<UserFormValues>({
    resolver: zodResolver(UserSchema(isEdit)),
  });
  const selectedBranch = watch("branchId");
  const { data } = useEmployee("", selectedBranch);
  const selectedEmployee = watch("employeeId");
  const employeeOptions = data.map((emp) => ({
    value: emp._id,
    label: `${emp.firstName} - ${emp.position} (${emp.department})`,
    email: emp.email,
    department: emp.department,
    position: emp.position,
  }));
  useEffect(() => {
    if (!selectedEmployee || employeeOptions.length === 0) return;

    const emp = employeeOptions.find((e) => e.value === selectedEmployee);

    if (emp) {
      if (emp.email) setValue("email", emp.email);
      if (emp.department) setValue("department", emp.department);
      if (emp.position) setValue("position", emp.position);
    }
  }, [selectedEmployee, employeeOptions]);
  const Submit = async (data: UserFormValues) => {
    if (isEdit) {
      onSubmit({
        email: data.email,
        employeeId: data.employeeId,
        branchId: data.branchId,
        ...(data.newpassword && { newpassword: data.newpassword }),
      });
    } else {
      onSubmit({
        email: data.email,
        password: data.password,
        employeeId: data.employeeId,
        branchId: data.branchId,
      });
    }
  };
  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData]);
  return (
    <form
      onSubmit={handleSubmit(Submit, (errors) => {
        console.log("Validation errors:", errors);
      })}
      className="w-full p-5 flex flex-col gap-4"
    >
      <div className="grid grid-cols-2 gap-7">
        <Controller
          control={control}
          name="branchId"
          render={({ field }) => (
            <FormSelect
              label="Branch"
              placeholder="Select"
              options={branches}
              onChange={(value) => {
                field.onChange(value || "");
              }}
              value={field.value || ""}
              error={errors.branchId?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="employeeId"
          render={({ field }) => (
            <FormSelect
              label="Employee"
              placeholder="Select"
              options={employeeOptions}
              disabled={!employeeOptions.length}
              onChange={(value) => {
                field.onChange(value || "");
              }}
              value={field.value || ""}
              error={errors.employeeId?.message}
            />
          )}
        />
      </div>
      <div className="grid grid-cols-2 gap-7">
      
        <Input
          type="text"
          label="Department"
          placeholder="Auto-filled"
          register={register("department")}
          disabled
        />

        <Input
          type="text"
          label="Position"
          placeholder="Auto-filled"
          register={register("position")}
          disabled
        />
      </div>
      <div className="grid grid-cols-3 gap-7">
        <Input
          type="text"
          placeholder="Enter email"
          label="Email"
          register={register("email")}
          error={errors.email?.message}
        />
        {isEdit ? (
          <Input
            type="password"
            placeholder="Change Password"
            label="New Password"
            register={register("newpassword")}
            error={errors.password?.message}
          />
        ) : (
          <>
            <Input
              type="password"
              placeholder="Enter Password"
              label="Password"
              register={register("password")}
              error={errors.password?.message}
            />
            <Input
              type="password"
              placeholder="Enter Password"
              label="ConfirmPassword"
              register={register("confirmPassword")}
              error={errors.confirmPassword?.message}
            />
          </>
        )}
      </div>

      <div className="flex ms-auto">
        <Submitbtn
          type="submit"
          loading={isSubmitting}
          label={isEdit ? "update" : "Add"}
        />
      </div>
    </form>
  );
};

export default UserForm;
