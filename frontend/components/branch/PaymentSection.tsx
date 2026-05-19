import React, { useEffect, useState } from "react";
import Table from "../ui/Table";
import FormSelect from "../ui/FormSelect";
import SearchBar from "../TableComponents/SearchBar";
import { useDebounce } from "@/hooks/useDebounce";
import { useBranches } from "@/hooks/useBranch";
import AddButton from "../ui/AddButton";
import { MdAddCard } from "react-icons/md";
import { Modal } from "../ui/Modal";

import {
  AddPaymentMethod,
  DeletePayment,
  GetPaymentMethods,
  UpdatePayment,
} from "@/service/API/branchApi";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { PaymentMethod, Paymentrow } from "@/types/branch";
import EditDeleteIcons from "../TableComponents/EditDeleteIcons";
import ConfirmAlert from "../ui/DeleteDialogue";

import PaymentForm from "@/components/Forms/BranchForms/PaymentForm";

import { SkeletonTable } from "../wrapper/SkeletonTable";
import { PaymentRows, Rows } from "@/helper/date";
import TopSection from "../ui/TopSection";

const PaymentSection = () => {
  const [selectedBranch, setBranch] = useState("");
  const [search, setSearch] = useState("");

  const [isclose, setIsClose] = useState(false);
  const [deletedData, setDeleteData] = useState<Paymentrow | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState<PaymentMethod | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const queryClient = useQueryClient();
  // const[mainsearch,setMainSearch]=useState("")

  const { branches } = useBranches({all:true});
  const debouncedValue = useDebounce(search, 400);
  const branchOptions = branches.map((b) => ({
    value: b._id,
    label: b.name,
    subLabel: `${b.city}, ${b.state}, ${b.email}`,
  }));
  useEffect(() => {
    if (branches.length && !selectedBranch) {
      setBranch(branches[0]._id);
    }
    console.log("this is the selected branch", selectedBranch);
    console.log("useEffect is working");
  }, [branches]);
  const handleSearchChange = (value: string) => {
    setSearch(value);

    console.log("this is the value", value);
  };
  // const { paymentMethod, isLoading } = usePayment({
  //   branchId: selectedBranch,
  //   search: debouncedValue,
  // });
  const {data,isLoading}=useQuery({
    queryKey:["paymentMethod",debouncedValue,selectedBranch],
    queryFn:()=>GetPaymentMethods(selectedBranch,debouncedValue),
    enabled:!!selectedBranch,
    staleTime:2*60*1000
  })
  const rows = PaymentRows(data||[]);
  const createMutation = useMutation({
    mutationFn: AddPaymentMethod,
    onSuccess: () => {
      toast.success("Customer type added successfully");
      setIsOpen(false);
      queryClient.invalidateQueries({ queryKey: ["paymentMethod"] });
    },
    onError: () => toast.error("Something went wrong"),
  });
  const onEdit = (row: Paymentrow) => {
    const fullData = data?.find(
      (item: PaymentMethod) => item.branchId === row.branchId,
    );
    setIsEdit(true);
    setIsOpen(true);
    setEditData(fullData || null);
  };
  const onDelete = (row: Paymentrow) => {
    setIsDelete(true);
    setDeleteData(row);
  };
  const updateMutation = useMutation({
    mutationFn: UpdatePayment,
    onSuccess: () => {
      toast.success("payment type updated successfully");
      setIsOpen(false);
      setEditData(null);
      setIsEdit(false);
      queryClient.invalidateQueries({ queryKey: ["paymentMethod"] });
    },
    onError: () => toast.error("Something went wrong"),
  });
  const deleteMutation = useMutation({
    mutationFn: DeletePayment,
    onSuccess: () => {
      toast.success("Deleted successfully");
      setIsDelete(false);
      setDeleteData(null);
      queryClient.invalidateQueries({ queryKey: ["paymentMethod"] });
    },
    onError: () => toast.error("Something went wrong"),
  });
  const topSection = (
   <TopSection
   search={search}
   handleSearchChange={handleSearchChange}
   setIsClose={setIsClose}
   setBranch={setBranch}
   selectedBranch={selectedBranch}
   isclose={isclose}
   branchOptions={branchOptions}
   />
  );
  const SubmitCustomerType = async (branch: string[], paymethods: string[]) => {
    console.log("this is the data", branch, paymethods);
    if (!branch.length || !paymethods.length) return;
    if (editData?._id) {
      updateMutation.mutate({ branchId: editData?.branchId, paymethods });
    } else {
      createMutation.mutate({ branch, paymethods });
    }
  };
  return (
    <div className="flex flex-col">
      <AddButton
        label="Add Payment Method"
        icon={MdAddCard}
        onClick={() => {
          setIsOpen(true);
          setIsEdit(false);
        }}
      />
      <div className="bg-card rounded-2xl flex flex-col gap-3 mt-4">
        {isLoading ? (
          <>
            <SkeletonTable columns={2} rows={7} />
          </>
        ) : (
          <>
            <Table<Paymentrow>
              columns={[
                {
                  headers: "Payment Types",
                  accessor: "paymethod",
                  style: "text-left pl-6",
                  render: (_: any, row: Paymentrow) => (
                    <div className="">{row.paymethod}</div>
                  ),
                },
                {
                  headers: "Action",
                  accessor: "action",
                  style: "text-right pr-6  ",
                  render: (_: any, row: Paymentrow) => (
                    <div className="flex justify-end ">
                      <EditDeleteIcons
                        OnDelete={() => onDelete(row)}
                        OnEdit={() => onEdit(row)}
                      />
                    </div>
                  ),
                },
              ]}
              data={rows}
              topSection={topSection}
            />
            <div className="flex justify-end p-3"></div>
          </>
        )}
      </div>
      <Modal
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
          setEditData(null);
        }}
        title="Add Payment Method"
      >
        <PaymentForm
          branches={branchOptions}
          isEdit={isEdit}
          initialData={editData}
          onSubmit={SubmitCustomerType}
          isSubmitting={createMutation.isPending || updateMutation.isPending}
        />
        {/* {CustomerError&& <p className="text-red-500">error in loading</p>} */}
      </Modal>

      <ConfirmAlert
        isOpen={isDelete}
        closeModal={() => setIsDelete(false)}
        onConfirm={() => {
          if (!deletedData) return;
          deleteMutation.mutate({
            branchId: deletedData.branchId,
            paymethod: deletedData.paymethod,
          });
        }}
        title="Delete Payment Method"
        message="Are you sure you want to delete this payment method?"
        confirmText="Delete"
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
};

export default PaymentSection;
