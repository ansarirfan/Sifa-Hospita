import React, { useContext, useEffect, useState} from 'react'
// import { useNavigate } from 'react-router-dom'  // Correct import
import {AppContext} from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'



// const Myappointment = () => {
//   const {backendUrl, token, getDoctorsData} = useContext(AppContext)
//    const [appointments, setAppointment] = useState([])
//    const months = [' ','Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
   
//    const slotDateFormate = (slotDate) =>{
//     const dateArray = slotDate.split('_')
//     return dateArray[0]+ " " + months[Number(dateArray[1])]+ " " +dateArray[2]
//    }

//   //  const navigate = useNavigate()

//     const getUserAppointment = async () =>{
//       try {
//         const {data} =  await axios.get(backendUrl + '/api/user/appointments', {headers: {token}})
//         console.log(data);
//         if (data.success) {
//           setAppointment(data.appointment.reverse())
//           console.log(data.appointments);
          
//         }
//       } catch (error) {
//         console.log(error);
//         toast.error(error.message)
        
//       }
//     }

//      // cancel appointment
//      const cancelAppointment = async(appointmentId) =>{
//        try {
//         const {data} =  await axios.post(backendUrl + '/api/user/cancel-appointment', {appointmentId}, {headers: {token}})
//         if (data.success) {
//           toast.success(data.message)
//           getUserAppointment()
//           getDoctorsData()
//         }else{
//           toast.error(data.message)
//         }
        
//        } catch (error) {
//         console.log(error);
//         toast.error(error.message)
//        }
//      }

//       //  const initPay =async (order)=>{
//       //     const options = {
//       //       key:import.meta.env.VITE_RAZORPAY_KEY_ID,
//       //       amount:order.amount,
//       //       currency: order.currency,
//       //       name:"Appointment Payment",
//       //       description:'Appointment Payment',
//       //       order_id: order.id,
//       //       order_receipt:order.receipt,
//       //       handler: async(response)=>{
//       //         //console.log(response);

//       //         try {
//       //           const {data} =  await axios.post(backendUrl + '/api/user/razorPayment', {response}, {headers: {token}})
//       //           if (data.success) {
//       //             getUserAppointment()
//       //             navigate("/my-appointment")
//       //           }
//       //         } catch (error) {
//       //            console.log(error);
//       //            toast.error(error.message)
//       //         }
              
//       //       }
//       //     }
//       //     const rzp = new window.Razorpay(options)
//       //     rzp.open()
//       //  }


//      // razor payment
//     //  const apointmentPayment = async(appointmentId)=>{
//     //   try {
//     //     const {data} =  await axios.post(backendUrl + '/api/user/cancel-appointment', {appointmentId}, {headers: {token}})
//     //     if (data.success) {
//     //    initPay(data.order)
        
//     //   }else{
//     //     toast.error(data.message)
//     //   }
//     //   } catch (error) {
//     //     console.log(error);
//     //   toast.error(error.message)
//     //   }
//     //  }
     
//     useEffect(()=>{
//        if (token) {
//         getUserAppointment()
//        }
//     }, [token])



//   return (
//     <div>
//       <p>My Appointments</p>
//       <div>
//         {
//           appointments.map((item, index) =>(
//             <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
//              <div >
//               <img className='w-32 bg-indigo-50' src={item.docData.image} alt="" />
//              </div>
//              <div className='flex-1 text-sm text-zinc-600'>
//               <p className='text-natural font-semibold'>{item.docData.name}</p>
//               <p>{item.docData.speciality }</p>
//               <p className='text-zinc-700 font-medium mt-1'>Address:</p>
//               <p className='text-xs'>{item.docData.address.line1}</p>
//               <p className='text-xs'>{item.docData.address.line2}</p>
//               <p className='text-xs mt-1'><span className='text-sm text-neutral-700 font-medium'>Date & Time</span> {slotDateFormate(item.slotDate)} | {item.slotTime}</p>
//              </div>
//              <div></div>
//              <div className='flex flex-col gap-2 justify-end'>
//               {!item.cancelled && item.payment && <button className='sm:min-w-48 py-2 border text-stone-500 bg-indigo-50' >Paid</button>}
//               {!item.cancelled && !item.payment && <button onClick={()=>apointmentPayment(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-green-400 hover-text-black transition-all-300'>Pay Online</button>}
//               {!item.cancelled && <button onClick={()=>cancelAppointment(item._id)} className='text-sm text-white text-center sm:min-w-48 py-2 border hover:bg-red-600 hover:text-white transition-all-300'>Cancel Appointment</button>}
//              {item.cancelled && <button className='sm:min-w-48 py-2 border border-red-500 rounded  text-red-500'>Appointment Cancelled</button>}
//              </div>
//             </div>
//           ))
//         }
//       </div>
//     </div>
//   )
// }

// export default Myappointment




const Myappointment = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext)
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(false)
  const months = [' ', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  const slotDateFormate = (slotDate) => {
    if (!slotDate) return 'Date not available'
    const dateArray = slotDate.split('_')
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
  }

  const getUserAppointment = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })
      console.log("API Response:", data)
      
      if (data.success) {
        // Fix: Check if data.appointment exists and is an array
        const appointmentsData = data.appointment || data.appointments || []
        setAppointments(appointmentsData.reverse())
      } else {
        toast.error(data.message || "Failed to fetch appointments")
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || error.message)
    } finally {
      setLoading(false)
    }
  }

  // cancel appointment
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + '/api/user/cancel-appointment', 
        { appointmentId }, 
        { headers: { token } }
      )
      
      if (data.success) {
        toast.success(data.message)
        
        // Update local state immediately instead of refetching
        setAppointments(prevAppointments => 
          prevAppointments.map(app => 
            app._id === appointmentId 
              ? { ...app, cancelled: true } 
              : app
          )
        )
        
        getDoctorsData() // If needed for other parts of the app
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || error.message)
    }
  }

  useEffect(() => {
    if (token) {
      getUserAppointment()
    }
  }, [token])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading appointments...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <p className="text-2xl font-bold mb-6">My Appointments</p>
      
      {appointments.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          No appointments found
        </div>
      ) : (
        <div>
          {appointments.map((item, index) => (
            <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-4 border-b' key={item._id || index}>
              <div>
                <img 
                  className='w-32 h-32 object-cover bg-indigo-50 rounded' 
                  src={item.docData?.image} 
                  alt={item.docData?.name || 'Doctor'} 
                />
              </div>
              
              <div className='flex-1 text-sm text-zinc-600'>
                <p className='text-natural font-semibold'>{item.docData?.name || 'Unknown Doctor'}</p>
                <p>{item.docData?.speciality || 'No speciality'}</p>
                <p className='text-zinc-700 font-medium mt-1'>Address:</p>
                <p className='text-xs'>{item.docData?.address?.line1 || 'Address not available'}</p>
                <p className='text-xs'>{item.docData?.address?.line2 || ''}</p>
                <p className='text-xs mt-1'>
                  <span className='text-sm text-neutral-700 font-medium'>Date & Time: </span> 
                  {slotDateFormate(item.slotDate)} | {item.slotTime || 'Time not available'}
                </p>
              </div>
              
              <div className='flex flex-col gap-2 justify-end'>

                {item.isComplete && <button className='sm:min-w-48 border border-green-500 rounded text-green-500'> Completed</button>}
                {item.cancelled && !item.isComplete &&(
                  <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>
                    Appointment Cancelled
                  </button>
                )}
                
                {!item.cancelled && item.payment && !item.isComplete &&(
                  <button className='sm:min-w-48 py-2 border text-stone-500 bg-indigo-50 rounded'>Paid</button>
                )}
                
                {!item.cancelled && !item.payment && !item.isComplete &&(
                  <button 
                    className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-green-400 hover:text-black transition-all duration-300 rounded'
                    disabled
                  >
                    Pay Online
                  </button>
                )}
                
                {!item.cancelled && !item.isComplete &&(
                  <button 
                    onClick={() => cancelAppointment(item._id)} 
                    className='text-sm text-white bg-red-500 text-center sm:min-w-48 py-2 border hover:bg-red-600 hover:text-white transition-all duration-300 rounded'
                  >
                    Cancel Appointment
                  </button>
                )}
                
                
                
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Myappointment