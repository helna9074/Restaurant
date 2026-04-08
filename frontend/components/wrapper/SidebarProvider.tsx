"use client"
import React, { ReactNode, useContext, useState } from 'react'
import { createContext } from 'react'

interface sidebarContextType{
    isOpen:boolean,
    toggleSidebar:()=>void
    closeSidebar:()=>void
}
// default is null
const sidebarContext=createContext<sidebarContextType|null>(null)
const SidebarProvider = ({children}:{children:ReactNode}) => {
    const [isOpen,setIsOpen]=useState(false)
    const toggleSidebar=()=>setIsOpen((prev)=>!prev)
    const closeSidebar=()=>setIsOpen(false)
  return (
    <sidebarContext.Provider value={{isOpen,toggleSidebar,closeSidebar}}>
      {children}
    </sidebarContext.Provider>
  )
}

export const useSidebar=()=>{
    const context=useContext(sidebarContext)
    if(!context){
        throw new Error("useSidebar must be used within a SidebarProvider")
    }
    return context
}

export default SidebarProvider

