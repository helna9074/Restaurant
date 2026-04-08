"use client";

import BranchTabs from "@/components/branch/BranchTabs";

import BranchTableClient from "@/components/branch/BranchTableClient";
import { useState } from "react";

import ConfirmAlert from "@/components/ui/DeleteDialogue";
import BranchSection from "@/components/branch/BranchSection";
import PaymentSection from "@/components/branch/PaymentSection";
import CustomerSection from "@/components/branch/CustomerSection";


const BranchPage = () => {
      const [activeTab, setActiveTab] = useState("branch");
  return (
    <div className="mt-10 relative">
      <BranchTabs  activeTab={activeTab} setActiveTab={setActiveTab}/>
      {activeTab === "branch" && <BranchSection />}
      {activeTab === "CustomerType" && <CustomerSection/>}
      {activeTab === "payment" && <PaymentSection />}
      
    </div>
  );
};

export default BranchPage;
