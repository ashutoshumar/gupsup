import Dashboard from '@/component/dashboard/Dashboard'
import { getAdminUsers } from '@/lib/request'
import React from 'react'

const page = async() => {
   await getAdminUsers(0)
   
  return (
    <div className={`absolute mt-20 p-6 w-full h-full flex  justify-center  bg-gradient-to-r `}>
   <Dashboard/>
   </div>
  )
}

export default page