'use client'
import React, { useEffect, useState } from 'react'
import Table from "../ui/Table";
import { useDebounce } from "@/hooks/useDebounce";
import { useBranches } from "@/hooks/useBranch";
import AddButton from "../ui/AddButton";
import { Modal } from "../ui/Modal";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import EditDeleteIcons from "../TableComponents/EditDeleteIcons";
import ConfirmAlert from "../ui/DeleteDialogue";
import { SkeletonTable } from "../wrapper/SkeletonTable";
import TopSection from "../ui/TopSection";
import {  DeletePosition, UpdatePosition } from '@/service/API/departmentApi';
import { PositionType } from '@/types/department';
import { FaPeopleLine } from 'react-icons/fa6';
import MenuForm from '../Forms/MenuForms/menuForm';
import { AddMenu, DeleteMenu, GetMenus, UpdateMenu } from '@/service/API/MenuApi';
import {menuTableData} from '@/types/menu'

const Menu = () => {
  const [selectedBranch, setBranch] = useState("");
  const [search, setSearch] = useState("");
  const [isclose, setIsClose] = useState(false);
  const [deleteData, setDeleteData] = useState<menuTableData | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState<menuTableData | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const queryClient = useQueryClient();
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
    queryKey:["menutype",debouncedValue,selectedBranch],
     queryFn:()=>GetMenus(debouncedValue,selectedBranch),
    enabled:!!selectedBranch,
    staleTime:2 * 60 * 1000,
  })


  const createMutation = useMutation({
    mutationFn: AddMenu,
    onSuccess: () => {
      toast.success("Customer type added successfully");
      setIsOpen(false);
      queryClient.invalidateQueries({ queryKey: ["menutype"] });
    },
    onError: () => toast.error("Something went wrong"),
  });
  const onEdit = (row:menuTableData) => {
   
    setIsEdit(true);
    setIsOpen(true);
    setEditData(row||null);
  };
  const onDelete=(row:menuTableData)=>{
    setIsDelete(true);
    setDeleteData(row)
  }
  const updateMutation = useMutation({
    mutationFn: UpdateMenu,
    onSuccess: () => {
      toast.success("Customer type updated successfully");
      setIsOpen(false);
      setEditData(null);
      setIsEdit(false)
      queryClient.invalidateQueries({ queryKey: ["menutype"] });
    },
    onError: () => toast.error("Something went wrong"),
  });
  const deleteMutation = useMutation({
    mutationFn: DeleteMenu,
    onSuccess: () => {
      toast.success("Deleted successfully");
      setIsDelete(false);
      setDeleteData(null);
      queryClient.invalidateQueries({ queryKey: ["menutype"] });
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
  const SubmitMenu = async (branchId:string,menus:string[]) => {
    
    if (!branchId.length || !menus.length) return;
    if ( editData) {
      updateMutation.mutate({ id:editData._id,menus:menus[0]});
    } else {
      createMutation.mutate( { branchId, menus });
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
 <Table<menuTableData>
          columns={[
            {
              headers: "Type",
              accessor: "menutype",
              
              style: "text-left pl-6",
              render: (_: any, row: menuTableData) => (
                <div className="">{row?.menutype}</div>
              ),
            },
             
            {
              headers: "Action",
              accessor: "action",
              style: "text-right pr-6  ",
              render: (_: any, row: menuTableData) => (
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
       
          </>
        )}
       
      </div>
      <Modal
        open={isOpen}
        onClose={() => {setIsOpen(false); setEditData(null)}}
        title="Add Menu"
        width="!max-w-[40vw]"
      >
        <MenuForm
       
          branches={branchOptions}
           isEdit={isEdit}
          initialData={editData}
          onSubmit={SubmitMenu}
          isSubmitting={createMutation.isPending||updateMutation.isPending}
        />

      
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

export default Menu;

