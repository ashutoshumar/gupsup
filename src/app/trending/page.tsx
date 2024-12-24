import React from 'react'
import TrendingPostList from '@/component/trending/TrendingPostList'
import { getTrendingPosts } from '@/lib/request';

const page = async() => {
   const initialPosts=await getTrendingPosts(0);
   const data=await initialPosts.json()
   if(!initialPosts.ok)
   {
    throw Error("some problem occured")
   }
  return (
    <div>
     
        <TrendingPostList initialPosts={data.posts.post}/>
       
      
    </div>
  )
}

export default page