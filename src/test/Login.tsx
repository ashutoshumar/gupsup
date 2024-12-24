"use client"
import React, { useState,FC } from "react";
import { signIn } from 'next-auth/react'
import { FcGoogle } from "react-icons/fc";
import { AiFillCloseCircle } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "@nextui-org/react";



interface IProps {
  isLoginOpen: boolean;
  onLoginClose:() => void;
  onRegisterOpen:()=> void;
}
const Login:FC<IProps> =({ isLoginOpen, onLoginClose,onRegisterOpen })=> {
  
  const errorNotify = (val:string) => toast.error(val);
  

  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [loading,setLoading] = useState(false)
  const handleGoogleLogin =async ()=>{
     setLoading(true)
    try {
      const res = await signIn('google',{ reqType:'login' })
      console.log(res)
      if(res?.error)
      {
        console.log(res)
        errorNotify("Sign In Failed")
        setLoading(false)
        return
      }
      
      setLoading(false)
      onLoginClose()
     
      
      
    } catch (error) {
      console.log(error)
      setLoading(false)
      errorNotify("Sign In Failed")
    }
   
  }

  const handleSubmit =async (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    setLoading(true)
    if( !email || !password)
    {
     
      errorNotify("All fields are necessary")
      setLoading(false)
      return;
    }
   
    try {
     
      const res = await signIn('credentials',{
        email,
        password,
        redirect:false
      })
      
      console.log(res)
      if(res?.error)
      {
        console.log(res)
        errorNotify("Invalid Credentials")
        setLoading(false)
        return
      }
      setEmail('')
      setPassword('')
      setLoading(false)
      onLoginClose()
     
      
      
    } catch (error) {
      console.log(error)
      setLoading(false)
      errorNotify("Sign In Failed")
    }

  }
  
  return (
    <div  className={`fixed top-50 w-full h-full flex items-center justify-center bg-gradient-to-r  ${isLoginOpen ? '' : 'hidden'}`}>
      {
        loading &&  <div className="fixed top-0 w-full h-full flex items-center justify-center  text-black z-50 ">
        <div className=" animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900">
         
        </div>
        </div>
      }
      
     <div className="max-w-md lg:w-full md:w-full  bg-white rounded-lg shadow-lg p-6 ">
       
     <button onClick={onLoginClose} className="float-right">
          <AiFillCloseCircle/>
          </button>
      <h2 className="text-2xl font-semibold text-center mb-4">Welcome Back</h2>
      
      {/* Social Login Buttons */}
      <button
          onClick={() => {handleGoogleLogin()}}
            type="button"
            className="flex items-center justify-center w-full p-2 border border-gray-600 rounded-md disabled:bg-gray-100 disabled:text-white"
            disabled={loading}
          >
            <FcGoogle className=" mr-2 text-center" /> 
            <span className=" ml-2 text-center">Continue With Google</span>
          </button>
    
        

      {/* Or Separator */}
      <div className="relative mt-4 mb-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-2 text-gray-500">Or continue with email</span>
        </div>
      </div>

      {/* Email and Password Form */}
      <form id="SubmitForm" onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="text-gray-700 font-medium">Email</label>
          <input
            id="email"
            type="email"
            onChange={(e)=>{
              setEmail(e.target.value)
            }}
            className="w-full p-2 mt-1 rounded-lg border border-gray-300 disabled:bg-gray-100 disabled:text-white"
            disabled={loading}
          />
        </div>
        <div>
          <label htmlFor="password" className="text-gray-700 font-medium">Password</label>
          <input
            id="password"
            type="password"
            onChange={(e)=>{
              setPassword(e.target.value)
            }}
            className="w-full p-2 mt-1 rounded-lg border border-gray-300 disabled:bg-gray-100 disabled:text-white"
            disabled={loading}
          />
        </div>
       <Button color="primary"
          type="submit"
          className="w-full  text-white py-2 rounded-lg  transition duration-300 disabled:bg-gray-100"
          disabled={loading}
        >
          Sign in
        </Button>
      </form>

      <div className="mt-4 text-center">
        <a href="#" className="text-primary hover:underline" >Forgot password?</a>
      </div>
      <div className="mt-4 text-center">
        <span className="text-gray-600">Don't have an account?</span>
        <button onClick={onRegisterOpen} className="text-primary cursor-pointer  hover:underline ml-1 disabled:text-gray-300" disabled={loading}>Sign up</button>
      </div>
    </div>
   
    <Toaster/>
  </div>
  )
}

export default Login