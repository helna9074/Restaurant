'use client'
import React, { useEffect, useState } from "react";

import Table from "@/components/ui/Table";

import { useDebounce } from "@/hooks/useDebounce";
import { useBranches } from "@/hooks/useBranch";
import AddButton from "@/components/ui/AddButton";

import { Modal } from "@/components/ui/Modal";

import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import EditDeleteIcons from "@/components/TableComponents/EditDeleteIcons";
import ConfirmAlert from "@/components/ui/DeleteDialogue";

import { SkeletonTable } from "@/components/wrapper/SkeletonTable";

import TopSection from "@/components/ui/TopSection";
import { FaLayerGroup } from "react-icons/fa";


import { AxiosError } from "axios";
import { useFloor } from "@/hooks/useFloors";
import { kitchenTableData } from "@/types/kitchen";
import KitchenForm from "@/components/Forms/KitchenForm";
import { AddKitchen, DeleteKitchen, UpdateKitchen } from "@/service/API/kitchen";
import { useKitchens } from "@/hooks/useKitchens";

const KitchenPage = () => {
  const [selectedBranch, setBranch] = useState("");
  const [search, setSearch] = useState("");

  const [isclose, setIsClose] = useState(false);
  const [deleteData, setDeleteData] = useState<kitchenTableData | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState<kitchenTableData | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const queryClient = useQueryClient();

  const { branches } = useBranches({ all: true });

  const debouncedValue = useDebounce(search, 400);

  const { data, isLoading } = useKitchens(selectedBranch, debouncedValue);
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
  }, [branches]);
  const handleSearchChange = (value: string) => {
    setSearch(value);
    // setPage(1)
    console.log("this is the value", value);
  };

  const createMutation = useMutation({
    mutationFn: AddKitchen,
    onSuccess: () => {
      toast.success("Kitchen added successfully");
      setIsOpen(false);
      queryClient.invalidateQueries({ queryKey: ["kitchens"] });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const message = error?.response?.data?.message || "something went wrong";
      toast.error(message);
    },
  });
  const onEdit = (row: kitchenTableData) => {
    setIsEdit(true);
    setIsOpen(true);
    setEditData(row || null);
  };
  const onDelete = (row: kitchenTableData) => {
    setIsDelete(true);
    setDeleteData(row);
  };
  const updateMutation = useMutation({
    mutationFn: UpdateKitchen,
    onSuccess: () => {
      toast.success("Kitchen updated successfully");
      setIsOpen(false);
      setEditData(null);
      setIsEdit(false);
      queryClient.invalidateQueries({ queryKey: ["kitchens"] });
    },
    onError: () => toast.error("Something went wrong"),
  });
  const deleteMutation = useMutation({
    mutationFn: DeleteKitchen,
    onSuccess: () => {
      toast.success("Kitchen deleted successfully");
      setIsDelete(false);
      setDeleteData(null);
      queryClient.invalidateQueries({ queryKey: ["kitchens"] });
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
  const SubmitKitchens = async (
    branchId: string,
    kitchen: string,
   
  ) => {
    // console.log("this is the data",department);
    if (!branchId.length || !kitchen.length) return;
    if (editData) {
      updateMutation.mutate({ id: editData._id, kitchen });
    } else {
      createMutation.mutate({ branchId, kitchen} );
    }
  };

  return (
    <div className="flex flex-col">
      <AddButton
        label="Add Kitchen"
        icon={FaLayerGroup}
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
            <Table<kitchenTableData>
              columns={[
                {
                  headers: "Kitchen Name",
                  accessor: "kitchen",
                  style: "text-left pl-6",
                  render: (_: any, row: kitchenTableData) => (
                    <div className="">{row?.kitchen}</div>
                  ),
                },
              
                
                {
                  headers: "Action",
                  accessor: "action",
                  style: "text-right pr-6  ",
                  render: (_: any, row: kitchenTableData) => (
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
        <KitchenForm
          branches={branchOptions}
          isEdit={isEdit}
          initialData={editData}
          onSubmit={SubmitKitchens}
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

export default KitchenPage;
