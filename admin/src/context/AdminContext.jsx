import { createContext, useState } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'



export const AdminContext = createContext() 

 export const AdminContextProvider = (props)=>{
    const [doctors, setDoctors] = useState([])
    const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : "")
    const [appointments, setAppointments] = useState([])
    const [dashData, setDashData] = useState({
          doctors: 0,
          appointments: 0,
          patients: 0,
          latestAppointments: []})
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    // get all doctors list
    const getAllDoctors = async ()=>{
        try {
            const {data} = await axios.post(backendUrl + '/api/admin/all-doctor', {}, {headers: {aToken}});
            if(data.success){
                setDoctors(data.doctors)
                console.log(data.doctors);
                
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    // updata available
    const changeAvailability = async (docId)=>{
      try {
        const {data} = await axios.post(backendUrl +  '/api/admin/change-availability', {docId}, {headers: {aToken}})
       if (data.success) {
       toast.success(data.message)
       getAllDoctors()
       }else{
        toast.success(data.error)
       }
      } catch (error) {
        toast.success(data.error)
      }
    }
    // get all appointment list
    const getAllappointment = async() =>{
        try {
            const {data} = await axios.get(backendUrl + '/api/admin/appointments',{headers: {aToken}})
            if (data.success) {
                setAppointments(data.appointments)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.success(data.error)
        }
    }

    const cancelAppointment = async (appointmentId)=>{
        try {
            const {data} = await axios.post(backendUrl + '/api/admin/cancel-appointment', {appointmentId}, {headers: {aToken}})
            if (data.success) {
                toast.success(data.message)
                getAllappointment()
            }else{
                toast.error(data.error) 
            }
        } catch (error) {
            toast.error(data.error) 
        }
    }

    // dash data
    const getDashData = async ()=>{
      try {
        const {data} = await axios.get(backendUrl + '/api/admin/dashboard', {headers: {aToken}})
        if (data.success) {
            setDashData(data.dashData)
            console.log(data.dashData )
        }else{
            toast.error(data.message)
        }
      } catch (error) {
        toast.error(data.error)
      }
    }

    const value = {
        aToken, setAToken,
        backendUrl, doctors, getAllDoctors, changeAvailability,appointments,setAppointments, getAllappointment, cancelAppointment, getDashData, dashData 
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

// export default AdminContextProvider