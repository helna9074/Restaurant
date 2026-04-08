"use client";

import { useSidebar } from "./SidebarProvider";



export default function SidebarOverlay() {
  const { isOpen, closeSidebar } = useSidebar();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 z-40 lg:hidden"
      onClick={closeSidebar}
    />
  );
}