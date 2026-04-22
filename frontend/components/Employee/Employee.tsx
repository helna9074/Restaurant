import React, { useEffect, useState } from "react";

import Table from "../ui/Table";

import { useDebounce } from "@/hooks/useDebounce";
import { useBranches } from "@/hooks/useBranch";
import AddButton from "../ui/AddButton";
import { FaUsers } from "react-icons/fa";
import { Modal } from "../ui/Modal";

import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import EditDeleteIcons from "../TableComponents/EditDeleteIcons";
import ConfirmAlert from "../ui/DeleteDialogue";

import { SkeletonTable } from "../wrapper/SkeletonTable";

import TopSection from "../ui/TopSection";
import {
  AddEmployee,
  DeleteEmployee,
  GetEmpById,
  GetEmployees,
  UpdateEmployee,
} from "@/service/API/departmentApi";
import { useDepartment } from "@/hooks/useDepartment";

import {
  EmployeeFormState,
  EmployeeTableData,
  PositionType,
} from "@/types/department";
import PersonalForm from "../Forms/EmployeeForms/PersonalForm";
import BranchTabs from "../branch/BranchTabs";
import WorkForm from "../Forms/EmployeeForms/WorkForm";

import { PersonalFormData } from "@/Schemas/departmentSchema";
import { usePosition } from "@/hooks/usePosition";
import { FormatDate } from "@/helper/date";
import InfoRenderer from "../ui/InfoRenderer";
import { EmployeeSections } from "../branch/branchViewConfig";

const Employee = () => {
  const [selectedBranch, setBranch] = useState("");
  const [search, setSearch] = useState("");

  const [isclose, setIsClose] = useState(false);
  const [deleteData, setDeleteData] = useState<EmployeeTableData | null>(null);
    const [viewId, setViewId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [editId, setEditId] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
    const [isViewOpen, setIsViewOpen] = useState(false);
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("Personal Details");
  const [employeeData, setEmployeeData] = useState<EmployeeFormState>({
    personal: null,
    work: null,
  });
  const canAccessWork = !!employeeData.personal;
  const employeeBranchId = employeeData.personal?.branch || "";
  const { branches } = useBranches({ all: true });
  const { data: departments } = useDepartment(employeeBranchId);
  const { data: positions } = usePosition("", employeeBranchId);
  const debouncedValue = useDebounce(search, 400);

  const tabs = [
    { id: "Personal Details", label: "Personal Details" },
    { id: "Work Information", label: "Work Information" },
  ];
  const positionsOptions = positions.map((p) => ({
    value: p._id,
    label: p.position,
  }));
  const branchOptions = branches.map((b) => ({
    value: b._id,
    label: b.name,
    subLabel: `${b.city}, ${b.state}, ${b.email}`,
  }));
  const departmentOptions = departments.map((d) => ({
    value: d._id,
    label: d.department,
  }));

  useEffect(() => {
    if (branches.length && !selectedBranch) {
      setBranch(branches[0]._id);
    }
    console.log("this is the selected branch", selectedBranch);
  }, [branches]);
  const { data: editData, isLoading: editLoading } = useQuery({
  queryKey: ["employee", editId],
  queryFn: () => GetEmpById(editId!),
  enabled: !!editId,
});
const { data: viewData, isLoading: viewLoading } = useQuery({
  queryKey: ["employee-view", viewId],
  queryFn: () => GetEmpById(viewId!),
  enabled: !!viewId,
});
  const handleSearchChange = (value: string) => {
    setSearch(value);
    // setPage(1)
    console.log("this is the value", value);
  };
  const { data, isLoading } = useQuery({
    queryKey: ["employees", debouncedValue, selectedBranch],
    queryFn: () => GetEmployees(debouncedValue, selectedBranch),
    enabled: !!selectedBranch,
    staleTime: 2 * 60 * 1000,
  });
  const createMutation = useMutation({
    mutationFn: AddEmployee,
    onSuccess: () => {
      toast.success("Employee  added successfully");
      setIsOpen(false);
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
    onError: () => toast.error("Something went wrong"),
  });
 useEffect(() => {
  if (editData) {
    setEmployeeData({
      personal: {
        ...editData.personalDetails,
        branch: editData.branch,
      },
      work: {
        ...editData.workInformation,
        joiningDate: FormatDate(editData.workInformation.joiningDate),
      },
    });
  }
}, [editData]);
  const onEdit = async (row: EmployeeTableData) => {
    // const employee = await GetEmpById(row._id);
    // setEmployeeData({
    //   personal: {
    //     ...employee.personalDetails,
    //     branch: employee.branch,
    //   },
    //   work: {
    //     ...employee.workInformation,
    //     joiningDate: FormatDate(employee.workInformation.joiningDate),
    //   },
    // });
    setEditId(row._id);
    setIsEdit(true);
    setIsOpen(true);
  };
  const onDelete = (row: EmployeeTableData) => {
    setIsDelete(true);
    setDeleteData(row);
  };
  const updateMutation = useMutation({
    mutationFn: UpdateEmployee,
    onSuccess: () => {
      toast.success("Employee  updated successfully");
      setIsOpen(false);
      setEditId("");
      setIsEdit(false);
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
    onError: () => toast.error("Something went wrong"),
  });
  const deleteMutation = useMutation({
    mutationFn: DeleteEmployee,
    onSuccess: () => {
      toast.success("Deleted successfully");
      setIsDelete(false);
      setDeleteData(null);
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
    onError: () => toast.error("Something went wrong"),
  });
   const handleView = (id: string) => {
    setViewId(id);
    setIsViewOpen(true);
  };

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
  const SubmitPersonal = async (data: PersonalFormData) => {
    setEmployeeData((prev) => ({
      ...prev,
      personal: data,
    }));
    setTimeout(() => {
      setActiveTab("Work Information");
    }, 0);
  };

  const SubmitWork = async (data: any) => {
    const { branch, ...cleanPersonal } = employeeData.personal!;
    const payload = {
      branch,
      personal: cleanPersonal,
      work: data,
    };
    // setEmployeeData(payload);
    if (isEdit) {
      updateMutation.mutate({
        id: editId,
        ...payload,
      });
    } else {
      createMutation.mutate(payload);
    }
    setActiveTab("Personal Details");
  };

  return (
    <div className="flex flex-col">
      <AddButton
        label="Add Employee"
        icon={FaUsers}
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
            <Table<EmployeeTableData>
              columns={[
                {
                  headers: "First Name",
                  accessor: "firstName",
                  style: "text-left pl-6",
                  render: (_: any, row: EmployeeTableData) => (
                    <div className="">{row?.firstName}</div>
                  ),
                },
                {
                  headers: "Email",
                  accessor: "email",
                  style: "text-left pl-6",
                  render: (_: any, row: EmployeeTableData) => (
                    <div className="">{row.email}</div>
                  ),
                },
                {
                  headers: "Contact No.",
                  accessor: "phone",
                  style: "text-left pl-6",
                  render: (_: any, row: EmployeeTableData) => (
                    <div className="">{row.phone}</div>
                  ),
                },
                {
                  headers: "Department",
                  accessor: "department",
                  style: "text-left pl-6",
                  render: (_: any, row: EmployeeTableData) => (
                    <div className="">{row.department}</div>
                  ),
                },
                {
                  headers: "Position",
                  accessor: "position",
                  style: "text-left pl-6",
                  render: (_: any, row: EmployeeTableData) => (
                    <div className="">{row.position}</div>
                  ),
                },
                {
                  headers: "Action",
                  accessor: "action",
                  style: "text-right pr-6  ",
                  render: (_: any, row: EmployeeTableData) => (
                    <div className="flex justify-end ">
                      <EditDeleteIcons
                        ShowView={true}
                        OnView={()=>handleView(row._id)}
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
          setEditId("");
        }}
        title="Add Customer"
      >
        <div className="flex flex-col  items-center">
          <BranchTabs
            tabs={tabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            access={canAccessWork}
          />

          {activeTab === "Personal Details" && (
            <PersonalForm
              branches={branchOptions}
              onSubmit={SubmitPersonal}
              onCancel={() => setIsOpen(false)}
              isOpen={isOpen}
              initialData={employeeData.personal}
              isEditing={isEdit}
              isSubmitting={
                createMutation.isPending || updateMutation.isPending
              }
            />
          )}
          {activeTab === "Work Information" &&
            employeeData.personal?.branch && (
              <WorkForm
                departments={departmentOptions}
                positions={positionsOptions}
                onSubmit={SubmitWork}
                onCancel={() => setIsOpen(false)}
                isOpen={isOpen}
                initialData={employeeData.work}
                isEditing={isEdit}
                isSubmitting={
                  createMutation.isPending || updateMutation.isPending
                }
              />
            )}
        </div>
      </Modal>
      {isViewOpen && (
  <Modal open={isViewOpen} onClose={() => setIsViewOpen(false)} title="">
    {viewLoading ? (
      <p>Loading...</p>
    ) : (
      <InfoRenderer
        data={{
          ...viewData.personalDetails,
          ...viewData.workInformation,
          joiningDate: FormatDate(viewData.workInformation.joiningDate),
          branch: viewData.branch,
        }}
        sections={EmployeeSections}
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

export default Employee;
