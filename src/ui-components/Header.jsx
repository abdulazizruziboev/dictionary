import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch"

import React, { useEffect } from 'react'

export default function Header() {

const [isDark,setIsDark] = React.useState(localStorage.getItem("theme")=="dark"||false);
const [currentFont,setCurrentFont] = React.useState(localStorage.getItem("font_family")||"sans");
  
useEffect(()=>{
    if(isDark) {
        document.documentElement.classList.remove("light");
        document.documentElement.classList.add("dark");
    } else {
        document.documentElement.classList.remove("dark");
        document.documentElement.classList.add("light");
    };
    if(currentFont) {
         document.documentElement.classList.remove(
            "font-serif",
            "font-sans",
            "font-mono"
        );
        localStorage.setItem("font_family",currentFont);
        switch (currentFont) {
            case "serif": 
                document.documentElement.classList.add("font-serif");
                break;
            case "sans": 
                document.documentElement.classList.add("font-sans");
                break;
            case "mono": 
                document.documentElement.classList.add("font-mono");
                break;
            
        }
    }
},[isDark,currentFont]);

  return (
    <header className="flex justify-center items-center outline-[#A445ED]">
        <div className="flex w-full justify-between items-center max-w-[735px] p-[24px]">
        <a href="/" className="outline-[#A445ED]">
            <img src="/imgs/logo.svg" className="h-[32px] w-[28px]"/>
        </a>
        <div className="flex items-center justify-center">
        <Select defaultValue={currentFont} onValueChange={(value)=>{
            setCurrentFont(value);
            localStorage.setItem("font_family", value);
        }} className="!bg-transparent">
        <SelectTrigger className="w-full max-w-48 focus-visible:ring-[-1px] border-none shadow-none cursor-pointer outline-[#A445ED] !bg-transparent" >
            <SelectValue placeholder="Select a font" />
        </SelectTrigger>
        <SelectContent className={'top-12'}>
            <SelectGroup>
            <SelectItem value="sans" className={'font-sans'}>Sans Serif</SelectItem>
            <SelectItem value="serif" className={'font-serif'}>Serif</SelectItem>
            <SelectItem value="mono" className={'font-mono'}>Mono</SelectItem>
            </SelectGroup>
        </SelectContent>
        </Select>
        <span className="inline-block h-[28px] w-[0.5px] bg-gray-300 dark:bg-[#ddd5]"/>
        <label className="flex gap-2 px-3 cursor-pointer mr-2" label="theme-toggler">
            <Switch checked={isDark} id="theme-toggler" className={'cursor-pointer outline-[#A445ED]'}
            onClick={()=>{
                if(isDark) {
                    setIsDark(false);
                    localStorage.setItem("theme","light");
                } else {
                    setIsDark(true);
                    localStorage.setItem("theme","dark");
                }
            }}  
            />
            {!isDark&&<img src="/imgs/moon.svg" className="h-[20px] w-[20px] cursor-pointer"/>}
            {isDark&&<img src="/imgs/moon-dark.svg" className="h-[20px] w-[20px] cursor-pointer"/>}
        </label>
        </div>
        </div>
    </header>
  )
}
