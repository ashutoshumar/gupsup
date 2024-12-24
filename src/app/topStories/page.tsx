import React from 'react'
import TopStoryPostList from '@/component/topStory/TopStoryPostList';
import { getTopPosts } from '@/lib/request';

const page = async() => {
   const initialPosts=await getTopPosts(0);
   const data=await initialPosts.json()
   if(!initialPosts.ok)
   {
    throw Error("some problem occured")
   }
  return (
    <div>
     
        <TopStoryPostList initialPosts={data.data.post}/>
       
      
    </div>
  )
}

export default page