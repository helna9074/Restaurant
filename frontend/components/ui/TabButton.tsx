import React, { useState } from 'react'

interface Props {
    text:string
    active?:boolean
    onClick?:()=>void,
    access?:boolean

}

const TabButton = ({text,active,onClick,access}:Props) => {

  return (
    <button className={`px-4 py-2 rounded-lg font-medium ${active? "bg-button-accent ":"bg-button-primary hover:bg-button-accent"}`}
    onClick={onClick} disabled={access}
   

    >
        {text}
      
    </button>
  )
}

export default TabButton
