"use client";

import BranchTabs from "@/components/branch/BranchTabs";


import { useState } from "react";

import ConfirmAlert from "@/components/ui/DeleteDialogue";
import EmployeeSection from "@/components/Employee/EmployeeSection";


import Position from "@/components/Employee/Position";
import Employee from "@/components/Employee/Employee";


const BranchPage = () => {
      const [activeTab, setActiveTab] = useState("department");
       const tabs = [
    { id: "department", label: "Department" },
    { id: "position", label: "Position" },
    { id: "Employee", label: "Employee" },
  ];
  return (
    <div className="mt-10 relative ">
      <BranchTabs tabs={tabs}  activeTab={activeTab} setActiveTab={setActiveTab}/>
      {activeTab === "department" && <EmployeeSection />}
      {activeTab === "position" && <Position/>}
      {activeTab === "Employee" && <Employee />}
      
    </div>
  );
};

export default BranchPage;
