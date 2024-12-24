"use client"
import React, { useState , FC} from "react";
import { signIn } from 'next-auth/react'
import { FcGoogle } from "react-icons/fc";
import toast, { Toaster } from "react-hot-toast";
import { AiFillCloseCircle } from "react-icons/ai";
import { Button } from "@nextui-org/react";
import { registerUser } from "@/lib/request";
interface IProps {
  isRegisterOpen: boolean;
  onRegisterClose:() => void;
  onLoginOpen:()=> void;
}


const Register:FC<IProps> =({ isRegisterOpen, onRegisterClose,onLoginOpen })=> {
 

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
    onRegisterClose()
     
      
      
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
        setLoading(false)
        onRegisterClose()
        onLoginOpen()
       
       
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
    <div className={`fixed top-5 w-full h-full flex items-center justify-center  bg-gradient-to-r ${isRegisterOpen ? '' : 'hidden'}`}>
       {
        loading &&  <div className="fixed top-0 w-full h-full flex items-center justify-center  text-black z-50 ">
        <div className=" animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900">
         
        </div>
        </div>
      }
      
     <div className="max-w-md lg:w-full md:w-full  bg-white rounded-lg shadow-lg p-6 ">
     <button onClick={onRegisterClose} className="float-right mb-4">
          <AiFillCloseCircle/>
          </button>
      
      {/* Social Login Buttons */}
      
      <button
          onClick={() => { handleGoogleRegister()}}
            type="button"
            className="flex items-center justify-center w-full p-2 border border-gray-600 rounded-md disabled:bg-gray-100 disabled:text-white"
            disabled={loading}
          >
            <FcGoogle className=" mr-2 text-center" /> 
            <span className=" ml-2 text-center">Sign up With Google</span>
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
      <form id="SubmitRegisterForm" onSubmit={handleSubmitRegister} className="space-y-4">
        <div>
        <label htmlFor="Rname" className="text-gray-700 font-medium">Name</label>
          <input
            id="Rname"
            type="text"
            onChange={(e)=>{
              setUser({...user,name:e.target.value})
            }}
            className="w-full p-2 mt-1 rounded-lg border border-gray-300 disabled:bg-gray-100 disabled:text-white"
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
            className="w-full p-2 mt-1 rounded-lg border border-gray-300 disabled:bg-gray-100 disabled:text-white"
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
            className="w-full p-2 mt-1 rounded-lg border border-gray-300  disabled:bg-gray-100 disabled:text-white"
            disabled={loading}
          />
       
        </div>
        <Button color="primary"
          type="submit"
          disabled={loading}
          className="w-full  text-white py-2 rounded-lg  transition duration-300 disabled:bg-gray-300"
        >
          Sign up
        </Button>
      </form>

      <div className="mt-4 text-center">
        <span className="text-gray-600">already have an account?</span>
        <button onClick={onLoginOpen}
       
                    className="text-primary cursor-pointer hover:underline ml-1 disabled:text-gray-300" disabled={loading}>Sign in</button>
      </div>
    </div>
   
    <Toaster />
  </div>
  )
}

export default Register