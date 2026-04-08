"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { motion } from "framer-motion";

type Props = {
  href: string;
  image?: any;
  icon?: any;
  text: string;
  onClick?:()=>void
};

const SideMenuButton = ({ image, text, icon: Icon, href,onClick }: Props) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`menu-button relative text-text-primary  ${isActive ? "" : ""}`}
    >
      {isActive && (
        <motion.div
          layoutId="active"
          className="absolute inset-0   rounded-lg bg-sidebar-accent"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
      <span className="relative flex  gap-3 items-center ">
        {image ? (
          <div className={` rounded-xl p-2 ${isActive?"bg-main-primary-hover":"bg-main-primary"}`}>
          <Image
            src={image}
            alt={text}
            width={20}
            height={20}
            className="object-cover  "
          />
          </div>
        ) : (
          <div className={` rounded-xl p-2 ${isActive?"bg-main-primary-hover":"bg-main-primary"} `}>
             <Icon size={20} className="" />
          </div>
         
        )}
        <span>{text}</span>
      </span>
    </Link>
  );
};

export default SideMenuButton;
