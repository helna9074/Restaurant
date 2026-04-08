"use client";
import React, { useEffect, useState } from "react";
import { MdOutlineNightlight } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";

const ThemeToggle = () => {
  const [dark, setDark] = useState<boolean|null>(null);
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if(savedTheme==="dark"){
      setDark(true)
      document.documentElement.classList.add("dark")
    }else if(savedTheme==="light"){
      setDark(false)
      document.documentElement.classList.remove("dark")
    }else{
       const prefersDark = window.matchMedia(
      "(prefers-color-scheme:dark)",
    ).matches;
    setDark(prefersDark)
    document.documentElement.classList.toggle("dark",prefersDark)
    }
    
   
  
    //modifiy html html class=dark or <html>

  }, []);
  useEffect(() => {
    if(dark===null) return 
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);
  // const toggle=()=>{
  //       console.log("light mode is on")
  //       document.documentElement.classList.toggle("dark")
  //   }
  if(dark===null)return null;
  return (
    <button className="p-2 rounded-lg
        cursor-pointer
        hover:bg-black/10 dark:hover:bg-white/10
        hover:text-text-primary
        transition-all duration-200
        hover:scale-110 active:scale-95" onClick={() => setDark(!dark)}>
      {dark ? (
        <MdOutlineLightMode size={18} />
      ) : (
        <MdOutlineNightlight size={18} />
      )}
    </button>
  );
};

export default ThemeToggle;
