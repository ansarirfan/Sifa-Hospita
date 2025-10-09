import express from 'express';
import { addDoctor, allDoctors, loginAdmin, appointmentAdmin, appointCancelled, adminDash  } from '../controllers/addminController.js'; 
import upload from "../middleware/multer.js";
import authAdmin from '../middleware/authAdmin.js';
import {changeAvailability} from '../controllers/doctorController.js'
const addminRouter = express.Router();


// Route to add a doctor
addminRouter.post("/add-doctor", authAdmin, upload.single("image"), addDoctor);
addminRouter.post("/login", loginAdmin);
addminRouter.post("/all-doctor", authAdmin,  allDoctors);
addminRouter.post("/change-availability", authAdmin,  changeAvailability);
addminRouter.get("/appointments", authAdmin,  appointmentAdmin);
addminRouter.post("/cancel-appointment", authAdmin,  appointCancelled );
addminRouter.get("/dashboard",authAdmin, adminDash );



export default addminRouter