import React, { useEffect } from 'react'
import FormSelect from './FormSelect'
import SearchBar from '../TableComponents/SearchBar'
import { useBranches } from '@/hooks/useBranch'

interface Option{
    value:string,
    label:string,
    subLabel?:string
}
 interface Props{
  search:string,
  handleSearchChange:(value:string)=>void
  setIsClose:(value:boolean)=>void,
  setBranch:(value:string)=>void
  selectedBranch:string
  isclose?:boolean,
  branchOptions:Option[]
 
}

 
const TopSection = ({search,handleSearchChange,setIsClose,setBranch,selectedBranch,isclose,branchOptions}:Props) => {
 
  return (
    <div className=" w-full  flex lg:flex-row flex-col justify-between gap-5 items-center mb-4">
      <div className="w-72">
        <FormSelect
          setOpen={setIsClose}
          className="w-full p-4! h-12!"
          placeholder="Select Branch"
          options={branchOptions}
          onChange={(val) => setBranch(val as string)}
          value={selectedBranch}
          open={isclose}
        />
      </div>
      <SearchBar  value={search} onChange={handleSearchChange} />
    </div>
  )
}

export default TopSection
