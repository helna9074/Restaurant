import React, { useEffect, useState } from "react";

import Table from "../ui/Table";

import { useDebounce } from "@/hooks/useDebounce";
import { useBranches } from "@/hooks/useBranch";
import AddButton from "../ui/AddButton";

import { Modal } from "../ui/Modal";

import { MdTableBar } from "react-icons/md";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import EditDeleteIcons from "../TableComponents/EditDeleteIcons";
import ConfirmAlert from "../ui/DeleteDialogue";

import { SkeletonTable } from "../wrapper/SkeletonTable";

import TopSection from "../ui/TopSection";

import {
  AddTable,
  DeleteTable,
  GetTables,
  UpdateTable,
} from "@/service/API/Floor&Table";
import { AxiosError } from "axios";

import TableForm from "../Forms/TableForms/TableForm";
import { TableData } from "@/types/table";

const TableComponent = () => {
  const [selectedBranch, setBranch] = useState("");
  const [search, setSearch] = useState("");

  const [isclose, setIsClose] = useState(false);
  const [deleteData, setDeleteData] = useState<TableData | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState<TableData | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const queryClient = useQueryClient();

  const { branches } = useBranches({ all: true });

  const debouncedValue = useDebounce(search, 400);

  const branchOptions = branches.map((b) => ({
    value: b._id,
    label: b.name,
    subLabel: `${b.city}, ${b.state}, ${b.email}`,
  }));
  const { data, isLoading } = useQuery({
    queryKey: ["table", selectedBranch, debouncedValue],
    queryFn: () => GetTables(selectedBranch, debouncedValue),
    enabled: !!selectedBranch,
    staleTime: 2 * 60 * 1000,
  });

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
    mutationFn: AddTable,
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
  const onEdit = (row: TableData) => {
    setIsEdit(true);
    setIsOpen(true);
    setEditData(row || null);
  };
  const onDelete = (row: TableData) => {
    setIsDelete(true);
    setDeleteData(row);
  };
  const updateMutation = useMutation({
    mutationFn: UpdateTable,
    onSuccess: () => {
      toast.success("Customer type updated successfully");
      setIsOpen(false);
      setEditData(null);
      setIsEdit(false);
      queryClient.invalidateQueries({ queryKey: ["table"] });
    },
    onError: () => toast.error("Something went wrong"),
  });
  const deleteMutation = useMutation({
    mutationFn: DeleteTable,
    onSuccess: () => {
      toast.success("Deleted successfully");
      setIsDelete(false);
      setDeleteData(null);
      queryClient.invalidateQueries({ queryKey: ["table"] });
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
  const SubmitFloors = async (
    branchId: string,
    floorName: string,
    table: string,
    capacity: number,
  ) => {
    // console.log("this is the data",department);
    if (!branchId.length || !floorName.length || !table || !capacity) return;
    if (editData) {
      updateMutation.mutate({ id: editData._id, floorName, table, capacity });
    } else {
      createMutation.mutate({ branchId, floorName, table, capacity });
    }
  };

  return (
    <div className="flex flex-col">
      <AddButton
        label="Add Customer"
        icon={MdTableBar}
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
            <Table<TableData>
              columns={[
                {
                  headers: "Restaurant",
                  accessor: "restaurant",
                  style: "text-left pl-6",
                  render: (_: any, row: TableData) => (
                    <div className="">{row?.restaurant}</div>
                  ),
                },
                {
                  headers: "Floor Name",
                  accessor: "floor",
                  style: "text-left pl-6",
                  render: (_: any, row: TableData) => (
                    <div className="">{row.floorName}</div>
                  ),
                },
                {
                  headers: "table",
                  accessor: "table",
                  style: "text-left pl-6",
                  render: (_: any, row: TableData) => (
                    <div className="">{row.table}</div>
                  ),
                },
                {
                  headers: "Seats",
                  accessor: "capacity",
                  style: "text-left pl-6",
                  render: (_: any, row: TableData) => (
                    <div className="">{row.capacity}</div>
                  ),
                },
                {
                  headers: "Action",
                  accessor: "action",
                  style: "text-right pr-6  ",
                  render: (_: any, row: TableData) => (
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
        title="Add Position"
      >
        <TableForm
          branches={branchOptions}
          isEdit={isEdit}
          initialData={editData}
          onSubmit={SubmitFloors}
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

export default TableComponent;
