"use client";
import React, { useState } from "react";
import TabButton from "../ui/TabButton";
import toast from "react-hot-toast";
interface Props{
  activeTab:string,
  setActiveTab:(tab:string)=>void,
  tabs:{id:string,label:string}[],
  access?:boolean
}
const BranchTabs = ({activeTab,setActiveTab,tabs,access}:Props) => {

  // const [open, setOpen] = useState(false);
 
  
  return (
    <div className="flex  flex-col gap-5 flex-wrap  ">
      <div className="flex gap-3 items-center flex-wrap" >
        {tabs.map((tab, index) => {
           const shouldUseAccessControl =
   access !== undefined;

 const isLocked =
   shouldUseAccessControl &&
   tab.id !== "Personal Details" &&
   !access;
   return(
          <TabButton
          access={isLocked}
            key={tab.id}
            text={tab.label}
            active={activeTab == tab.id}
            onClick={() =>{
 if(isLocked){
          toast.error("Complete Personal Details first");
          return;
        }
            setActiveTab(tab.id)}
            }
          />
   )
})}
      </div>
    
    </div>
  );
};

export default BranchTabs;
