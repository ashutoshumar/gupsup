import React from 'react'
import Profile from '@/component/profile/Profile'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { authOption } from "@/utility/auth";
export async function generateMetadata(): Promise<Metadata> {
  // Fetch the session
  const session = await getServerSession(authOption);

  return {
    title: session?.user?.name || "Default Title",
  };
}
const page = async() => {
  const session =await getServerSession(authOption)
  
  return (
    <div>
        <Profile
        name={session?.user?.name || 'Guest'}
        image={session?.user?.image || ''}
        about={session?.user?.about || ''}
        email={session?.user?.email || ''}
      />
      </div>
  )
}

export default page