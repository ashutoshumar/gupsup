"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { Button } from '@nextui-org/react'
import { putAdminUserById } from '@/lib/request'
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { UserInterface } from '@/utility/UserInterface'

const UpdateUser = ({user}:{user:UserInterface}) => {
    const router  = useRouter()
     const [role,setRole]=useState(user.role)
    const handleSubmit = async()=>
    {
     
        
        const res = await putAdminUserById(user._id,role);
        if(res.ok)
          router.push("/dashboard")
        else
        toast.error("Some Error Occured")
        
        
        
    }
  return (
    <div className="fixed top-0 w-full h-full flex items-center justify-center bg-gradient-to-r">
     
    <div className="max-w-md lg:w-full md:w-full bg-white rounded-lg shadow-lg p-6">
        
    <div className="relative flex justify-center text-sm mb-2">
      <span className="bg-white px-2 text-gray-500">{"Update User's Profile"}</span>
    </div>
  <form id="SubmitForm"  className="space-y-4">
  <div>
      <label htmlFor="name" className="text-gray-700 font-medium">Name</label>
      <input
        id="name"
        type="text"
        
        value={user.name}
        className="w-full p-2 mt-1 rounded-lg border border-gray-300 "
        disabled={true}
      />
    </div>
    <div>
      <label htmlFor="email" className="text-gray-700 font-medium">Email</label>
      <input
        id="email"
        type="text"
        
        value={user.email}
        className="w-full p-2 mt-1 rounded-lg border border-gray-300 "
        disabled={true}
      />
    </div>
    <div >
    <label htmlFor="about" className="text-gray-700 font-medium">About</label>
      <textarea
        id="about"
        value={user.about}
        
       
        className="w-full p-2 mt-1 rounded-lg border border-gray-300 "
        disabled={true}
      />
    </div>
    
    <div >
    <label htmlFor="about" className="text-gray-700 font-medium">Role:{role}</label>
    
  <select name="role" id="role" className="w-full p-2 mt-1 rounded-lg border border-gray-300 "
      defaultValue={role}
      onChange={(e)=>setRole(e.target.value)}
       >
  <option value="user">user</option>
  <option value="admin">admin</option>
 </select>
 </div>
 <div className="  p-2 my-4">
     <Image 
          src={user.picture?user.picture.url!:"https://i.pravatar.cc/150?u=a04258114e29026302d"}
          alt="User Profile Picture"
          className=" my-auto mx-auto rounded-full"
          height={50}
          width={50}
        />
</div>
    <Button color="primary"
      onClick={()=>handleSubmit()}
      className="w-full  text-white py-2 rounded-lg  transition duration-300 disabled:bg-gray-100"
      
    >
      Update
    </Button>
  </form>
 
</div>
<Toaster position="bottom-center"/>
  
</div>
  )
}

export default UpdateUser