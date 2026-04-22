import React from 'react'

interface Props {
    label?:string,
    icon?:any,
    onClick?:()=>void
}
const AddButton = ({label,icon:Icon,onClick}:Props) => {
  return (
   <div className="flex flex-col ms-auto items-center lg:mt-0 mt-10" onClick={onClick}>
        <div className='bg-button-primary p-2 rounded-2xl w-16 h-16 flex justify-center items-center'>
            <Icon size={25}/>
        </div>
        <p className="text-center">{label}</p>
         
      </div>
  )
}

export default AddButton

