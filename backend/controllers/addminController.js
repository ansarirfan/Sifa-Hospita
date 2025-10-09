import validator from "validator";
import bcrypt from "bcrypt";
import {v2 as cloudinary} from "cloudinary";
import doctorModel from "../models/doctorsModels.js";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModels.js";

//api for add doctor
  const addDoctor = async (req, res) => {
    try {
    const { name, email, password, address, speciality, experience, about, degree, fees} = req.body;
    const imageFile = req.file;
   

 // Check if image file is received
 if (!imageFile) {
   return res.status(400).json({ success: false, msg: "Image file is missing" });
 }
    
    
    //checking for all data to add password
    if (!name || !email || !password || !address || !speciality || !experience || !about || !degree || !fees ) {
      return res.json({success:"false", message:"Missing Details"});
    }
 

    // validating email formate
    if (!validator.isEmail(email)) {
      return res.json({success:"false", message:"Pls Enter A valid Email"});
    }

    // validate strong password
    if (password.length < 8) {
      return res.json({success:"false", msg:"Pls Enter A Strong password"});
    }

    // hashing doctors password
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    //upload image to cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type:"image"});
    const imageUrl = imageUpload.secure_url;

     
    // save data into database

    const doctorData = {
      name,
      email,
      image:imageUrl,
      password:hashedPass,
      address:JSON.parse(address),
      speciality, 
      experience,
      about,
      degree,
      fees,
      date:Date.now()
   }

   const newDoctor = new doctorModel(doctorData);
   await newDoctor.save();
   res.json({success:true, message:"Doctor Added"})
    
   } catch (error) {
    console.log(error);
    res.json({success:false, message:error.message})
   }
}

//API FOR ADMIN LOGIN
const loginAdmin = async (req, res) =>{
  try {
    const {email, password} = req.body;
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
       const token = jwt.sign(email+password, process.env.JWT_SECRET)
       res.json({success:true, token})
    }else{
      res.json({success:false, message:"Invalid Credentials"})
    }
    
  } catch (error) {
    console.log(error);
    res.json({success:false, message:error.message})
  }
}

// api to get all doctor list for admin panel

 const allDoctors = async (req, res) =>{
  try {
    const doctors = await doctorModel.find({}).select('-password');
    res.json({success:true, doctors})
  } catch (error) {
    console.log(error);
    res.json({success:false, message:error.message})
  }
 }

 // api to get all appointment list
 const appointmentAdmin = async (req,res) =>{
  try {
    const appointments = await appointmentModel.find({})
    res.json({success:true, appointments})
  } catch (error) {
    console.log(error);
    res.json({success:false, message:error.message})
  }
 }

 //api for cancelled appointment 
 const appointCancelled = async (req, res) =>{
  try {
      const {appointmentId} = req.body
      const  appointmentData = await appointmentModel.findById(appointmentId)

     

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

// api to get dash data for admin panel

const adminDash = async (req, res)=>{
  try {
    const doctors = await doctorModel.find({})
    const users = await userModel.find({})
    const appointments = await appointmentModel.find({})

    const dashData = {
      doctors: doctors.length,
      patients : users.length,
      appointments : appointments.length,
      latestAppointments :appointments.reverse().slice(0, 5)

    }
    res.json({success:true, dashData})
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

export  {addDoctor, loginAdmin, allDoctors, appointmentAdmin, appointCancelled, adminDash } 