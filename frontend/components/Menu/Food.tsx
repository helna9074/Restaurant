"use client";
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

import { IoRestaurant } from "react-icons/io5";

import {
  CreateFood,
  DeleteAddOn,
  DeleteFood,
  UpdateAddOn,
  UpdateFood,
  ViewFood,
} from "@/service/API/MenuApi";
import { AddOnOption, FoodEditData, FoodTableData } from "@/types/menu";

import FoodForm from "../Forms/MenuForms/FoodForm";
import { useAddOns } from "@/hooks/useAddOn";
import { useCategory } from "@/hooks/useCategory";
import { useKitchens } from "@/hooks/useKitchens";

import { useFood } from "@/hooks/useFood";
import FormSelect from "../ui/FormSelect";
import { FormatDate } from "@/helper/date";
import { PaginationSkeleton } from "../wrapper/PaginationSkelton";
import Pagination from "../TableComponents/Pagination";
import InfoRenderer from "../ui/InfoRenderer";
import { FoodSection } from "./foodViewConfig";
import { AsyncCallbackSet } from "next/dist/server/lib/async-callback-set";

const Food = () => {
  const [selectedBranch, setBranch] = useState("");
  const [formBranch, setFormBranch] = useState("");
  const [category, setCategory] = useState("");
  const [kitchen, setKitchen] = useState("");
  const [search, setSearch] = useState("");
  const [isclose, setIsClose] = useState(false);
  const [deleteData, setDeleteData] = useState<FoodTableData | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState<FoodEditData | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const queryClient = useQueryClient();
  const { branches } = useBranches({ all: true });
  const [isView, setIsView] = useState(false);
  const [viewId, setViewId] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const debouncedValue = useDebounce(search, 400);
  const { categories } = useCategory(formBranch, "", "", debouncedValue);
  const { categories: filterCategories } = useCategory(
    selectedBranch,
    "",
    "",
    debouncedValue,
  );
  const { data: filterKitchens } = useKitchens(selectedBranch, debouncedValue);
  const formCategoryOptions = categories.map((c) => ({
    value: c._id,
    label: c.category,
  }));

  const branchOptions = branches.map((b) => ({
    value: b._id,
    label: b.name,
    subLabel: `${b.city}, ${b.state}, ${b.email}`,
  }));
  const { addOns, isLoading } = useAddOns("", formBranch);
  const addOnOptions = addOns.map((b: AddOnOption) => ({
    value: b._id,
    label: b.addOnName,
  }));
  const { data: kitchens, isLoading: kitchenLoading } = useKitchens(
    formBranch,
    debouncedValue,
  );
  const formKitchenOptions = kitchens.map((k) => ({
    value: k._id,
    label: k.kitchen,
  }));
  const categoryOptions = filterCategories.map((c) => ({
    value: c._id,
    label: c.category,
  }));

  const kitchenOptions = filterKitchens.map((k) => ({
    value: k._id,
    label: k.kitchen,
  }));
  const { data: food, isLoading: FoodLoading } = useFood({
    branchId: selectedBranch,
    search: debouncedValue,
    page: 1,
    limit: 10,
    kitchen,
    category,
  });
  useEffect(() => {
    if (branches?.length > 0 && (!selectedBranch || !formBranch)) {
      setBranch(branches[0]._id);
      setFormBranch(branches[0]._id);
    }
    console.log("this is the selected branch", selectedBranch);
  }, [branches]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    // setPage(1)
    console.log("this is the value", value);
  };

  const createMutation = useMutation({
    mutationFn: CreateFood,
    onSuccess: () => {
      toast.success("Customer type added successfully");
      // setIsOpen(false);
      queryClient.invalidateQueries({ queryKey: ["food"] });
    },
    onError: () => toast.error("Something went wrong"),
  });
  const onEdit = async (row: FoodTableData) => {
    const food = await ViewFood(row._id);
    setIsEdit(true);
    setIsOpen(true);
    setEditData(food || null);
  };
  const onDelete = (row: FoodTableData) => {
    setIsDelete(true);
    setDeleteData(row);
  };
  const updateMutation = useMutation({
    mutationFn: UpdateFood,
    onSuccess: () => {
      toast.success("Customer type updated successfully");
      setIsOpen(false);
      setEditData(null);
      setIsEdit(false);
      queryClient.invalidateQueries({ queryKey: ["food"] });
    },
    onError: () => toast.error("Something went wrong"),
  });
  const deleteMutation = useMutation({
    mutationFn: DeleteFood,
    onSuccess: () => {
      toast.success("Deleted successfully");
      setIsDelete(false);
      setDeleteData(null);
      queryClient.invalidateQueries({ queryKey: ["food"] });
    },
    onError: () => toast.error("Something went wrong"),
  });
  const { data: viewData, isLoading: viewLoading } = useQuery({
    queryKey: ["food-view", viewId],
    queryFn: () => ViewFood(viewId!),
    enabled: !!viewId,
  });

  const handleView = (id: string) => {
    setViewId(id);
    setIsView(true);
  };

  const topSection = (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex  justify-between items-center">
        <TopSection
          search={search}
          handleSearchChange={handleSearchChange}
          setIsClose={setIsClose}
          setBranch={setBranch}
          selectedBranch={selectedBranch}
          isclose={isclose}
          branchOptions={branchOptions}
        />
      </div>
      <div className="flex gap-3 items-center w-full">
        <FormSelect
          label="Category"
          placeholder="Select"
          className="bg-input-box w-72 "
          options={categoryOptions}
          onChange={(val) => setCategory(val as string)}
          value={category}
        />

        <FormSelect
          placeholder="Select"
          label="Kitchen"
          className="bg-input-box w-72 "
          options={kitchenOptions}
          onChange={(val) => setKitchen(val as string)}
          value={kitchen}
        />
      </div>
    </div>
  );
  const SubmitFood = async (data: FormData) => {
    console.log("submitfood is called");
    if (!data) return;
    if (editData) {
      updateMutation.mutate({ id: editData._id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  return (
    <div className="flex flex-col">
      <AddButton
        label="Add Customer"
        icon={IoRestaurant}
        onClick={() => {
          setIsOpen(true);
          setIsEdit(false);
        }}
      />
      <div className="bg-card rounded-2xl flex flex-col gap-3 mt-4">
        {isLoading ? (
          <>
            <SkeletonTable columns={2} rows={5} />
            <PaginationSkeleton />
          </>
        ) : (
          <>
            <Table<FoodTableData>
              columns={[
                {
                  headers: "Image",
                  accessor: "img",

                  style: "text-left pl-6",
                  render: (_: any, row: FoodTableData) => (
                    <div className="w-20 h-20">
                      <img
                        src={row?.img}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ),
                },
                {
                  headers: "Food name",
                  accessor: "foodName",
                  id: "portion",
                  style: "text-left pl-6",
                  render: (_: any, row: FoodTableData) => (
                    <div className="">{row?.foodName}</div>
                  ),
                },
                {
                  headers: "Category",
                  accessor: "category",

                  style: "text-left pl-6",
                  render: (_: any, row: FoodTableData) => (
                    <div className="">{row?.category}</div>
                  ),
                },
                {
                  headers: "Kitchen",
                  accessor: "kitchen",

                  style: "text-left pl-6",
                  render: (_: any, row: FoodTableData) => (
                    <div className="">{row?.kitchen}</div>
                  ),
                },
                {
                  headers: "Created Date",
                  accessor: "createdAt",

                  style: "text-left pl-6",
                  render: (_: any, row: FoodTableData) => (
                    <div className="">{FormatDate(row?.createdAt)}</div>
                  ),
                },

                {
                  headers: "Action",
                  accessor: "action",
                  style: "text-right pr-6  ",
                  render: (_: any, row: FoodTableData) => (
                    <div className="flex justify-end ">
                      <EditDeleteIcons
                        ShowView={true}
                        OnView={() => handleView(row._id)}
                        OnDelete={() => onDelete(row)}
                        OnEdit={() => onEdit(row)}
                      />
                    </div>
                  ),
                },
              ]}
              data={food || []}
              topSection={topSection}
            />
            <div className="flex justify-end p-3">
              <Pagination
                page={page}
                totalPage={totalPage}
                onPageChange={setPage}
              />
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
        title={isEdit ? "Edit Food" : "Add Food"}
      >
        <FoodForm
          addOns={addOnOptions}
          branches={branchOptions}
          kitchens={formKitchenOptions}
          setFormBranch={setFormBranch}
          categories={formCategoryOptions}
          isEdit={isEdit}
          initialData={editData}
          onSubmit={SubmitFood}
          isSubmitting={createMutation.isPending || updateMutation.isPending}
        />
      </Modal>

      {isView && (
        <Modal open={isView} onClose={() => setIsView(false)} title="">
          {viewLoading ? (
            <p>Loading.....</p>
          ) : (
            <InfoRenderer
              data={viewData}
              sections={FoodSection}
              imageKey="img"
            />
          )}
        </Modal>
      )}
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

export default Food;
