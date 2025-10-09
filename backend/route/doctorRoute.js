import express from 'express'
import { doctorList, loginDoctor,appointmentsDoctor,resetDoctorPassword, appointmentComplete, appointmentCancel, doctorDashboard, doctorProfile, updateDoctorProfile } from '../controllers/doctorController.js'
import docAuth from '../middleware/authDoctor.js'

const doctorRouter = express.Router()

doctorRouter.get('/list', doctorList)
doctorRouter.post('/login',  loginDoctor)

// Add to your doctor routes
doctorRouter.post('/reset-password', resetDoctorPassword);
doctorRouter.get('/appointments',docAuth,  appointmentsDoctor)
doctorRouter.post('/complete-appointment',docAuth,  appointmentComplete)
doctorRouter.post('/cancel-appointment',docAuth,  appointmentCancel)
doctorRouter.get('/dashboard',docAuth,  doctorDashboard)
doctorRouter.get('/profile',docAuth,  doctorProfile)
doctorRouter.post('/update-profile' , docAuth, updateDoctorProfile)

export default doctorRouter