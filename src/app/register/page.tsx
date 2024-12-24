"use client"
import React, { useState } from "react";
import { signIn } from 'next-auth/react'
import { FcGoogle } from "react-icons/fc";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "@nextui-org/react";
import { registerUser } from "@/lib/request";
import RegisterLoading from "./loading";
import Link from "next/link";
import { useRouter } from "next/navigation";
const Page =()=> {
 
const router=useRouter()
const successNotify = () => toast.success("Sucessfully registered");
const errorNotify = (val:string) => toast.error(val);

  const [loading,setLoading] = useState(false)
  const [user,setUser]=useState({
    name:'',
    email:'',
    password:''
  })
  const handleGoogleRegister =async ()=>{
    setLoading(true)
    try {
      const res = await signIn('google',{ reqType:'register' })
      console.log(res)
      if(res?.error)
      {
        console.log(res)
        errorNotify("User Already Exists")
        setLoading(false)
        return
      }
    successNotify()
    setLoading(false)
   
     
      
      
    } catch (error) {
      console.log(error)
      setLoading(false)
      errorNotify("Sign Up Failed")
    }
   
  }

  const handleSubmitRegister =async (e: React.FormEvent<HTMLFormElement>)=>{
    
    e.preventDefault();
    setLoading(true)
    if(!user.name || !user.email || !user.password)
    {
     
      errorNotify("All fields are necessary")
      setLoading(false)
      return;
    }
  
    try {
      const res =await registerUser(user)
      const data = await res.json()
        console.log(data)
      if(res.ok)
      {
        setUser({
          name:'',
          email:'',
          password:''
        })
        const resetForm = e.target as HTMLFormElement;
        resetForm.reset();
        console.log(res)
        successNotify()
        router.push('/login')
       
       
      }
      else
      {
        console.log(res)
        errorNotify(data.message)
        setLoading(false)
      }
    } catch (error) {
     console.log(error)
     setLoading(false)
      errorNotify("Registration Failed")
    }

  }
  return (
    <div className={`fixed top-5 w-full h-full flex items-center justify-center  bg-gradient-to-r `}>
       {
        loading &&  <RegisterLoading/>
      }
      
     <div className="max-w-md lg:w-full md:w-full  bg-white rounded-lg shadow-lg p-6 ">
     
      
      {/* Social Login Buttons */}
      
      {/* <button
          onClick={() => { handleGoogleRegister()}}
            type="button"
            className="flex items-center justify-center w-full p-2 border border-gray-600 rounded-md "
            disabled={loading}
          >
            <FcGoogle className=" mr-2 text-center" /> 
            <span className=" ml-2 text-center">Sign up With Google</span>
          </button> */}
         

      {/* Or Separator */}
      <div className="relative mt-4 mb-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-2 text-gray-500">continue with email</span>
        </div>
      </div>

      {/* Email and Password Form */}
      <form id="SubmitRegisterForm" onSubmit={handleSubmitRegister} className="space-y-4">
        <div>
        <label htmlFor="Rname" className="text-gray-700 font-medium">Name</label>
          <input
            id="Rname"
            type="text"
            onChange={(e)=>{
              setUser({...user,name:e.target.value})
            }}
            className="w-full p-2 mt-1 rounded-lg border border-gray-300 "
            disabled={loading}
          />
        </div>
        <div>
          <label htmlFor="Remail" className="text-gray-700 font-medium">Email</label>
          <input
            id="Remail"
            type="email"
            onChange={(e)=>{
              setUser({...user,email:e.target.value})
            }}
            className="w-full p-2 mt-1 rounded-lg border border-gray-300 "
            disabled={loading}
          />
        </div>
        <div>
          <label htmlFor="Rpassword" className="text-gray-700 font-medium">Password</label>
          <input
            id="Rpassword"
            type="password"
            onChange={(e)=>{
              setUser({...user,password:e.target.value})
            }}
            className="w-full p-2 mt-1 rounded-lg border border-gray-300 "
            disabled={loading}
          />
       
        </div>
        <Button color="primary"
          type="submit"
          disabled={loading}
          className="w-full  text-white py-2 rounded-lg  transition duration-300 "
        >
          Sign up
        </Button>
      </form>

      <div className="mt-4 text-center">
        <span className="text-gray-600 mx-5">already have an account?</span>
        <Button  color="primary" >
            <Link href="/login" className="text-white">Login</Link>
           
          </Button>
      </div>
    </div>
   
    <Toaster position="bottom-center"/>
  </div>
  )
}

export default Page