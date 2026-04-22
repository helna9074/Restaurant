"use client";

import BranchTabs from "@/components/branch/BranchTabs";


import { useState } from "react";

import ConfirmAlert from "@/components/ui/DeleteDialogue";
import BranchSection from "@/components/branch/BranchSection";
import PaymentSection from "@/components/branch/PaymentSection";
import CustomerSection from "@/components/branch/CustomerSection";


const BranchPage = () => {
      const [activeTab, setActiveTab] = useState("branch");
       const tabs = [
    { id: "branch", label: "Branch" },
    { id: "CustomerType", label: "Customer Type" },
    { id: "payment", label: "Payment" },
  ];
  return (
    <div className="mt-10 relative ">
      <BranchTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab}/>
      {activeTab === "branch" && <BranchSection />}
      {activeTab === "CustomerType" && <CustomerSection/>}
      {activeTab === "payment" && <PaymentSection />}
      
    </div>
  );
};

export default BranchPage;
