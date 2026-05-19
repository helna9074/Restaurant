import React, { useEffect, useState } from "react";
import Table from "../ui/Table";
import FormSelect from "../ui/FormSelect";
import SearchBar from "../TableComponents/SearchBar";
import { useDebounce } from "@/hooks/useDebounce";
import { useBranches } from "@/hooks/useBranch";
import AddButton from "../ui/AddButton";
import { FaUsers } from "react-icons/fa";
import { Modal } from "../ui/Modal";
import CustomerForm from "@/components/Forms/BranchForms/CustomerForm";
import {
  AddCustomerType,
  DeleteCustomer,
  GetCustomers,
  UpdateCustomer,
} from "@/service/API/branchApi";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { CustomerRow, CustomerType } from "@/types/branch";
import EditDeleteIcons from "../TableComponents/EditDeleteIcons";
import ConfirmAlert from "../ui/DeleteDialogue";
import Pagination from "../TableComponents/Pagination";
import { addValueToWillChange } from "framer-motion";
import { SkeletonTable } from "../wrapper/SkeletonTable";
import { Rows } from "@/helper/date";
import TopSection from "../ui/TopSection";

const CustomerSection = () => {
  const [selectedBranch, setBranch] = useState("");
  const [search, setSearch] = useState("");

  const [isclose, setIsClose] = useState(false);
  const [deleteData, setDeleteData] = useState<CustomerRow | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState<CustomerType | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const queryClient = useQueryClient();
  // const[mainsearch,setMainSearch]=useState("")
  // const[page,setPage]=useState(1)
  const { branches } = useBranches({all:true})
    const debouncedValue = useDebounce(search, 400);
  const branchOptions = branches.map((b) => ({
    value: b._id,
    label: b.name,
    subLabel: `${b.city}, ${b.state}, ${b.email}`,
  }));

  useEffect(() => {
    if(branches.length&&!selectedBranch){
      setBranch(branches[0]._id)
    }
    console.log("this is the selected branch",selectedBranch)
  },[branches])
const handleSearchChange=(value:string)=>{
  setSearch(value)
  // setPage(1)
  console.log("this is the value",value)
}
  // const { customerType,error,isLoading } = useCustomer({search:debouncedValue,branchId:selectedBranch});
  const {data,isLoading}=useQuery({
    queryKey:["customerType",debouncedValue,selectedBranch],
    queryFn:()=>GetCustomers(debouncedValue,selectedBranch),
    staleTime:2 * 60 * 1000,
  })
  const rows=Rows(data||[])
  console.log("this is the rows lookslike ",rows)
  const createMutation = useMutation({
    mutationFn: AddCustomerType,
    onSuccess: () => {
      toast.success("Customer type added successfully");
      setIsOpen(false);
      queryClient.invalidateQueries({ queryKey: ["customerType"] });
    },
    onError: () => toast.error("Something went wrong"),
  });
  const onEdit = (row:CustomerRow) => {
    const fullData=data.find((item:CustomerType)=>item.branch._id===row.branchId)
    setIsEdit(true);
    setIsOpen(true);
    setEditData(fullData||null);
  };
  const onDelete=(row:CustomerRow)=>{
    setIsDelete(true);
    setDeleteData(row)
  }
  const updateMutation = useMutation({
    mutationFn: UpdateCustomer,
    onSuccess: () => {
      toast.success("Customer type updated successfully");
      setIsOpen(false);
      setEditData(null);
      setIsEdit(false)
      queryClient.invalidateQueries({ queryKey: ["customerType"] });
    },
    onError: () => toast.error("Something went wrong"),
  });
  const deleteMutation = useMutation({
    mutationFn: DeleteCustomer,
    onSuccess: () => {
      toast.success("Deleted successfully");
      setIsDelete(false);
      setDeleteData(null);
      queryClient.invalidateQueries({ queryKey: ["customerType"] });
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
  const SubmitCustomerType = async (branches: string[], types: string[]) => {
    console.log("this is the data", branches, types);
    if (!branches.length || !types.length) return;
    if ( editData) {
      updateMutation.mutate({ branchId:editData.branch._id, types });
    } else {
      createMutation.mutate({ branches, types });
    }
  };

  return (
    <div className="flex flex-col">
      <AddButton
        label="Add Customer"
        icon={FaUsers}
        onClick={() => {setIsOpen(true);setIsEdit(false)}}
      />
      <div className="bg-card rounded-2xl flex flex-col gap-3 mt-4">
        {isLoading?(
          <>
          <SkeletonTable columns={2} rows={5} />

          </>
        ):(
          <>
 <Table<CustomerRow>
          columns={[
            {
              headers: "Type",
              accessor: "type",
              style: "text-left pl-6",
              render: (_: any, row: CustomerRow) => (
                <div className="">{row.type}</div>
              ),
            },
            {
              headers: "Action",
              accessor: "action",
              style: "text-right pr-6  ",
              render: (_: any, row: CustomerRow) => (
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
         {/* <div className="flex justify-end p-3">
 <Pagination page={page} totalPage={totalPage} onPageChange={setPage} />
      </div> */}
          </>
        )}
       
      </div>
      <Modal
        open={isOpen}
        onClose={() => {setIsOpen(false); setEditData(null)}}
        title="Add Customer"
      >
        <CustomerForm
          branches={branchOptions}
           isEdit={isEdit}
          initialData={editData}
          onSubmit={SubmitCustomerType}
          isSubmitting={createMutation.isPending||updateMutation.isPending}
        />
        {/* {CustomerError&& <p className="text-red-500">error in loading</p>} */}
      
      </Modal>
     
       
      <ConfirmAlert
        isOpen={isDelete}
        closeModal={() => setIsDelete(false)}
        onConfirm={() => {
          if(!deleteData) return
          deleteMutation.mutate({branchId:deleteData.branchId,
          type:deleteData.type
        })}
      }
        title="Delete CustomerType"
        message="Are you sure you want to delete this customer type?"
        confirmText="Delete"
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
};

export default CustomerSection;
