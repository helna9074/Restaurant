"use client";
import { Branch } from "@/types/branch";
import {
  createBranch,
  DeleteBranch,
  getBranch,
  updateBranchdata,
} from "@/service/API/branchApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import AddButton from "../ui/AddButton";
import { FaMagic } from "react-icons/fa";
import BranchTableClient from "./BranchTableClient";
import { Modal } from "../ui/Modal";
import BranchForm from "@/components/Forms/BranchForms/BranchForm";
import BranchInfo from "../ui/InfoRenderer";
import ConfirmAlert from "../ui/DeleteDialogue";
import { Branchsections } from "./branchViewConfig";

const BranchSection = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [isDelete, setIsDelete] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [viewId, setViewId] = useState<string | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["branch", editId ?? ""],
    queryFn: () => getBranch(editId!), //non-null assertion operator
    enabled: !!editId,
  });
  //create
  const createMutation = useMutation({
    mutationFn: createBranch,
    onSuccess: () => {
      setOpen(false);
      toast.success("branch created successfully");
      queryClient.invalidateQueries({ queryKey: ["branches"] });
    },
    onError: () => toast.error("creation failed.Try again"),
  });
  //update
  const updateMutation = useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
      updateBranchdata(id, formData),

    onSuccess: () => {
      toast.success("Branch updated");
      setOpen(false);
      setEditId(null);
      queryClient.invalidateQueries({ queryKey: ["branches"] });
      queryClient.invalidateQueries({ queryKey: ["branch", editId] });
    },
    onError: () => toast.error("update failed.Try again"),
  });
  //delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => DeleteBranch(id),
    onSuccess: () => {
      toast.success(" deleted successfully");
      setIsDelete(false);
      setDeleteId(null);
      queryClient.invalidateQueries({ queryKey: ["branches"] });
    },
    onError: () => toast.error("deletion failed.Try again"),
  });
  const OnEdit = (branch: Branch) => {
    setEditId(branch._id);
    setOpen(true);
  };
  const handleSubmit = (formData: FormData) => {
    if (editId) {
      updateMutation.mutate({ id: editId, formData });
    } else {
      createMutation.mutate(formData);
    }
  };
  const DeleteHandler = (id: string) => {
    setIsDelete(true);
    setDeleteId(id);
    console.log("this is the id getted", id);
  };
  const { data: viewData, isLoading: viewLoading } = useQuery({
    queryKey: ["branch-view", viewId],
    queryFn: () => getBranch(viewId!),
    enabled: !!viewId,
  });
  const handleView = (id: string) => {
    setViewId(id);
    setIsViewOpen(true);
  };
  return (
    <div>
      <div className="flex ms-auto mb-2">
        <AddButton
          label="Add Branch"
          icon={FaMagic}
          onClick={() => setOpen(true)}
        />
      </div>
      <BranchTableClient
        OnEdit={OnEdit}
        OnDelete={DeleteHandler}
        OnView={handleView}
      />
      {open && (
        <Modal open={open} onClose={() => setOpen(false)} title="Add Branch">
          {editId && isLoading ? (
            <p>Loading.....</p>
          ) : (
            <BranchForm
              key={editId ? "edit" : "create"}
              initialData={data?.branch}
              isEditing={!!editId}
              isOpen={open}
              onSubmit={handleSubmit}
              onCancel={() => setOpen(false)}
              isSubmitting={
                createMutation.isPending || updateMutation.isPending
              }
            />
          )}
        </Modal>
      )}
      {isViewOpen && (
        <Modal open={isViewOpen} onClose={() => setIsViewOpen(false)} title="">
          {viewLoading ? (
            <p>Loading.....</p>
          ) : (
            <BranchInfo
              data={viewData?.branch}
              sections={Branchsections}
              imageKey="logo"
            />
          )}
        </Modal>
      )}
      <ConfirmAlert
        isOpen={isDelete}
        closeModal={() => setIsDelete(false)}
        onConfirm={() => deleteMutation.mutate(deleteId!)}
        title="Delete Branch"
        message="are sure you want to delete the branch"
        confirmText="Delete"
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
};

export default BranchSection;
