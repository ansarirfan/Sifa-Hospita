import doctorModel from "../models/doctorsModels.js";
const bcrypt = require('bcryptjs');
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";

const changeAvailability = async (req, res) => {
  try {
    const { docId } = req.body;
    const docData = await doctorModel.findById(docId);
    await doctorModel.findByIdAndUpdate(docId, {
      available: !docData.available,
    });
    res.json({ success: true, message: "available change" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// all doctors list
const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select(["-password", "-email"]);
    res.json({ success: true, doctors });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// api for doctor login
const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await doctorModel.findOne({ email });

    if (!doctor) {
      return res.json({ success: false, message: "invalid credentials !" });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (isMatch) {
      const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);
      res.json({
        success: true,
        token,
        doctorId: doctor._id, // Send doctor ID to frontend
        doctorName: doctor.name,
      });
    } else {
      res.json({ success: false, message: "invalid credential !" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Add this to your doctorController.js
const resetDoctorPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    // Find the doctor by email
    const doctor = await doctorModel.findOne({ email });
    if (!doctor) {
      return res.json({ success: false, message: "Doctor not found" });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(newPassword, salt);

    // Update the password
    await doctorModel.findByIdAndUpdate(doctor._id, { password: hashedPass });

    res.json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//api to get doctor appointments from doctor panel
const appointmentsDoctor = async (req, res) => {
  try {
    const { docId } = req.body;
    console.log("Decoded doctorId:", docId); // check this in console
    const appointments = await appointmentModel.find({ docId });
    console.log("Found appointments:", appointments); // Debug log
    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//api to marked appointment completed from doctor panel
const appointmentComplete = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);
    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        isComplete: true,
      });
      res.json({ success: true, message: "Appointment completed !" });
    } else {
      res.json({ success: false, message: "Marked  Failed !" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//api to  appointment cancelled from doctor panel
const appointmentCancel = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);
    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        cancelled: true,
      });
      res.json({ success: true, message: "Appointment cancelled !" });
    } else {
      res.json({ success: false, message: "Cancellation  Failed !" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//api to get dashboard from doctor panel
const doctorDashboard = async (req, res) => {
  try {
    const {docId} = req.body
    const appointments = await appointmentModel.find({docId})
    
    let earnings = 0
   appointments.map((item)=>{
     if (item.isComplete || item.payment) {
       earnings += item.amount 
    }
  })

  let patients = []

  appointments.map((item)=>{
    if (!patients.includes(item.userId)) {
        patients.push(item.userId)
    }
  })

  const dashData = {
    earnings,
    appointments:appointments.length,
    patients:patients.length,
    latestAppointment:appointments.reverse().slice(0 , 5)

  }
  res.json({success:true, dashData})



  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//api to get doctor profile data from doctor panel

  const doctorProfile = async (req, res) =>{
    try {
      const {docId} = req.body
      const profileData = await doctorModel.findById(docId).select('-password')
      res.json({success:true, profileData})
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  }

  // api to update doctor profile data fom doctor panel
  const updateDoctorProfile = async (req, res) =>{
    try {
      const {docId, fees, address, available} = req.body
     await doctorModel.findByIdAndUpdate(docId, {fees, address, available})
      res.json({success:true, message:"Profile Updated !"})
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  }


export {
  changeAvailability,
  doctorList,
  loginDoctor,
  resetDoctorPassword,
  appointmentsDoctor,
  appointmentComplete,
  appointmentCancel,doctorDashboard,
 doctorProfile, updateDoctorProfile
};
