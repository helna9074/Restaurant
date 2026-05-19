"use client";

import React, { useEffect, useState } from "react";
import Table from "@/components/ui/Table";
import { IoPersonAdd } from "react-icons/io5";
import { useDebounce } from "@/hooks/useDebounce";
import { useBranches } from "@/hooks/useBranch";
import AddButton from "@/components/ui/AddButton";

import { Modal } from "@/components/ui/Modal";

import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import EditDeleteIcons from "@/components/TableComponents/EditDeleteIcons";
import ConfirmAlert from "@/components/ui/DeleteDialogue";

import { SkeletonTable } from "@/components/wrapper/SkeletonTable";

import { useDepartment } from "@/hooks/useDepartment";
import TopSection from "@/components/ui/TopSection";
import UserForm from "@/components/Forms/UserForm";

import {
  AddUser,
  DeleteUser,
  GetUsers,
  UpdateUser,
} from "@/service/API/userApi";
import { UpdateUserData, UserPayload, UserTableData } from "@/types/user";

const UserPage = () => {
  const [selectedBranch, setBranch] = useState("");
  const [search, setSearch] = useState("");

  const [isclose, setIsClose] = useState(false);
  const [deleteData, setDeleteData] = useState<UserTableData | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState<UpdateUserData | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const queryClient = useQueryClient();

  const branchId = selectedBranch;
  const debouncedValue = useDebounce(search, 400);
  const { branches } = useBranches({ all: true });

  const { data: Users, isLoading: isUsersLoading } = useQuery({
    queryKey: ["users", branchId, debouncedValue],
    queryFn: () => GetUsers(branchId, debouncedValue),
    enabled: !!branchId,
    staleTime: 2 * 60 * 1000,
  });
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

  const createMutation = useMutation({
    mutationFn: AddUser,
    onSuccess: () => {
      toast.success("Customer type added successfully");
      setIsOpen(false);
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: () => toast.error("Something went wrong"),
  });
  const onEdit = (row: UserTableData) => {
    // const fullData = data.find(
    //   (item: departmentType) => item.branch._id === row.branchId,
    // );
    setIsEdit(true);
    setIsOpen(true);
    setEditData({
      id: row._id,
      email: row.email,
      branchId: selectedBranch,
      employeeId: row.employeeId,
    });
  };
  const onDelete = (row: UserTableData) => {
    setIsDelete(true);
    setDeleteData(row);
  };

  const updateMutation = useMutation({
    mutationFn: UpdateUser,
    onSuccess: () => {
      toast.success("Customer type updated successfully");
      setIsOpen(false);
      setEditData(null);
      setIsEdit(false);
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: () => toast.error("Something went wrong"),
  });
  const deleteMutation = useMutation({
    mutationFn: DeleteUser,
    onSuccess: () => {
      toast.success("Deleted successfully");
      setIsDelete(false);
      setDeleteData(null);
      queryClient.invalidateQueries({ queryKey: ["users"] });
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
  const SubmitUser = async (data: UserPayload) => {
    if (editData) {
      updateMutation.mutate({ id: editData.id!!, data });
    } else {
      createMutation.mutate({
        email: data.email,
        employeeId: data.employeeId,
        branchId: data.branchId,
        password: data.password!,
      });
    }
  };

  return (
    <div className="flex flex-col mt-10">
      <AddButton
        label="Add Department"
        icon={IoPersonAdd}
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
            <Table<UserTableData>
              columns={[
                {
                  headers: "Name",
                  accessor: "name",
                  style: "text-left pl-6",
                  render: (_: any, row: UserTableData) => (
                    <div className="">{row.name}</div>
                  ),
                },
                {
                  headers: "Email",
                  accessor: "email",
                  style: "text-left pl-6",
                  render: (_: any, row: UserTableData) => (
                    <div className="">{row.email}</div>
                  ),
                },
                {
                  headers: "Department",
                  accessor: "department",
                  style: "text-left pl-6",
                  render: (_: any, row: UserTableData) => (
                    <div className="">{row.department}</div>
                  ),
                },
                {
                  headers: "Position",
                  accessor: "position",
                  style: "text-left pl-6",
                  render: (_: any, row: UserTableData) => (
                    <div className="">{row.position}</div>
                  ),
                },
                {
                  headers: "Action",
                  accessor: "action",
                  style: "text-right pr-6  ",
                  render: (_: any, row: UserTableData) => (
                    <div className="flex justify-end ">
                      <EditDeleteIcons
                        OnDelete={() => onDelete(row)}
                        OnEdit={() => onEdit(row)}
                      />
                    </div>
                  ),
                },
              ]}
              data={Users || []}
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
        <UserForm
          branches={branchOptions}
          isEdit={isEdit}
          initialData={editData}
          onSubmit={SubmitUser}
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

export default UserPage;
