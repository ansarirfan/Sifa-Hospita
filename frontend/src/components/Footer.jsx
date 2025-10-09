import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
        {/* ------left----- */}
        {/* <div className='flex flex-col sm:grid grid-cols-[3fr_1fr-1fr] gap-14 my-10 mt-40 text-sm'> */}
        <div className='sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm flex flex-col sm:flex-row'>

         <div>
         <img className='mb-5 w-40' src={assets.logo} alt="" />
         <p className='w-full md:w-2/3 text-gray-600 leading-6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum cum atque neque quae dignissimos exercitationem incidunt nam nisi nobis ab fugit, nostrum qui consequatur, eius sapiente natus, maxime reiciendis est.</p>
         </div>
       
        {/* ------mid----- */}
        <div>
         <p className='text-xl font-medium mb-5'>COMPANY</p>
         <ul className='flex flex-col gap-2 text-gray-500'>
            <li>Home</li>
            <li>About us</li>
            <li>Contact us</li>
            <li>Privacy & Policy</li>
         </ul>
        </div>
        {/* ------right----- */}
        <div>
        <p className='text-xl font-medium mb-5'>Get In Touch</p>
         <ul className='flex flex-col gap-2 text-gray-500'>
            <li>+91 00 25 366152</li>
            <li>shifahospital@gmai.com</li>
            <li className='text-red-600'>with &#10084; Dev. Irfan</li>
         </ul>
         </div>
        </div>
        {/* ----copyright---- */}
        <div>
            <hr />
            <p className='py-5 text-sm text-center'>Copyright 2024@ ShifaHospital - All right reserved.</p>
        </div>
        
    </div>
  )
}

export default Footer
