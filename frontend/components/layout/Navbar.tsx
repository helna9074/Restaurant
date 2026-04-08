'use client'
import { useSidebar } from '@/components/wrapper/SidebarProvider'
import { usePathname } from 'next/navigation'
import React from 'react'
import { FaBed, FaUser } from 'react-icons/fa'
import { FaSection } from 'react-icons/fa6'
import { IoMdMenu } from "react-icons/io";
import ThemeToggle from '../ui/Theme-toggle'

const Navbar = () => {
  const pathname=usePathname()
  const pageName=pathname.split('/').pop()
  const {toggleSidebar}=useSidebar()
  return (
    <div className='fixed top-0 lg:left-52 right-0 left-0 flex gap-8 lg:gap-2  py-5 px-2 bg-background z-50 items-center '>
      <div className='flex items-center text-text-primary'>
        <button className="lg:hidden" onClick={toggleSidebar}>
          <IoMdMenu size={20}/>
        </button>
      </div>
      <div className='flex w-full justify-between items-center px-3 '>
        <div className='space-y-2 text-xs'>
            <p className='text-slate-500'>Pages / <span className='text-text-primary '>{`${pageName? pageName:'dashboard'}`}</span></p>
            <p>{`${pageName? pageName:'dashboard'}`}</p>

        </div>
      <div className='flex items-center gap-6 text-text-primary'>
        <div className='flex gap-2 items-center'>
            <FaUser className='text-sm'/>
            <div className='flex flex-col space-y-1 text-xs'>
             <p>Hashim</p>
             <p>Compnay Admin</p>
            </div>
        </div>
        <ThemeToggle/>
        <FaSection/>
        <FaBed/>
      </div>
    </div>
    </div>
  )
}

export default Navbar
