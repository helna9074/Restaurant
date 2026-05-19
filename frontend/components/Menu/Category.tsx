import React, { useEffect, useState } from "react";

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
import {categoryTableData} from '@/types/menu'
import { AxiosError } from "axios";
import { IoFastFood } from "react-icons/io5";

import CategoryForm from "../Forms/MenuForms/CategoryForm";
import { AddCategory, DeleteCategory, GetCategories, UpdateCategory } from "@/service/API/MenuApi";
import Input from '@/components/ui/Input'
import Pagination from "../TableComponents/Pagination";
import { PaginationSkeleton } from "../wrapper/PaginationSkelton";
import { FormatDate } from "@/helper/date";


const Category = () => {
  const [selectedBranch, setBranch] = useState("");
  const [search, setSearch] = useState("");
  const [isclose, setIsClose] = useState(false);
  const [deleteData, setDeleteData] = useState<categoryTableData | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState<categoryTableData | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
 const [startDate, setStartDate] = useState<string | null>(null);
const [endDate, setEndDate] = useState<string | null>(null);
  const [page,setPage]=useState(1)
  const[totalPage,setTotalPage]=useState(1)
  const queryClient = useQueryClient();

  const { branches } = useBranches({ all: true });

  const debouncedValue = useDebounce(search, 400);

  const branchOptions = branches.map((b) => ({
    value: b._id,
    label: b.name,
    subLabel: `${b.city}, ${b.state}, ${b.email}`,
  }));
  const { data, isLoading } = useQuery({
    queryKey: ["categories", selectedBranch,startDate,endDate, debouncedValue],
    queryFn: () => GetCategories(selectedBranch, debouncedValue,startDate,endDate,page),
    enabled: !!selectedBranch,
    staleTime: 2 * 60 * 1000,
  });

  useEffect(() => {
    if (branches.length && !selectedBranch) {
      setBranch(branches[0]._id);
    }
    console.log("this is the selected branch", selectedBranch);
  }, [branches]);
  useEffect(() => {
  if (data) {
    setTotalPage(data.totalPages);
  }
}, [data]);
  const handleSearchChange = (value: string) => {
    setSearch(value);
    // setPage(1)
    console.log("this is the value", value);
  };

  const createMutation = useMutation({
    mutationFn: AddCategory,
    onSuccess: () => {
      toast.success("Customer type added successfully");
      setIsOpen(false);
      queryClient.invalidateQueries({ queryKey: ["table"] });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const message = error?.response?.data?.message || "something went wrong";
      toast.error(message);
    },
  });
  const onEdit = (row: categoryTableData) => {
    setIsEdit(true);
    setIsOpen(true);
    setEditData(row || null);
  };
  const onDelete = (row: categoryTableData) => {
    setIsDelete(true);
    setDeleteData(row);
  };
  const updateMutation = useMutation({
    mutationFn: UpdateCategory,
    onSuccess: () => {
      toast.success("Customer type updated successfully");
      setIsOpen(false);
      setEditData(null);
      setIsEdit(false);
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: () => toast.error("Something went wrong"),
  });
  const deleteMutation = useMutation({
    mutationFn: DeleteCategory,
    onSuccess: () => {
      toast.success("Deleted successfully");
      setIsDelete(false);
      setDeleteData(null);
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: () => toast.error("Something went wrong"),
  });
  const topSection = (
    <div className="flex flex-col gap-2 w-full">
    <TopSection
      search={search}
      handleSearchChange={handleSearchChange}
      setIsClose={setIsClose}
      setBranch={setBranch}
      selectedBranch={selectedBranch}
      isclose={isclose}
      branchOptions={branchOptions}
    />
    <div className="me-auto flex gap-2">
  <Input
    type="date"
    onChange={(e) => setStartDate(e.target.value)}
    value={startDate || ""}
  />
  <Input
    type="date"
    onChange={(e) => setEndDate(e.target.value)}
    value={endDate || ""}
  />
</div>
  
    </div>
  );
  const SubmitCategory = async (
   data:FormData
  ) => {

    
     console.log("this is the data",data)
if(!data) return;
    if (editData) {
      updateMutation.mutate({id:editData._id,data:data})
    } else {
      createMutation.mutate(data);
    }
  };

  return (
    <div className="flex flex-col">
      <AddButton
        label="Add Category"
        icon={IoFastFood}
        onClick={() => {
          setIsOpen(true);
          setIsEdit(false);
        }}
      />
      <div className="bg-card rounded-2xl flex flex-col gap-3 mt-4">
        {isLoading ? (
          <>
            <SkeletonTable columns={2} rows={5} />
            <PaginationSkeleton/>
          </>
        ) : (
          <>
            <Table<categoryTableData>
              columns={[
                {
                  headers: "image",
                  accessor: "img",
                  style: "text-left pl-6",
                  render: (_: any, row: categoryTableData) => (
                    <div className="w-20 h-20">
                        <img src={row?.img} alt=""  className="w-full h-full object-cover"/>
                       </div>
                  ),
                },
                {
                  headers: "CategoryName",
                  accessor: "category",
                  style: "text-left pl-6",
                  render: (_: any, row: categoryTableData) => (
                    <div className="">{row.category}</div>
                  ),
                },
                {
                  headers: "Discount%",
                  accessor: "offer",
                  id:"offer_discount",
                  style: "text-left pl-6",
                  render: (_: any, row: categoryTableData) => (
                    <div className="">{row.offer?.discount}</div>
                  ),
                },
                {
                  headers: "Start Date",
                  accessor: "offer",
                  id:"offer_startDate",
                  style: "text-left pl-6",
                  render: (_: any, row: categoryTableData) => (
                    <div className="">{FormatDate(row.offer?.startDate)}</div>
                  ),
                },
                 {
                  headers: "End Date",
                  accessor: "offer",
                  id:"offer_endDate",
                  style: "text-left pl-6",
                  render: (_: any, row: categoryTableData) => (
                    <div className="">{FormatDate(row.offer?.endDate)}</div>
                  ),
                },
                {
                  headers: "Action",
                  accessor: "action",
                  style: "text-right pr-6  ",
                  render: (_: any, row: categoryTableData) => (
                    <div className="flex justify-end ">
                      <EditDeleteIcons
                        OnDelete={() => onDelete(row)}
                        OnEdit={() => onEdit(row)}
                      />
                    </div>
                  ),
                },
              ]}
              data={data || []}
              topSection={topSection}
            />
            <div className="flex justify-end p-3">
 <Pagination page={page} totalPage={totalPage} onPageChange={setPage} />
      </div>
          </>
        )}
      </div>
      <Modal
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
          setEditData(null);
        }}
        title="Add Position"
      >
        <CategoryForm
          branches={branchOptions}
          isEdit={isEdit}
          initialData={editData}
          onSubmit={SubmitCategory}
          isSubmitting={createMutation.isPending || updateMutation.isPending}
        />

      </Modal>

      <ConfirmAlert
        isOpen={isDelete}
        closeModal={() => setIsDelete(false)}
        onConfirm={() => {
          if (!deleteData) return;
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

export default Category;
