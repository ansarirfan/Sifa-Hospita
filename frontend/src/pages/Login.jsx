import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import{useNavigate} from 'react-router-dom'

const Login = () => {
   const {backendUrl, token, setToken} = useContext(AppContext)
  const [state, setState] = useState('Sign Up')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const navigate = useNavigate()

  const onHandlesubmit = async (e)=>{
     e.preventDefault();
     try {
      if (state === 'Sign Up') {
        const {data} = await axios.post(backendUrl + '/api/user/register', {name, email, password})
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        }else{
          toast.error(error.message)
        }
      }else{
        const {data} = await axios.post(backendUrl + '/api/user/login', {email, password})
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        }else{
          toast.error(error.message)
        }
      }
     } catch (error) {
      toast.error(error.message)
     }
  }
  

   useEffect(()=>{
    if (token) {
      navigate('/')
    }
   },[token])

  return (
    <form onSubmit={onHandlesubmit} className='min-h-[80vh] flex items-center'>
       <div className='flex flex-col items-start gap-3 m-auto p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 shadow-lg'>
        <p className='text-2xl font-semibold'> {state === 'Sign Up' ? 'Create Account' : 'Login'}</p>
        <p>Please {state === 'Sign Up' ? 'sign up' : "login"}  to book appointment</p>
        {
          state === 'Sign Up' && <div className='w-full'>
          <p>Full Name</p>
          <input className='border border-zinc-300 rounded w-full mt-1 p-2'  type="text" value={name} placeholder='your name' onChange={(e)=>setName(e.target.value)} />
        </div>
        }
        
        <div className='w-full'>
          <p>Email</p>
          <input className='border border-zinc-300 rounded w-full mt-1 p-2'  type="email" value={email} placeholder='your email' onChange={(e)=>setEmail(e.target.value)} />
        </div>
        
        <div className='w-full'>
          <p>Password</p>
          <input className='border border-zinc-300 rounded w-full mt-1 p-2' type="password" value={password} placeholder='your password' onChange={(e)=>setPassword(e.target.value)} />
        </div>
        <button type='submit' className='w-full text-white bg-primary py-2 rounded-md text-base'> {state === 'Sign Up' ? 'Create Account' : 'Login'}</button>
        {
          state === "Sign Up" ? <p>Already have an account   <span onClick={()=>setState("Login")} className='text-red-600 underline cursor-pointer'>Login</span></p>
          : <p>Create an new account <span onClick={()=>setState("Sign Up")} className='text-red-600 underline cursor-pointer'>Sign Up</span></p>
        }
       </div>
    </form>
  )
}

export default Login
