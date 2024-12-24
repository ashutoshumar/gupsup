import React,{useState,FC} from 'react'
import Image from 'next/image';
import { Button } from '@nextui-org/react';
interface Iprop {
    name : string;
    about : string;
    prevueImage : string;
    loading : boolean;
    handleSubmit : (e: React.FormEvent<HTMLFormElement>) => void;
    setName : (arg:string)=>void;
    setAbout : (arg:string)=>void;
    handleImageSelected : (e: React.ChangeEvent<HTMLInputElement>) => void;
    setUpdatePassword : (arg:boolean) => void;

}
const UpdateProfile:FC<Iprop> = ({name,about,prevueImage,loading,handleSubmit,setName,setAbout,handleImageSelected,setUpdatePassword}) => {
  return (
    <div>
        <div className="relative flex justify-center text-sm mb-2">
          <span className="bg-white px-2 text-gray-500">Update Your Profile</span>
        </div>
      <form id="SubmitForm" onSubmit={handleSubmit} className="space-y-4">
      <div>
          <label htmlFor="name" className="text-gray-700 font-medium">Name</label>
          <input
            id="name"
            type="text"
            onChange={(e)=>{
              setName(e.target.value)
            }}
            value={name}
            className="w-full p-2 mt-1 rounded-lg border border-gray-300 disabled:text-white disabled:bg-gray-100"
            disabled={loading}
          />
        </div>
        <div >
        <label htmlFor="about" className="text-gray-700 font-medium">About</label>
          <textarea
            id="about"
            value={about}
            onChange={(e)=>{
              setAbout(e.target.value)
            }}
           
            className="w-full p-2 mt-1 rounded-lg border border-gray-300 disabled:text-white disabled:bg-gray-100"
            disabled={loading}
          />
        </div>
        
        <div className="relative rounded-lg p-2 border border-dashed border-gray-300 hover:border-blue-500 focus-within:border-blue-500">
       <label className="cursor-pointer">
      <span className="text-gray-600">
        Upload an Image 
    </span>
    <input type="file" className="hidden disabled:bg-gray-100 disabled:text-white"
            disabled={loading} onChange={handleImageSelected} />
  </label>
         <Image 
              src={prevueImage}
              alt="User Profile Picture"
              className="absolute top-2 right-3 my-auto mx-auto rounded-full"
              height={20}
              width={20}
            />
  </div>
        <Button color="primary"
          type="submit"
          className="w-full  text-white py-2 rounded-lg  transition duration-300 disabled:bg-gray-100"
          disabled={loading}
        >
          Update
        </Button>
      </form>
      <div className="relative flex justify-center text-sm mb-2">
          <span className="bg-white px-2 text-gray-500">or</span>
        </div>
        <Button color="primary"
          onClick={()=>{setUpdatePassword(true)}}
          className="w-full  text-white py-2 rounded-lg  transition duration-300 disabled:bg-gray-100"
          disabled={loading}
        >
          Change Password
        </Button>
    </div>
  )
}

export default UpdateProfile