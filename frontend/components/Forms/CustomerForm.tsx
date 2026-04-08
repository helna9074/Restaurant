import React, { useEffect, useState } from "react";
import FormSelect from "../ui/FormSelect";
import { Branch, CustomerRow, CustomerType } from "@/types/branch";
import Input from "../ui/Input";
import { FaXmark } from "react-icons/fa6";
import Submitbtn from "../ui/submitbtn";
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
  const [selectedBranches, setSelectedBranches] = useState<string[]>([]);
  const [customer, setCustomer] = useState<string[]>([]);
  const selectedBranchOptions = branches.filter((b) =>
    selectedBranches.includes(b.value),
  );
  const selectedCustomerType = customerType.filter((p) =>
    customer.includes(p.value),
  );
  useEffect(() => {
    if (initialData) {
      setSelectedBranches([initialData.branch._id]);
      setCustomer(initialData.types || []);
    }
  }, [initialData]);
  // const [selectedValue, setSelectedValue] = useState("");
  // const [paymentValue, setPaymentValue] = useState("");
  return (
    <div className="flex flex-col gap-3 items-center w-full justify-center">
      <div className="w-1/2">
        <FormSelect
          placeholder="Select Branch"
          options={branches}
          onChange={(val) => {setSelectedBranches(val as string[]);console.log(val,"val of branch")}}
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
                  setSelectedBranches((prev) =>
                    prev.filter((v) => v !== branch.value),
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
          onChange={(val) =>{ setCustomer(val as string[]);console.log(val,"val of customer")}}
          value={customer}
          isMulti={true}
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
                  setCustomer((prev) => prev.filter((v) => v !== c.value))
                }
              />
            </div>
          </div>
        ))}
      </div>
      <div className="w-1/2 flex justify-end">
        <Submitbtn
        type="button"
          label="Add"
          loading={isSubmitting}
          onClick={() => onSubmit(selectedBranches, customer)}
        />
      </div>
    </div>
  );
};

export default CustomerForm;
