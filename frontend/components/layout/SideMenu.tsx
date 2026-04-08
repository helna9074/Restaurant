"use client";
import { sidebarMenu } from "@/constants/sidebarMenu";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import SideMenuButton from "../ui/menubutton";
import { useSidebar } from "@/components/wrapper/SidebarProvider";

const SideBar = () => {
  const { isOpen, toggleSidebar } = useSidebar();

  return (
    <aside
      className={`sidebar w-52 rounded-3xl flex flex-col lg:h-[calc(100vh-15px)]  h-screen   lg:mx-3 lg:px-3 py-5 text-center text-text-primary fixed top-3 left-0 lg:translate-x-0 transition-transform duration-300 z-52 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      <h1 className="">My Restaurant</h1>
      <nav className="flex flex-col gap-10 ">
        {sidebarMenu.map((section) => (
          <div
            key={section.title}
            className="flex flex-col gap-5 h-full items-start"
          >
            <h2 className="text-xs font-light px-3 text-center ">
              {section.title}
            </h2>
            {section.items.map((item) => (
              <SideMenuButton
                key={item.href}
                href={item.href}
                image={item.type ? item.icon : undefined}
                icon={item.type ? undefined : item.icon}
                text={item.title}
                onClick={toggleSidebar}
              />
            ))}
          </div>
        ))}
      </nav>
      {/* <div className="mt-10">
      <h2 className="text-xs font-light text-start px-3">ACCOUNT PAGES</h2>
      {Accountsidemenu.map((item) => (
        <SideMenuButton key={item.href}
            href={item.href}
            image={item.type? item.icon:undefined}
            icon={item.type? undefined:item.icon}
            text={item.title}
            
          />
      ))}
     
</div> */}
    </aside>
  );
};

export default SideBar;
