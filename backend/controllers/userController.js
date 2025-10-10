import validator from 'validator'
const bcrypt = require('bcryptjs');
import userModel from '../models/userModels.js'
import jwt from 'jsonwebtoken'
import {v2 as cloudinary} from 'cloudinary'
import appointmentModel from '../models/appointmentModel.js'
import doctorModel from '../models/doctorsModels.js'
// import razorpay from 'razorpay'
//import payments from 'razorpay/dist/types/payments.js'

const registerUser = async (req, res)=>{
    try {
       const {name, email, password} = req.body;
       if (!name || !email || !password) {
         return res.json({success:false, message:"Missing Details"})
       }
       

       // email checking
       if (!validator.isEmail(email)) {
        return res.json({success:false, message:"Enter a valid email"})
       }

       // password checking
       if (password.length < 8) {
        return res.json({success:false, message:"Enter a strong password"})
       }

       // hashed password
       const salt = await bcrypt.genSalt(10)
       const hashedPass = await bcrypt.hash(password, salt)

       const userData = {
          name, email, password:hashedPass
       }

       const newUser = new userModel(userData)
       const user = await newUser.save()

       // to get token
       const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)
       res.json({success:true, token})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})  
    }
}

// login user

const loginUser = async (req, res) =>{
    try {
        const {email, password} = req.body;

        const user = await userModel.findOne({email});
        if (!user) {
           return res.json({success:true, message:'user does not exist!'})

        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)
            res.json({success:true, token})
        }else{
            res.json({success:true, message:'Invalid credentials!'})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})  
    }
}

// api to get user data

const getProfile = async (req, res) =>{
    try {
       const {userId} = req.body 
       const userData = await userModel.findById(userId).select('-password')
      
        return res.json({ success: true, userData});
    

     }catch(error) {
        console.log(error);
        res.json({success:false, message:error.message})  
    }
}



//api to update user profile 

const updateProfile = async (req, res) => {
    try {
        const { userId, name, phone, address, dob, gender } = req.body;
        const imageFile = req.file; // Multer should populate this
        console.log(req.body)

        console.log("File received:", imageFile); // Debugging

        // Ensure file exists
        if (!imageFile) {
            return res.status(400).json({ success: false, msg: "Image file is missing" });
        }

        // Validate required fields
        if (!name || !phone || !dob || !gender) {
            return res.json({ success: false, message: 'Required fields are missing' });
        }

        // Parse address safely
        let parsedAddress;
        if (typeof address === 'string') {
            try {
                parsedAddress = JSON.parse(address);
            } catch (parseError) {
                return res.json({ success: false, message: 'Invalid address format' });
            }
        } else {
            parsedAddress = address;
        }

        // Upload image to Cloudinary
        const result = await cloudinary.uploader.upload(imageFile.path, {
            resource_type: 'image'
        });
        
        console.log("Cloudinary upload result:", result); // Debugging
        
        if (!result || !result.secure_url) {
            return res.json({ success: false, message: "Image upload failed" });
        }
            const imageURL = result.secure_url;

            // Update user profile
            await userModel.findByIdAndUpdate(userId, {
                name,
                phone,
                address: parsedAddress,
                dob,
                gender,
                image: imageURL
            });

            return res.json({ success: true, message: 'Profile updated successfully' });
        }catch (error) {
        console.error(error);
        return res.json({ success: false, message: error.message });
    }
};


//api to book appointment

const bookAppointment = async (req, res) =>{
    try {
        const {userId, docId, slotDate, slotTime } = req.body

        const docData = await doctorModel.findById(docId).select('-password')
        if (!docData.available) {
            return res.json({success:true, message:'Doctor not available'})
        }
        let slots_booked = docData.slots_booked;

        // check for slot availability
        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({success:false, message:'Slot not available'})
            }else{
                slots_booked[slotDate].push(slotTime)
            }
        }else{
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }

        const userData = await userModel.findById(userId).select('-password')
        delete docData.slots_booked

        const appointmentData = {
            userId,
            docId,
            userData, 
            docData,
            amount:docData.fees,
            slotTime,
            slotDate,
            date: Date.now()
        }

        const newAppointment = new appointmentModel(appointmentData)
        await newAppointment.save()

        // save new slots data in docdata

        await doctorModel.findByIdAndUpdate(docId,{slots_booked})
        res.json({success:true, message:'Appointment Booked !'})
         
    } catch (error) {
        console.error(error);
        return res.json({ success: false, message: error.message });
    }
}


  // api to get user appointments for frontend my-appointment page
    const listAppointment = async (req, res) =>{
        try {
            const {userId} = req.body
            const appointment = await appointmentModel.find({userId})
            res.json({success:true, appointment})
        } catch (error) {
            console.error(error);
           return res.json({ success: false, message: error.message });
        }
    }

    // api to cancel appointment 

    const cancelAppoint = async (req, res) =>{
        try {
            const {userId, appointmentId} = req.body
            const  appointmentData = await appointmentModel.findById(appointmentId)

            // very appointment user
            if (appointmentData.userId !== userId) {
                return res.json({success:false, message:'Unauthorized user !'})
            }

            await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled: true})

            //releasing slot data
            const {docId, slotDate, slotTime} = appointmentData
            const doctorData = await doctorModel.findById(docId)
            let slots_booked = doctorData.slots_booked
            slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)
            await doctorModel.findByIdAndUpdate(docId, {slots_booked})
            res.json({success:true, message:'Appointment Cancelled !'})
        } catch (error) {
            console.error(error);
            return res.json({ success: false, message: error.message });
        }
    }


    //  const razorpayInstance = new razorpay({
    //     key_id:process.env.RAZORPAY_KEY_ID,
    //     key_secret:process.env.RAZORPAY_KEY_SECRET
    //  })

    //  // api to payment appointment by razorpay
    //  const paymentRazorpay = async(req, res)=>{
    //    try {
    //     const {appointmentId} = req.body
    //     const appointmentData = await appointmentModel.findById(appointmentId)

    //     if(!appointmentData || appointmentData.cancelled){
    //         return res.json({success:false, message:"Appointment Cancelled or not found !"})
    //     }

    //     // creating option for razor payment 
    //     const options ={
    //         amount:appointmentData.amount * 100,
    //         currency:process.env.currency,
    //         receipt:appointmentId
    //     }

    //     // creation of an order
    //     const order = await razorpayInstance.orders.create(options)
    //     res.json({success:true, order})
    //    } catch (error) {
    //     console.error(error);
    //     return res.json({ success: false, message: error.message });
    //    }

    //   }

    //   // api to verify razorpay
    //   const  verifyPayment = async (req, res) =>{
    //     try {
    //         const {razorpay_order_id} = req.body
    //         const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
    //         //console.log(orderInfo);
    //         if (orderInfo.status === 'paid') {
    //            await appointmentModel.findByIdAndUpdate(orderInfo.receipt, {payment: true}) 
    //            res.json({success:true, message:"Payment Successful"})
    //         }else{
    //             res.json({success:false, message:"Payment Failed"})
    //         }
            
    //     } catch (error) {
    //         console.error(error);
    //         return res.json({ success: false, message: error.message }); 
    //     }
    //   }
    // paymentRazorpay, verifyPayment
export {registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppoint, }