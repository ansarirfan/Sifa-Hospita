import React, { useContext } from 'react'
import {NavLink} from 'react-router-dom'
import { AdminContext } from '../context/AdminContext'
import { assets } from '../assets/assets'
import { DoctorContext } from '../context/DoctorContext'




const Sidebar = () => {
    const {aToken} = useContext(AdminContext)
    const {dToken} = useContext(DoctorContext)
  return (
    <div className='min-h-screen bg-white border-r'>
     {
       aToken && <ul className='text-[#515151] mt-5'>
        <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#f2f3ff] border-r-4 border-primary" : ""}`} to={'/admin-dashboard'}>
            <img src={assets.home_icon} alt="home" />
            <p className='hidden md:block'>Dashboard</p>
        </NavLink >
        
        <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#f2f3ff] border-r-4 border-primary" : ""}`}  to={'/all-appointments'}>
            <img src={assets.appointment_icon} alt="home" />
            <p className='hidden md:block'>Appointment</p>
        </NavLink>
        <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#f2f3ff] border-r-4 border-primary" : ""}`} to={'/add-doctor'}>
            <img src={assets.add_icon} alt="home" />
            <p className='hidden md:block'>Add Doctor</p>
        </NavLink>
        <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#f2f3ff] border-r-4 border-primary" : ""}`} to={'/doctor-list'}>
            <img src={assets.people_icon} alt="home" />
            <p className='hidden md:block'>Doctor List</p>
        </NavLink>
       </ul>
     }

     {
       dToken && <ul className='text-[#515151] mt-5'>
        <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#f2f3ff] border-r-4 border-primary" : ""}`} to={'/doctor-dashboard'}>
            <img className="w-5 h-5 md:w-6 md:h-6"  src={assets.home_icon} alt="home" />
            <p className='hidden md:block'>Dashboard</p>
        </NavLink >
        
        <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#f2f3ff] border-r-4 border-primary" : ""}`}  to={'/doctor-appointments'}>
            <img src={assets.appointment_icon} alt="home" />
            <p className='hidden md:block'>Appointment</p>
        </NavLink>
        
        <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#f2f3ff] border-r-4 border-primary" : ""}`} to={'/doctor-profile'}>
            <img src={assets.people_icon} alt="home" />
            <p className='hidden md:block'>Profile</p>
        </NavLink>
       </ul>
     }
    </div>
  )
}

export default Sidebar
