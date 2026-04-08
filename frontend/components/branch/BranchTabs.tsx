"use client";
import React, { useState } from "react";
import TabButton from "../ui/TabButton";
interface Props{
  activeTab:string,
  setActiveTab:(tab:string)=>void
}
const BranchTabs = ({activeTab,setActiveTab}:Props) => {

  // const [open, setOpen] = useState(false);
  const tabs = [
    { id: "branch", label: "Branch" },
    { id: "CustomerType", label: "Customer Type" },
    { id: "payment", label: "Payment" },
  ];
  
  return (
    <div className="flex  flex-col gap-5  ">
      <div className="flex gap-3 items-center">
        {tabs.map((tab, index) => (
          <TabButton
            key={tab.id}
            text={tab.label}
            active={activeTab == tab.id}
            onClick={() => setActiveTab(tab.id)}
          />
        ))}
      </div>
    
    </div>
  );
};

export default BranchTabs;
