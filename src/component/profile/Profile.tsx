"use client"
import React,{useState} from 'react'
import { Avatar,Divider } from '@nextui-org/react'
import { MdEdit } from "react-icons/md";
import ProfileHome from './ProfileHome';
import Link from 'next/link';
import ProfileAbout from './ProfileAbout';
const Profile = ({name,image,about,email}:{name:String,image:string,about:string,email:string}) => {
  const [home,setHome]=useState(true)
  return (
    <div className='mt-20 w-full h-full flex flex-col  justify-center items-center'>
     
      <div className=' w-4/5 mt-10 flex justify-between items-center p-4'>
      <div className='flex flex-col   gap-5'>
      <Avatar isBordered radius="full" className="w-20 h-20 text-large" src={image} />

      <h2 className="font-bold text-2xl text-blue-500">{name}</h2>

      </div>
      <div className="font-bold text-4xl text-blue-500">
      <Link href="/profile/update"
      > <MdEdit /></Link>
      </div>
      
    
      </div>
      <div className=' w-4/5 mt-10 flex flex-col   p-4'>

        <div className='flex gap-5 '>
          <span onClick={()=>setHome(true)} className={home? "text-blue-500 cursor-pointer":"text-black cursor-pointer"}>
            Home
          </span>
          <span onClick={()=>setHome(false)} className={home? "text-black cursor-pointer":"text-blue-500 cursor-pointer"}>
            About
          </span>
          
        </div>
        <Divider className="my-5" />
        {
          home?<ProfileHome/>:<ProfileAbout about={about} email={email}/>
        }
        
      </div>
      
      
    </div>
  )
}

export default Profile