import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets_frontend/assets'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify';



const Profile = () => {
  const {userData, setUserData, token, backendUrl, loadUserProfileData} = useContext(AppContext)
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false)
  
  
  // const [userData, setUserData] = useState({
  //   name:"Tony Khan",
  //   image:assets.profile_pic,
  //   email:'tony23@gmail.com',
  //   phone:'+12 235697',
  //   address:{
  //     line1:'56 cross Richmond',
  //     line2:'Circle church road, London'
  //   },
  //   gender:'Male',
  //   dob:'2001-02-26'
  // })

  const updateUserProfileData = async ()=> {
      try {
        const formData = new FormData();

        formData.append('name', userData.name);
        formData.append('phone', userData.phone);
        formData.append('address', JSON.stringify(userData.address)); // Ensure proper JSON string
        formData.append('gender', userData.gender);
        formData.append('dob', userData.dob);


        if (image) {
          formData.append('image', image);
      }

       // ✅ Debugging: Check FormData before sending
       console.log("🚀 FormData Content:");
       formData.forEach((value, key) => {
           console.log(`${key}:`, value);
       });

        const {data} = await axios.post( backendUrl + '/api/user/update-profile', formData, { headers: { token, "Content-Type": "multipart/form-data"  }})

        if(data.success){
          toast.success(data.message);
            await loadUserProfileData();
            setIsEdit(false);
            setImage(false);
        }else{
          toast.error(data.message)
        }
      } catch (error) {
        console.log(error);
        
        toast.error(error.message)
      }
  }
 
  if (!userData) {
    return <p>Loading...</p>;
  }

  return userData && (
    <div className='max-w-lg flex flex-col gap-2 text-sm'>
      {
        isEdit 
        ? <label htmlFor="image">
        <div className="inline-block relative cursor-pointer">
          <img
            className="w-36 rounded opacity-75"
            src={image ? URL.createObjectURL(image) : userData.image}
            alt=""
          />
          <img className="w-10 absolute bottom-12 right-12" src={assets.upload_icon} alt="" />
        </div>
        <input
          type="file"
          id="image"
          accept="image/*"
          hidden
          onChange={(e) => {
            console.log("📸 File Selected:", e.target.files[0]);
            setImage(e.target.files[0]); // Ensure file is set
          }}
        />
      </label>
      
        :<img className='w-36 rounded' src={userData.image} alt="" />
      }

       
       {
        isEdit 
        ? <input className='bg-gray-50 text-3xl font-medium max-w-60 mt-4' type="text" value={userData.name} onChange={e =>setUserData(prev=>({...prev, name:e.target.value}))} />
        : <p className='font-medium text-3xl mt-4 text-neutral-800'>{userData.name}</p>
       }
       <hr className='bg-zinc-400 h-[1px] border-none' />
       <div >
        <p className='text-neutral-500 underline mt-3'>CONTACT INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium'>Email Id:</p>
          <p className='text-blue-500'>{userData.email}</p>

          <p className='font-medium'>Phone:</p>
          {
            isEdit
            ? <input className='bg-gray-100 max-w-52' type="text" value={userData.phone} onChange={e =>setUserData(prev=>({...prev, phone:e.target.value}))} />
            : <p className='text-blue-500'>{userData.phone}</p>
          }

          <p className='font-medium'>Address:</p>
          {
            isEdit
            ? <p><input className='bg-gray-50' type="text" value={userData.address.line1} onChange={(e)=>setUserData(prev=>({...prev, address:{...prev.address, line1: e.target.value}}))} />
            <br />
             <input className='bg-gray-50' type="text" value={userData.address.line2} onChange={(e)=>setUserData(prev=>({...prev, address:{...prev.address, line2: e.target.value}}))} /></p>
            : <p className='text-gray-500'>
              {userData.address.line1}
              <br />
              {userData.address.line2}
            </p>
          }

        </div>
       </div>
       <div>
        <p className='text-neutral-500 underline mt-3'>BASIC INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium'>Gender:</p>
          {
            isEdit
            ? <select className='max-w-20 bg-gray-100' value={userData.gender} onChange={(e) =>setUserData(prev=>({...prev, gender:e.target.value}))}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            : <p className='text-gray-400'>{userData.gender}</p>
          }
          <p className='font-medium'>Birthday:</p>
          {
            isEdit
            ?  <input className='max-w-28 bg-gray-100' type="date" value={userData.dob} onChange={(e) =>setUserData(prev=>({...prev, dob:e.target.value}))} />
            : <p className='text-gray-400'>{userData.dob}</p>
          }
        </div>
       </div>
       <div className='mt-10'>
        {
          isEdit
          ? <button className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all duration-300' onClick={updateUserProfileData}>Save Information</button>
          : <button className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all duration-300' onClick={()=>setIsEdit(true)}>Edit</button>
        }
       </div>
    </div>
  )
}


export default Profile
