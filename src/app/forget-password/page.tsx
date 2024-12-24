"use client"
import React,{useState} from 'react'
import { Button } from '@nextui-org/react';
import { forgetpassword } from '@/lib/request';
const Page = () => {
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await forgetpassword(email)

      const data = await res.json();
      setMessage(data.message || 'Check your email for further instructions.');
    } catch (error) {
      setMessage('Something went wrong. Please try again later.');
    }
  };
  return (
    <div  className={`fixed top-0 w-full h-full flex items-center justify-center bg-gradient-to-r  `}>
    <div className="max-w-md lg:w-full md:w-full  bg-white rounded-lg shadow-lg p-6 ">
    
    <h2 className="text-2xl font-semibold text-center mb-4">Forgot Password</h2>
    <div className="relative mt-4 mb-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
         <span className="bg-white px-2 text-gray-500">enter your email</span>
         </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className='w-full my-3'
        />
     <Button color="primary"
          type="submit"
          className="w-full  text-white py-2 rounded-lg  transition duration-300 "
     >Send Reset Email</Button>
      </form>
      {message && <p>{message}</p>}
      </div>
    </div>
  )
}

export default Page




