import React from 'react'
import Profile from '@/component/profile/Profile'
import { ResolvingMetadata,Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { authOption } from '../api/auth/[...nextauth]/route'
export async function generateMetadata(
  parent: ResolvingMetadata
): Promise<Metadata> {
 
 
  // fetch data
  const session =await getServerSession(authOption)
 
 
  
 
  return {
    title: session!.user!.name,
  }
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