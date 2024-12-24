"use client"
import React,{useState} from 'react'
import { Button } from '@nextui-org/react';
import { useRouter,useSearchParams } from 'next/navigation';
import { resetpassword } from '@/lib/request';

const Page=()=> {
  const router = useRouter();
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const [password, setPassword] = useState('');
  const [cnfpassword, setCnfPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
     if(password!=cnfpassword)
     {
      setMessage("password and confirm password don't match");
      return

     }
    const res =await resetpassword(token,password)

    const data = await res.json();
    setMessage(data.message);

    if (res.ok) {
      router.push('/login');
    }
  };

  return (
    <div  className={`fixed top-0 w-full h-full flex items-center justify-center bg-gradient-to-r  `}>
    <div className="max-w-md lg:w-full md:w-full  bg-white rounded-lg shadow-lg p-6 ">
    
    <h2 className="text-2xl font-semibold text-center mb-4">Reset Password</h2>
    <div className="relative mt-4 mb-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
         <span className="bg-white px-2 text-gray-500">enter your new password</span>
         </div>
      </div>
       <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className='w-full my-3'
        />
         <input
          type="password"
          placeholder="Confirm password"
          value={cnfpassword}
          onChange={(e) => setCnfPassword(e.target.value)}
          required
          className='w-full my-3'
        />
      <Button color="primary"
          type="submit"
          className="w-full  text-white py-2 rounded-lg  transition duration-300 "
     >Reset Password</Button>
      </form>
      {message && <p>{message}</p>}
    </div>
    </div>
  );
}

export default  Page;
