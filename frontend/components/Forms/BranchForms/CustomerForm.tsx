import React, { useEffect, useState } from "react";
import FormSelect from "@/components/ui/FormSelect";
import {  CustomerType } from "@/types/branch";

import { FaXmark } from "react-icons/fa6";
import Submitbtn from "@/components/ui/submitbtn";
import { useForm } from "react-hook-form";
import { CustomerFormData, CustomerSchema } from "@/Schemas/branchSchema";
import { zodResolver } from "@hookform/resolvers/zod";
type branches = {
  value: string;
  label: string;
  subLabel: string;
  
};
interface Props {
  branches: branches[];
  isEdit:boolean
  onSubmit: (selectedBranches: string[], customer: string[]) => void;
  initialData?: CustomerType | null;
  isSubmitting?: boolean;
}
const CustomerForm = ({ branches, onSubmit, initialData ,isSubmitting,isEdit}: Props) => {
  const customerType = [
    {
      value: "Walk in customer",
      label: "Walk in customer",
    },
    {
      value: "Take away",
      label: "Take away",
    },
    {
      value: "Dine in",
      label: "Dine in",
    },
    {
      value: "Home delivery",
      label: "Home delivery",
    },
  ];

  const {handleSubmit,setValue,watch,formState:{errors}}=useForm<CustomerFormData>({
    resolver:zodResolver(CustomerSchema),
    defaultValues:{
      selectedBranches:[],
      customer:[]
    }
  })
  const selectedBranches=watch("selectedBranches")
  const customer=watch("customer")
  const selectedBranchOptions = branches.filter((b) =>
    selectedBranches.includes(b.value),
  );
  const selectedCustomerType = customerType.filter((p) =>
    customer.includes(p.value),
  );
  const submitHandler=(data:CustomerFormData)=>{
    onSubmit(data.selectedBranches,data.customer)
  }
  useEffect(() => {
    if (initialData) {
      setValue("selectedBranches",[initialData.branch._id]);
      setValue("customer",initialData.types || []);
    }
  }, [initialData]);
  // const [selectedValue, setSelectedValue] = useState("");
  // const [paymentValue, setPaymentValue] = useState("");
  return (
    <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col gap-3 items-center w-full justify-center">
      <div className="w-1/2">
        <FormSelect
          placeholder="Select Branch"
          options={branches}
          onChange={(val) => {setValue("selectedBranches",val  as string[])}}
          value={selectedBranches}
           isMulti={!isEdit}
          disabled={isEdit}
        />
      </div>
      <div className="w-1/2 flex flex-wrap gap-2">
        {selectedBranchOptions.map((branch) => (
          <div
            key={branch.value}
            className="bg-input-box  relative text-secondary px-2 py-1 rounded-md "
          >
            <span className="text-sm">{branch.label}</span>
            <div className="bg-input-box rounded-full p-1 absolute -right-2 -top-2 cursor-pointer flex mx-auto">
              <FaXmark
                className=" text-secondary hover:text-red-500 text-sm"
                onClick={() =>
                  setValue("selectedBranches",selectedBranches.filter((v)=>v!==branch.value)
                  )
                }
              />
            </div>
          </div>
        ))}
      </div>
      <div className="w-1/2">
        <FormSelect
          placeholder="Select"
          label="Select Customer Type"
          options={customerType}
          onChange={(val) =>{ setValue("customer",val as string[]);console.log(val,"val of customer")}}
          value={customer}
          isMulti={true}
          error={errors.customer?.message}
        />
      </div>
      <div className="w-1/2 flex flex-wrap gap-2">
        {selectedCustomerType.map((c) => (
          <div
            key={c.value}
            className="bg-input-box relative text-secondary px-2 py-1 rounded-md "
          >
            <span className="text-sm ">{c.label}</span>
            <div className="bg-input-box rounded-full p-1 absolute -right-2 -top-2 cursor-pointer flex mx-auto">
              <FaXmark
                className=" text-secondary hover:text-red-500 text-sm"
                onClick={() =>
                  setValue("customer",customer.filter((v)=>v!==c.value))
                }
              />
            </div>
          </div>
        ))}
      </div>
      <div className="w-1/2 flex justify-end">
        <Submitbtn
        type="submit"
          label="Add"
          loading={isSubmitting}
         
        />
      </div>
    </form>
  );
};

export default CustomerForm;
