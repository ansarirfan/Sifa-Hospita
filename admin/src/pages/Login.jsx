import React, { useContext, useState } from 'react'
import {assets} from "../assets/assets"
import axios from "axios"
import { AdminContext } from '../context/AdminContext'
import { toast } from 'react-toastify'
import { DoctorContext } from '../context/DoctorContext'

const Login = () => {
  const {setAToken, backendUrl } = useContext(AdminContext);
  const {setDToken} = useContext(DoctorContext)
  const [state, setState] = useState("Admin")
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submitHandler = async (event)=>{
    event.preventDefault();
    try {
      if (state === 'Admin') {
        const {data} = await axios.post(backendUrl+'/api/admin/login',{email, password})
        if (data.success) {
         localStorage.setItem('aToken',data.token);
         setAToken(data.token)
         toast.success('Login successful!');
        //  console.log(data.token)
        }else{
        toast.error(data.message || 'Invalid credentials')
        
        }
        
      }else{
       const {data} = await axios.post(backendUrl + '/api/doctor/login', {email, password})
       if (data.success) {
         localStorage.setItem('dToken',data.token);
          localStorage.setItem('doctorId', data.doctorId); // Store doctor ID
         setDToken(data.token)
         toast.success('Login successful!');
         console.log("Logged in as doctor:", data.token)
        }else{
        toast.error(data.message || 'Invalid credentials')
        
        }
      } 
     
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <form onSubmit={submitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg '>
        <p className='text-2xl m-auto font-semibold'> <span className='text-primary'> {state} </span> Login</p>
      
      <div className='w-full'>
        <p>Email</p>
        <input onChange={(e)=>setEmail(e.target.value)}  value={email} className='w-full border border-[#dadada] rounded p-2 mt-1' type="email" required />
      </div>
      <div className='w-full'>
        <p>Password</p>
        <input onChange={(e)=>setPassword(e.target.value)}  value={password}  className='w-full border border-[#dadada] rounded p-2 mt-1' type="password" required />
      </div>
      <button  className='bg-primary w-full text-white py-2 rounded text-base'>Login</button>
      {
        state === 'Admin' 
        ? <p>Doctor Login? <span className='text-red-500 underline cursor-pointer' onClick={()=>setState('Doctor')}> Click Here </span></p> 
        : <p>Admin Login? <span className='text-red-500 underline cursor-pointer' onClick={()=>setState('Admin')}>Click Here</span></p>
      }
      </div>
    </form>
  )
}

export default Login

// import { assets } from "../assets/assets"
// import axios from "axios"
// import { AdminContext } from '../context/AdminContext'
// import { toast } from 'react-toastify'
// import { DoctorContext } from '../context/DoctorContext'

// const Login = () => {
//   const { setAToken, backendUrl } = useContext(AdminContext);
//   const { setDToken, setDoctor } = useContext(DoctorContext)
//   const [state, setState] = useState("Admin")
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [loading, setLoading] = useState(false)

//   const submitHandler = async (event) => {
//     event.preventDefault();
//     setLoading(true);
    
//     try {
//       if (state === 'Admin') {
//         const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password })
//         if (data.success) {
//           localStorage.setItem('aToken', data.token);
//           setAToken(data.token)
//           toast.success('Admin login successful!');
//         } else {
//           toast.error(data.message || 'Invalid credentials')
//         }
//       } else {
//         const { data } = await axios.post(backendUrl + '/api/doctor/login', { email, password })
//         if (data.success) {
//           localStorage.setItem('dToken', data.token);
//           setDToken(data.token)
//           setDoctor(data.doctor) // Set doctor info in context
//           toast.success('Doctor login successful!');
//         } else {
//           toast.error(data.message || 'Invalid credentials')
//         }
//       }
//     } catch (error) {
//       console.log(error);
//       if (error.response && error.response.data && error.response.data.message) {
//         toast.error(error.response.data.message);
//       } else {
//         toast.error('Login failed. Please try again.');
//       }
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <form onSubmit={submitHandler} className='min-h-[80vh] flex items-center'>
//       <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg '>
//         <p className='text-2xl m-auto font-semibold'> <span className='text-primary'> {state} </span> Login</p>
      
//         <div className='w-full'>
//           <p>Email</p>
//           <input 
//             onChange={(e) => setEmail(e.target.value)}  
//             value={email} 
//             className='w-full border border-[#dadada] rounded p-2 mt-1' 
//             type="email" 
//             required 
//           />
//         </div>
//         <div className='w-full'>
//           <p>Password</p>
//           <input 
//             onChange={(e) => setPassword(e.target.value)}  
//             value={password}  
//             className='w-full border border-[#dadada] rounded p-2 mt-1' 
//             type="password" 
//             required 
//           />
//         </div>
//         <button 
//           disabled={loading}
//           className='bg-primary w-full text-white py-2 rounded text-base disabled:opacity-50'
//         >
//           {loading ? 'Logging in...' : 'Login'}
//         </button>
//         {
//           state === 'Admin' 
//           ? <p>Doctor Login? <span className='text-red-500 underline cursor-pointer' onClick={() => setState('Doctor')}> Click Here </span></p> 
//           : <p>Admin Login? <span className='text-red-500 underline cursor-pointer' onClick={() => setState('Admin')}>Click Here</span></p>
//         }
//       </div>
//     </form>
//   )
// }

// export default Login