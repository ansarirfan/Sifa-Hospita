import express from 'express'
import { getProfile, loginUser, registerUser, updateProfile, bookAppointment, listAppointment, cancelAppoint,} from '../controllers/userController.js'
import userAuth from '../middleware/userAuth.js'
import upload from "../middleware/multer.js";


const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/get-profile', userAuth , getProfile)
userRouter.post('/update-profile', upload.single("image"), userAuth, updateProfile);
userRouter.post('/book-appointment', userAuth, bookAppointment)
userRouter.get('/appointments', userAuth, listAppointment)
userRouter.post('/cancel-appointment', userAuth, cancelAppoint)
//userRouter.post('/payment-razorpay', userAuth, paymentRazorpay)   **paymentRazorpay i have not create account on razorpay
//userRouter.post('/veryfyRazorpay', userAuth, verifyPayment)      **paymentRazorpay i have not create account on razorpay



export default userRouter