"use client";

import BranchTabs from "@/components/branch/BranchTabs";
import Category from "@/components/Menu/Category";
import Menu from "@/components/Menu/menu";


import { useState } from "react";

const MenuPage = () => {
  const [activeTab, setActiveTab] = useState("category");
  const tabs = [
    { id: "category", label: "Category" },
    { id: "menutype", label: "Menu Types" },
    { id: "addons", label: "Add Ons" },
    { id: "course", label: "Course" },
    { id: "food", label: "Food" },
    { id: "combo", label: "Combo" },
  ];
  return (
    <div className="mt-10 relative ">
      <BranchTabs
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      {activeTab === "category" && <Category />}
      {activeTab === "menutype" && <Menu />}
      {activeTab === "addons" && <div>Add Ons Content</div>}
    </div>
  );
};

export default MenuPage;
