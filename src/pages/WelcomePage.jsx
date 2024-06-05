import React from 'react'
import './WelcomePage.css'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
const WelcomePage = () => {
    const navigate=useNavigate();
    useGSAP(()=>{
        gsap.to('#logo',{
            // delay:1,
            scale:2,
            duration:3,
            ease:'power2.out'

        })
        gsap.to('#startBtn',{
            delay:2,
            opacity:1,

        })
        
    },[])
  return (
    
        <div className='w-full flex-center min-h-full relative '>
            <h1 className=' custom text-lg sm:text-2xl md:text-3xl relative h-full top-[-20px] scale-[0]' id='logo'><span className="text-gradient ">AutoCricket</span> Scorer</h1>
            
            <button onClick={()=>{navigate('/newMatch')}} className='absolute mt-24 opacity-0 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded' id='startBtn'>Start A New Match</button>
        </div>

    
  

  )
}

export default WelcomePage