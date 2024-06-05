import React from 'react'
import { FaRegBell } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
const Navbar = () => {
  return (
    <header className='flex justify-between items-center bg-green-500 px-4 sm:px-24 py-2'>
          <h1 className='text-white text-xl sm:text-2xl md:text-3xl relative h-full font-bold ' id='logo'><span className=" ">AutoCricket</span> <span className='font-normal'>Scorer</span></h1>
           
           <div className='flex gap-8'>
                <button className='text-white text-lg '><FaRegBell /></button>
                <button className='text-white text-lg '><IoSettingsOutline /></button>
           </div>
        
           
        </header>
  )
}

export default Navbar