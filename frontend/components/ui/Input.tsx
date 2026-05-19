import React from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
interface Props{
    className?:string,
    type?:string,
    placeholder?:string,
    label?:string
    register?:UseFormRegisterReturn
    error?:string
    onChange?:(e:React.ChangeEvent<HTMLInputElement>)=>void
    onKeyDown?:(e:React.KeyboardEvent<HTMLInputElement>)=>void
    disabled?:boolean
    value?:string
  
}
const Input = ({className,type,placeholder,label,register,error,value,onChange,disabled=false}:Props) => {
  return (
    <div className="">
        <label className='text-text-secondary ms-2'>{label}</label>
    <div className={`${className? className:"bg-input-box"} p-3 rounded-xl text-text-secondary`}>
        
      <input type={type} placeholder={placeholder} className="outline-0 w-full" {...register} onChange={onChange} disabled={disabled} value={value} min={0}/>
    </div>
    {error && <p className="text-red-500">{error}</p>}
    </div>
  )
}

export default Input
