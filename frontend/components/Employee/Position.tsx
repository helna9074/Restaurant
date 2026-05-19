import React, { useEffect, useState } from 'react'

import Table from "../ui/Table";

import { useDebounce } from "@/hooks/useDebounce";
import { useBranches } from "@/hooks/useBranch";
import AddButton from "../ui/AddButton";

import { Modal } from "../ui/Modal";


import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import EditDeleteIcons from "../TableComponents/EditDeleteIcons";
import ConfirmAlert from "../ui/DeleteDialogue";

import { SkeletonTable } from "../wrapper/SkeletonTable";

import TopSection from "../ui/TopSection";
import { AddPostion, DeletePosition, UpdatePosition } from '@/service/API/departmentApi';
import { useDepartment } from '@/hooks/useDepartment';
import PositionForm from '@/components/Forms/EmployeeForms/PositionForm';
import { PositionType } from '@/types/department';
import { usePosition } from '@/hooks/usePosition';
import { FaPeopleLine } from 'react-icons/fa6';

const Position = () => {
  const [selectedBranch, setBranch] = useState("");
  const [search, setSearch] = useState("");

  const [isclose, setIsClose] = useState(false);
  const [deleteData, setDeleteData] = useState<PositionType | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState<PositionType | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const[FormBranchId,setFormBranchId]=useState("")
  const queryClient = useQueryClient();
  // const[mainsearch,setMainSearch]=useState("")
  // const[page,setPage]=useState(1)
  const { branches } = useBranches({all:true})
  const {data:departments}=useDepartment(FormBranchId)
    const debouncedValue = useDebounce(search, 400);
    const {data,isLoading}=usePosition(debouncedValue,selectedBranch)
  const branchOptions = branches.map((b) => ({
    value: b._id,
    label: b.name,
    subLabel: `${b.city}, ${b.state}, ${b.email}`,
  }));
  const departmentOptions=departments.map((d)=>({
    value:d._id,
    label:d.department,
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
  // const {data,isLoading}=useQuery({
  //   queryKey:["position",debouncedValue,selectedBranch],
  //    queryFn:()=>GetPositions(debouncedValue,selectedBranch),
   
  //   enabled:!!selectedBranch,
  //   staleTime:2 * 60 * 1000,
  // })


  const createMutation = useMutation({
    mutationFn: AddPostion,
    onSuccess: () => {
      toast.success("Customer type added successfully");
      setIsOpen(false);
      queryClient.invalidateQueries({ queryKey: ["position"] });
    },
    onError: () => toast.error("Something went wrong"),
  });
  const onEdit = (row:PositionType) => {
   
    setIsEdit(true);
    setIsOpen(true);
    setEditData(row||null);
  };
  const onDelete=(row:PositionType)=>{
    setIsDelete(true);
    setDeleteData(row)
  }
  const updateMutation = useMutation({
    mutationFn: UpdatePosition,
    onSuccess: () => {
      toast.success("Customer type updated successfully");
      setIsOpen(false);
      setEditData(null);
      setIsEdit(false)
      queryClient.invalidateQueries({ queryKey: ["position"] });
    },
    onError: () => toast.error("Something went wrong"),
  });
  const deleteMutation = useMutation({
    mutationFn: DeletePosition,
    onSuccess: () => {
      toast.success("Deleted successfully");
      setIsDelete(false);
      setDeleteData(null);
      queryClient.invalidateQueries({ queryKey: ["position"] });
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
  const SubmitPositions = async (branch: string,department:string, positions: string[]) => {
    console.log("this is the data",department);
    if (!branch.length || !department.length||!positions) return;
    if ( editData) {
      updateMutation.mutate({ id:editData._id, department:department,position:positions[0] });
    } else {
      createMutation.mutate({ branch, positions,department });
    }
  };

  return (
    <div className="flex flex-col">
      <AddButton
        label="Add Customer"
        icon={FaPeopleLine}
        onClick={() => {setIsOpen(true);setIsEdit(false)}}
      />
      <div className="bg-card rounded-2xl flex flex-col gap-3 mt-4">
        {isLoading?(
          <>
          <SkeletonTable columns={2} rows={5} />

          </>
        ):(
          <>
 <Table<PositionType>
          columns={[
            {
              headers: "Positions",
              accessor: "position",
              style: "text-left pl-6",
              render: (_: any, row: PositionType) => (
                <div className="">{row?.position}</div>
              ),
            },
              {
              headers: "Departments",
              accessor: "department",
              style: "text-left pl-6",
              render: (_: any, row: PositionType) => (
                <div className="">{row.department?.department}</div>
              ),
            },
            {
              headers: "Action",
              accessor: "action",
              style: "text-right pr-6  ",
              render: (_: any, row: PositionType) => (
                <div className="flex justify-end ">
                  <EditDeleteIcons
                    OnDelete={() => onDelete(row)}
                    OnEdit={() => onEdit(row)}
                    
                  />
                </div>
              ),
            },
          ]}
          data={data||[]}
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
        title="Add Position"
      >
        <PositionForm
        setFormBranchId={setFormBranchId}
        departments={departmentOptions}
          branches={branchOptions}
           isEdit={isEdit}
          initialData={editData}
          onSubmit={SubmitPositions}
          isSubmitting={createMutation.isPending||updateMutation.isPending}
        />
        {/* {CustomerError&& <p className="text-red-500">error in loading</p>} */}
      
      </Modal>
     
       
      <ConfirmAlert
        isOpen={isDelete}
        closeModal={() => setIsDelete(false)}
        onConfirm={() => {
          if(!deleteData) return;
          deleteMutation.mutate(deleteData._id);
       
        }}
        
       
      
        title="Delete CustomerType"
        message="Are you sure you want to delete this customer type?"
        confirmText="Delete"
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
};

export default Position;

