import React, { useEffect, useState } from "react";
import FormSelect from "../ui/FormSelect";
import { Branch, PaymentMethod } from "@/types/branch";
import Input from "../ui/Input";
import { FaXmark } from "react-icons/fa6";
import Submitbtn from "../ui/submitbtn";
import { useForm } from "react-hook-form";
import { PaymentFormData, PaymentSchema } from "@/Schemas/branchSchema";
import { zodResolver } from "@hookform/resolvers/zod";
type branches = {
  value: string;
  label: string;
  subLabel: string;
};
interface Props {
  branches: branches[];
  onSubmit: (selectedBranches: string[], payment: string[]) => void;
  initialData?: PaymentMethod | null;
  isSubmitting?: boolean;
  isEdit:boolean
}
const PaymentForm = ({ branches, onSubmit, initialData ,isSubmitting,isEdit}: Props) => {
  const PaymentMethods = [
    {
      value: "Card",
      label: "Card",
    },
    {
      value: "Cash",
      label: "Cash",
    },
    {
      value: "Online",
      label: "Online",
    },
  
  ];
   const {handleSubmit,setValue,watch,formState:{errors}}=useForm<PaymentFormData>({
      resolver:zodResolver(PaymentSchema),
      defaultValues:{
        selectedBranches:[],
        payment:[]
      }
    })
  const selectedBranches=watch("selectedBranches")
  const payment=watch("payment")  
  const selectedBranchOptions = branches.filter((b) =>
    selectedBranches.includes(b.value),
  );
  const selectedPaymentType = PaymentMethods.filter((p) =>
    payment.includes(p.value),
  );
   const submitHandler=(data:PaymentFormData)=>{
      onSubmit(data.selectedBranches,data.payment)
    }
  useEffect(() => {
    if (initialData) {
      setValue("selectedBranches",[initialData.branchId]);
      setValue("payment",initialData.paymethods || []);
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
          onChange={(val) => {setValue("selectedBranches",val as string[]);console.log(val,"val of branch")}}
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
          label="Select Payment Method"
          options={PaymentMethods}
          onChange={(val) =>{ setValue("payment",val as string[]);console.log(val,"val of payment")}}
          value={payment}
          isMulti={true}
        
        />
      </div>
      <div className="w-1/2 flex flex-wrap gap-2">
        {selectedPaymentType.map((c) => (
          <div
            key={c.value}
            className="bg-input-box relative text-secondary px-2 py-1 rounded-md "
          >
            <span className="text-sm ">{c.label}</span>
            <div className="bg-input-box rounded-full p-1 absolute -right-2 -top-2 cursor-pointer flex mx-auto">
              <FaXmark
                className=" text-secondary hover:text-red-500 text-sm"
                onClick={() =>
                  setValue("payment",payment.filter((v) => v !== c.value))
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

export default PaymentForm;
