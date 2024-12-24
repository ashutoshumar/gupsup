
import React from "react"
import { Suspense } from "react"
import type { Metadata, ResolvingMetadata } from 'next'
import Loading from "./loading"
import ThreadPosts from "@/component/threads/thread/ThreadPosts"
import { getThreadPosts } from "@/lib/request"
 

 
export async function generateMetadata(
  { params }:{params:{slug:string}},
  parent: ResolvingMetadata
): Promise<Metadata> {
 
  const id = params.slug
 
  // fetch data
  const res=await getThreadPosts(id)
  const data=await res.json()
 
  
 
  return {
    title: data.post.title,
  }
}
 
const Thread= async({ params }:{params:{slug:string}}) => {
 
  const token=params.slug

 

  return (
   
     <div>
     <Suspense fallback={<Loading/>}>
      <ThreadPosts token={token}/>
     </Suspense>
    
     </div>

        
  )
}

export default Thread


