import React, { useEffect, useState } from "react";
import Table from "../ui/Table";

import { useDebounce } from "@/hooks/useDebounce";
import { useBranches } from "@/hooks/useBranch";
import AddButton from "../ui/AddButton";
import { TbUsersGroup } from "react-icons/tb";
import { Modal } from "../ui/Modal";

import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { departmentType } from "@/types/department";

import EditDeleteIcons from "../TableComponents/EditDeleteIcons";
import ConfirmAlert from "../ui/DeleteDialogue";

import { SkeletonTable } from "../wrapper/SkeletonTable";

import DepartmentForm from "../Forms/DepartmentForm";
import { AddDpt, DeleteDpt, UpdateDpt } from "@/service/API/departmentApi";
import { useDepartment } from "@/hooks/useDepartment";
import TopSection from "../ui/TopSection";

const EmployeeSection = () => {
  const [selectedBranch, setBranch] = useState("");
  const [search, setSearch] = useState("");

  const [isclose, setIsClose] = useState(false);
  const [deleteData, setDeleteData] = useState<departmentType | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState<departmentType | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const queryClient = useQueryClient();
  // const[mainsearch,setMainSearch]=useState("")
  // const[page,setPage]=useState(1)
  const branchId = selectedBranch;
  const debouncedValue = useDebounce(search, 400);
  const { branches } = useBranches({ all: true });

  const branchOptions = branches.map((b) => ({
    value: b._id,
    label: b.name,
    subLabel: `${b.city}, ${b.state}, ${b.email}`,
  }));

  const { data, isLoading, isError, error } = useDepartment(
   
    branchId,
     debouncedValue,
  );
  if (isError) {
    console.log("this is the error we got", error);
  }

  useEffect(() => {
    if (branches.length && !selectedBranch) {
      setBranch(branches[0]._id);
    }
    console.log("this is the selected branch", selectedBranch);
  }, [branches]);
  const handleSearchChange = (value: string) => {
    setSearch(value);
    // setPage(1)
    console.log("this is the value", value);
  };

  // const rows = DepartmentRows(data || []);

  const createMutation = useMutation({
    mutationFn: AddDpt,
    onSuccess: () => {
      toast.success("Customer type added successfully");
      setIsOpen(false);
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
    onError: () => toast.error("Something went wrong"),
  });
  const onEdit = (row: departmentType) => {
    // const fullData = data.find(
    //   (item: departmentType) => item.branch._id === row.branchId,
    // );
    setIsEdit(true);
    setIsOpen(true);
    setEditData(row || null);
  };
  const onDelete = (row: departmentType) => {
    setIsDelete(true);
    setDeleteData(row);
  };

  const updateMutation = useMutation({
    mutationFn: UpdateDpt,
    onSuccess: () => {
      toast.success("Customer type updated successfully");
      setIsOpen(false);
      setEditData(null);
      setIsEdit(false);
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
    onError: () => toast.error("Something went wrong"),
  });
  const deleteMutation = useMutation({
    mutationFn: DeleteDpt,
    onSuccess: () => {
      toast.success("Deleted successfully");
      setIsDelete(false);
      setDeleteData(null);
      queryClient.invalidateQueries({ queryKey: ["departments"] });
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
  const SubmitCustomerType = async (
    branches: string[],
    departments: string[],
  ) => {
    console.log("this is the data", branches, departments);
    if (!branches.length || !departments.length) return;
    if (editData) {
      updateMutation.mutate({ id: editData._id, department: departments[0] });
    } else {
      createMutation.mutate({ branches, departments });
    }
  };

  return (
    <div className="flex flex-col">
      <AddButton
        label="Add Department"
        icon={TbUsersGroup}
        onClick={() => {
          setIsOpen(true);
          setIsEdit(false);
        }}
      />
      <div className="bg-card rounded-2xl flex flex-col gap-3 mt-4">
        {isLoading ? (
          <>
            <SkeletonTable columns={2} rows={5} />
          </>
        ) : (
          <>
            <Table<departmentType>
              columns={[
                {
                  headers: "Departments",
                  accessor: "department",
                  style: "text-left pl-6",
                  render: (_: any, row: departmentType) => (
                    <div className="">{row.department}</div>
                  ),
                },
                {
                  headers: "Action",
                  accessor: "action",
                  style: "text-right pr-6  ",
                  render: (_: any, row: departmentType) => (
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
            {/* <div className="flex justify-end p-3">
 <Pagination page={page} totalPage={totalPage} onPageChange={setPage} />
      </div> */}
          </>
        )}
      </div>
      <Modal
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
          setEditData(null);
        }}
        title="Add Department"
      >
        <DepartmentForm
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

export default EmployeeSection;
