import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const About = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>ABOUT <span className='text-gray-700 font-medium'>US</span></p>
      </div>

      <div className='my-10 flex flex-col gap-12 md:flex-row'>
        <img className='w-full md:max-w-[360px]' src={assets.about_image} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
          <p>Welcome to ShiphaHospital, your trusted partner in managing your healthcare needs conveniently and efficiently. At ShiphaHospital, we understand the challenges individuals faces when it comes to scheduling doctors appointment and managing their health records. </p>
          <p>ShiphaHospital is committed  to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements  to  improve our experience and deliver superior service. Whether you're booking our first appointment or managing ongoing care, ShiphaHospital is here to support you on every step on the way. </p>
          <b className='text-gray-800'>Our Vision</b>
          <p>Our vision at ShiophaHospital is to create a seamless healthcare experience for every users. Our aim to bridge the gap between patient and healthcare providers, making it easier for you to access the service when you need it,</p>
        </div>
      </div>

      <div className='text-xl my-4'>
        <p>WHY <span className='text-gray-700 font-semibold'>CHOOSE US</span> </p>
      </div>
      <div className='flex flex-col md:flex-row mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
         <b>Efficiency:</b>
         <p>Streamline appointment scheduling that fits into  your busy lifestyle.</p>
        </div>
        <div  className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
         <b>Convenience:</b>
         <p> Access to network of trusted healthcare professional in your area.</p>
        </div>
        <div  className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
         <b>Personalization:</b>
         <p>Tailored recommendations reminder to help you stay on top of your health.</p>
        </div>
      </div>
    </div>
  )
}

export default About
