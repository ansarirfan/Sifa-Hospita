import { createContext, useState } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'
export const DoctorContext = createContext() 

const DoctorContextProvider = (props)=>{

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [dToken, setDToken] = useState(localStorage.getItem('dToken') ? localStorage.getItem('dToken') : "")
    const [appointments, setAppointments] = useState([])
    const [dashData, setDashdata] = useState(false)
    const [profileData, setProfileData] = useState(false)

    const getAppointments = async()=>{
        try {
            console.log("Current dToken:", dToken); // Remove doctorId reference
            const {data} = await axios.get(backendUrl + '/api/doctor/appointments', {headers:{dtoken: dToken}})
             console.log("Appointments API Response:", data); // Debug log
            if (data.success) {
                setAppointments(data.appointments)
                console.log(data.appointments)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
    
    //appointment completed
    const completeAppointment = async(appointmentId)=>{
        try {
             const {data} = await axios.post(backendUrl + '/api/doctor/complete-appointment', {appointmentId}, {headers:{dtoken: dToken}})
             if (data.success) {
                toast.success(data.message)
                getAppointments()
             }else{
                toast.error(data.message)
             }
        } catch (error) {
             console.log(error)
            toast.error(error.message)
        }
    }

//appointment cancelled
    const cancelAppointment = async(appointmentId)=>{
        try {
             const {data} = await axios.post(backendUrl + '/api/doctor/cancel-appointment', {appointmentId}, {headers:{dtoken: dToken}})
             if (data.success) {
                toast.success(data.message)
                getAppointments()
             }else{
                toast.error(data.message)
             }
        } catch (error) {
             console.log(error)
            toast.error(error.message)
        }
    }
  
    //dash data
    const getDashdata = async()=>{
        
        try {
            const {data} = await axios.get(backendUrl + '/api/doctor/dashboard', {headers:{dtoken: dToken}})
             if (data.success) {
                 setDashdata(data.dashData)
                console.log(data.dashData)
             }else{
                toast.error(data.message)
             }
        } catch (error) {
             console.log(error)
            toast.error(error.message)
        }
    }

    // get profile data

    const getProfileData = async () =>{
        try {
            const {data} = await axios.get(backendUrl + '/api/doctor/profile', {headers:{dtoken: dToken}})
             if (data.success) {
                 setProfileData(data.profileData)
                console.log(data.profileData)
             }else{
                toast.error(data.message)
             }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    } 



    const value = {dToken,setDToken,backendUrl,appointments, 
        setAppointments,getAppointments, cancelAppointment, completeAppointment, dashData,
         setDashdata, getDashdata, profileData, setProfileData, getProfileData
         }

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider