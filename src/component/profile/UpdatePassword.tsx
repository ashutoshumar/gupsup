'use client'
import React , { useState,FC } from 'react'
import { Button } from "@nextui-org/react";

interface Iprop {
    loading : boolean;
    password : string ;
    setPassword : (arg:string) => void;
    handleSubmitPassword : (e: React.FormEvent<HTMLFormElement>) => void;
    setUpdatePassword : (arg:boolean) => void;

}
const UpdatePassword:FC<Iprop>  = ({loading,password,setPassword,handleSubmitPassword,setUpdatePassword}) => {
  return (
    <div>
        <div className="relative flex justify-center text-sm mb-2">
          <span className="bg-white px-2 text-gray-500">Update Your Password</span>
        </div>
    <form id="SubmitFormPassword" onSubmit={handleSubmitPassword} className="space-y-4">
    <div>
      <label htmlFor="password" className="text-gray-700 font-medium">Password</label>
      <input
        id="password"
        type="password"
        onChange={(e)=>{
          setPassword(e.target.value)
        }}
        value={password}
        className="w-full p-2 mt-1 rounded-lg border border-gray-300 disabled:text-white disabled:bg-gray-100"
        disabled={loading}
       />
    </div>
       <Button color="primary"
      type="submit"
      className="w-full  text-white py-2 rounded-lg  transition duration-300 disabled:bg-gray-100"
      disabled={loading}>
      Update Password
      </Button>
    </form>
    <div className="relative flex justify-center text-sm mb-2">
      <span className="bg-white px-2 text-gray-500">or</span>
    </div>
     <Button color="primary"
      onClick={()=>{setUpdatePassword(false)}}
      className="w-full  text-white py-2 rounded-lg  transition duration-300 disabled:bg-gray-100"
      disabled={loading}  >
      Update Profile
    </Button></div>
  )
}

export default UpdatePassword