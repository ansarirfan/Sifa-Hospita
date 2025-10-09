// import React from 'react'
// import { useContext } from 'react'
// import { DoctorContext } from '../../context/DoctorContext'
// import { useEffect } from 'react'
// import { AppContext } from '../../context/AppContext'
// import { assets } from '../../assets/assets'

// const DoctorAppointment = () => {
//   const {dToken, appointments, getAppointments,cancelAppointment,completeAppointment} = useContext(DoctorContext)
//   const{calculateAge, slotDateFormate,currency} = useContext(AppContext)

//   useEffect( ()=>{
//     if (dToken) {
//       getAppointments()
//     }
//   },[dToken])


//   return (
//     <div className='w-full max-w-6xl m-5'>
//       <p className='mb-3 text-lg font-medium'>All Appointment</p>
//       <div className='bg-white border rounded text-sm max-[80vh] min-[50vh] overflow-y-scroll'>
//        <div  className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-bottom'>
//          <p>#</p>
//         <p>Patient</p>
//         <p>Payment</p>
//         <p>Age</p>
//         <p>Date & Time </p>
//         <p>Fees</p>   
//         <p>Action</p>
//        </div>
//        {
//         appointments.reverse().map((item, index)=>(
//           <div className='flex flex-wrap justify-between max-s:-gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50' key={index}>
//             <p className='max-sm:hidden'>{index+1}</p>
//             <div className='flex items-center gap-2'>
//               <img className='w-8 rounded-full' src={item.userData.image} alt="" /> <p>{item.userData.name}</p>
//             </div>
//             <div>
//               <p className='text-xs inline border border-primary px-2 rounded-full'>
//                 {item.payment? 'Online': 'Cash'}
//               </p>
//             </div>
//             <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
//             <p>{slotDateFormate(item.slotDate)}, {item.slotTime}</p>
           
//              <p>{currency} {item.amount}</p>
//             {
//               item.cancelled ? <p className="text-red-400 text-xs font-medium">Cancelled</p> 
//               : item.isComplete ? <p className="text-green-400 text-xs font-medium">Completed</p>
//                :  <div className='flex'>
//               <img onClick={()=>cancelAppointment(item._id)} className='w-10  cursor-pointer' src={assets.cancel_icon} alt="" />
//               <img onClick={()=>completeAppointment(item._id)} className='w-10 cursor-pointer'  src={assets.tick_icon} alt="" />
//             </div>       
//              }
           
           
//           </div>
//         ))
//        }
//       </div>
//     </div>
//   )
// }

// export default DoctorAppointment

import React from 'react'
import { useContext } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { useEffect } from 'react'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const DoctorAppointment = () => {
  const {dToken, appointments, getAppointments,cancelAppointment,completeAppointment} = useContext(DoctorContext)
  const{calculateAge, slotDateFormate,currency} = useContext(AppContext)

  useEffect( ()=>{
    if (dToken) {
      getAppointments()
    }
  },[dToken])


  return (
    <div className='w-full max-w-6-xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointment</p>
      <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-auto'>
       {/* Desktop Headers - Hidden on mobile */}
       <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b'>
         <p>#</p>
         <p>Patient</p>
         <p>Payment</p>
         <p>Age</p>
         <p>Date & Time</p>
         <p>Fees</p>   
         <p>Action</p>
       </div>
       
       {/* Appointment Items */}
       {
        appointments.reverse().map((item, index)=>(
          <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-3 sm:gap-1 items-center text-gray-500 py-4 px-6 border-b hover:bg-gray-50' key={index}>
            
            {/* Serial Number - Hidden on mobile */}
            <p className='max-sm:hidden text-center'>{index+1}</p>
            
            {/* Patient Info */}
            <div className='flex items-center gap-2'>
              <img className='w-8 h-8 rounded-full object-cover' src={item.userData.image} alt={item.userData.name} />
              <p className='font-medium'>{item.userData.name}</p>
            </div>
            
            {/* Payment Method */}
            <div className='flex flex-col sm:block'>
              <span className='text-xs font-medium sm:hidden'>Payment:</span>
              <p className={`text-xs inline border px-2 py-1 rounded-full ${
                item.payment ? 'border-green-500 text-green-600' : 'border-yellow-500 text-yellow-600'
              }`}>
                {item.payment ? 'Online' : 'Cash'}
              </p>
            </div>
            
            {/* Age - Hidden on mobile */}
            <div className='max-sm:hidden text-center'>
              <p>{calculateAge(item.userData.dob)}</p>
            </div>
            
            {/* Date & Time */}
            <div className='flex flex-col'>
              <span className='text-xs font-medium sm:hidden'>Date & Time:</span>
              <p>{slotDateFormate(item.slotDate)}, {item.slotTime}</p>
            </div>
            
            {/* Fees */}
            <div className='flex flex-col'>
              <span className='text-xs font-medium sm:hidden'>Fees:</span>
              <p className='font-semibold'>{currency} {item.amount}</p>
            </div>
            
            {/* Actions */}
            <div className='flex flex-col sm:block'>
              <span className='text-xs font-medium sm:hidden'>Action:</span>
              {item.cancelled ? (
                <p className="text-red-500 text-xs font-medium py-1">Cancelled</p>
              ) : item.isComplete ? (
               <p className="text-green-500 text-xs font-medium py-1">Completed</p>
              ) : (
                <div className='flex gap-2 justify-start sm:justify-center py-1'>
                  <button 
                    onClick={() => cancelAppointment(item._id)}
                    className='w-8 h-8 flex items-center justify-center bg-red-50 hover:bg-red-100 rounded-full transition-colors cursor-pointer'
                    title='Cancel Appointment'
                  >
                    <img className='w-4 h-4' src={assets.cancel_icon} alt="Cancel" />
                  </button>
                  <button 
                    onClick={() => completeAppointment(item._id)}
                    className='w-8 h-8 flex items-center justify-center bg-green-50 hover:bg-green-100 rounded-full transition-colors cursor-pointer'
                    title='Complete Appointment'
                  >
                    <img className='w-4 h-4' src={assets.tick_icon} alt="Complete" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))
       }
      </div>
    </div>
  )
}

export default DoctorAppointment