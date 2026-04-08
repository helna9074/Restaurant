import React from 'react'
import { IoEye } from 'react-icons/io5'
import { MdDelete, MdEdit } from 'react-icons/md'

interface Props {
  OnEdit:()=>void,
  OnDelete:()=>void,
  OnView?:()=>void,
  ShowView?:boolean
}
const EditDeleteIcons = ({OnEdit,OnDelete,OnView,ShowView=false}:Props) => {
  return (
    <div className="flex items-center justify-center gap-2">
            <MdEdit onClick={OnEdit}/>
            {ShowView&&(
                <IoEye onClick={OnView}/>
            )}
          
            <MdDelete onClick={OnDelete}/>

          </div>
  )
}

export default EditDeleteIcons
