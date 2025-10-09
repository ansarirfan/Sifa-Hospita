import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import connectCloudinary from './config/cloudinary.js';
import 'dotenv/config';
import addminRouter from './route/addminRoute.js';
import doctorRouter from './route/doctorRoute.js';
import userRouter from './route/userRoute.js';


 const app = express();
 const port = process.env.PORT || 4000
 connectDB();
 connectCloudinary();
 // middleware

 app.use(express.json());
 app.use(cors());


 //endpoint path
 app.get('/', (req, res)=>{
    res.send('api work fine.')
 })


  app.use('/api/admin', addminRouter)
  app.use('/api/doctor', doctorRouter )
  app.use('/api/user', userRouter)

  
 app.listen(port, ()=>{
    console.log(`server started ${port}`);
    
 })