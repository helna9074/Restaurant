'use client'
import React, { useEffect, useRef, useState } from 'react'

import { SlPicture } from 'react-icons/sl';
import Input from './Input';

interface Props{
    label?:string,
    value:File|string|null,
    onChange:(file:File)=>void
    previewUrl?:string

}
const ImageUploader = ({label,onChange,value,previewUrl}:Props) => {
    const [preview,setPreview]=useState("")
    const inputRef=useRef<HTMLInputElement>(null)
    useEffect(() => {
    if (!value) return;

    if (typeof value === "string") {
      setPreview(value);
    } else {
      const url = URL.createObjectURL(value);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [value]);
  return (
<div className="flex flex-col gap-2">   
          <div className="grid col-span-3 ">
               {label && <p className="text-sm text-text-secondary">{label}</p>}
            <input
              className="hidden"
              type="file"
              accept="image/*"
              ref={inputRef}
              
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) onChange(file);
              }}
            />
          </div>
          <div className=" grid col-span-1 justify-center items-center lg:h-24 w-24 h-20 bg-input-box rounded-2xl text-text-secondary" onClick={() => inputRef.current?.click()}>
            {preview ? (
              <img
                src={preview}
                alt="logo"
                className="w-full h-full object-cover  "
              />
            ) : (
              <SlPicture className="text-5xl text-black " />
            )}
          </div>
  
          
      </div>
  )
}

export default ImageUploader
