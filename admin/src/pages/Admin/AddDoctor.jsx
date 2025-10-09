import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';


const AddDoctor = () => {
  const [docImage, setDocImage] = useState(false);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [experience, setExperience] = useState('1 year');
  const [fees, setFees] = useState('');
  const [about, setAbout] = useState('');
  const [speciality, setSpeciality] = useState('General physician');
  const [degree, setDegree] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
   
  const {backendUrl, aToken} = useContext(AdminContext);

  const onSubmitHandler = async (e)=>{
    e.preventDefault()
    try {
      if (!docImage) {
        return toast.error('Image not selected !')
      }
      const formData = new FormData();
      formData.append('image', docImage);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('fees', Number(fees));
      formData.append('experience', experience);
      formData.append('speciality', speciality);
      formData.append('degree', degree);
      formData.append('address', JSON.stringify({line1:address1, line2:address2}));
      formData.append('about', about);

      // console.log formdata
      formData.forEach((value, key) =>{
        console.log(`${key} : ${value}`);
        
      })

      const {data} = await axios.post(backendUrl + '/api/admin/add-doctor', formData, {headers: {aToken}})
      
      if(data.success){
         toast.success(data.message)
         setDocImage(false)
         setName('')
         setEmail('')
         setPassword('')
         setDegree('')
         setAddress1('')
         setAddress2('')
         setAbout('')
         setFees('')
      }else{
         toast.error(data.message)
      }
    } catch (error) {
      console.error('Error during API call:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Something went wrong!');
    }
  }


  return (
   <form onSubmit={onSubmitHandler} className='m-5 w-full'>
   <p className='mb-3 text-lg font-medium'>Add Doctor</p>

   <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll '>
    <div className='flex items-center gap-4 mb-8 text-gray-600'>
      <label htmlFor="doc-img">
        <img className='w-16 bg-gray-100 rounded-full cursor-pointer ' src={ docImage ? URL.createObjectURL(docImage) : assets.upload_area} alt="" />
      </label>
      <input onChange={(e)=>setDocImage(e.target.files[0])} type="file" id='doc-img' hidden />
      <p>Upload Doctor <br /> Picture</p>
    </div>

    <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600 '>
      <div className='w-full lg:flex-1 flex flex-col gap-4'>

        <div className='flex-1 flex flex-col gap-1'>
          <p>Doctor Name</p>
          <input onChange={(e)=>setName(e.target.value)} value={name} className='border rounded px-3 py-2' type="name" placeholder='Name' required />
        </div>
        <div className='flex-1 flex flex-col gap-1'>
          <p>Doctor Email</p>
          <input onChange={(e)=>setEmail(e.target.value)} value={email} className='border rounded px-3 py-2' type="email" placeholder='Email' required />
        </div>
        
        <div className='flex-1 flex flex-col gap-1'>
          <p>Doctor Password</p>
          <input onChange={(e)=>setPassword(e.target.value)} value={password} className='border rounded px-3 py-2' type="password" placeholder='Password' required />
        </div>

        <div className='flex-1 flex flex-col gap-1'>
          <p>Experiences</p>
          <select onChange={(e)=>setExperience(e.target.value)} value={experience} className='border rounded px-3 py-2' name="" id="">
            <option value="1 Year">1 Years</option>
            <option value="2 Year">2 Years</option>
            <option value="3 Year">3 Years</option>
            <option value="4 Year">4 Years</option>
            <option value="5 Year">5 Years</option>
            <option value="6 Year">6 Years</option>
            <option value="7 Year">7 Years</option>
            <option value="8 Year">8 Years</option>
            <option value="9 Year">9 Years</option>
            <option value="10 Year">10 Years</option>
          
          </select>
        </div>

        <div className='flex-1 flex flex-col gap-1'>
          <p>Fees</p>
          <input onChange={(e)=>setFees(e.target.value)} value={fees} className='border rounded px-3 py-2' type="number" placeholder='000' required/>
        </div>
      </div>

      <div className='w-full lg:flex-1 flex flex-col gap-4'>
        <div className='flex-1 flex flex-col gap-1'>
          <p>Speciality</p>
          <select onChange={(e)=>setSpeciality(e.target.value)} value={speciality} className='border rounded px-3 py-2' name="" id="">
            <option value="General physician">General physician</option>
            <option value="Gynecologist">Gynecologist</option>
            <option value="Dermatologist">Dermatologist</option>
            <option value="Pediatricians">Pediatricians</option>
            <option value="Neurologist">Neurologist</option>
            <option value="Orthologist">Orthologist</option>
          </select>
        </div>

        <div className='flex-1 flex flex-col gap-1'>
          <p>Education</p>
          <input onChange={(e)=>setDegree(e.target.value)} value={degree} className='border rounded px-3 py-2' type="text" placeholder='Education' required />
        </div>

        <div className='flex-1 flex flex-col gap-1'>
          <p>Address</p>
          <input onChange={(e)=>setAddress1(e.target.value)} value={address1} className='border rounded px-3 py-2' type="text" placeholder='Address 1' required />
          <input onChange={(e)=>setAddress2(e.target.value)} value={address2} className='border rounded px-3 py-2' type="text" placeholder='Address 1' required />
        </div>
       </div>
    </div>
    <div>
      <p className='mt-4 mb-2'>About Doctor</p>
      <textarea onChange={(e)=>setAbout(e.target.value)} value={about} className='w-full  border rounded px-4 pt-2' rows={5} placeholder='write about doctor' required />
    </div>
    <button type='submit' className='bg-primary px-10 py-3 mt-4 text-white rounded-full'> Add Doctor</button>
   </div>

   </form>
  )
}

export default AddDoctor
