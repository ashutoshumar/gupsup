"use client"
import React from 'react'
import LikedPostsList from './Liked/LikedPost'
import BookMarkedPostsList from './BookMarked/BookMarkedPost'
const ProfileHome = () => {
  return (
    <div className='flex flex-col gap-5'>
      <h2 className="font-bold text-large text-blue-500 my-5">Liked Post</h2>
     
     
   <LikedPostsList/>
  
   <h2 className="font-bold text-large text-blue-500 my-5">Bookmarked</h2>
     
     
   <BookMarkedPostsList/>
   
    </div>
  )
}

export default ProfileHome