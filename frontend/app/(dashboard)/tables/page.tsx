"use client";

import BranchTabs from "@/components/branch/BranchTabs";
import FloorComponent from "@/components/Table&Floor/Floor";
import TableComponent from "@/components/Table&Floor/Table";

import { useState } from "react";

const TableFloorPage = () => {
  const [activeTab, setActiveTab] = useState("floor");
  const tabs = [
    { id: "floor", label: "Floor" },
    { id: "table", label: "Table" },
  ];
  return (
    <div className="mt-10 relative ">
      <BranchTabs
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      {activeTab === "table" && <TableComponent />}
      {activeTab === "floor" && <FloorComponent />}
    </div>
  );
};

export default TableFloorPage;
