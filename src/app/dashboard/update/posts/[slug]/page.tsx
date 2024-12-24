
import React from "react"
import { Suspense } from "react"
import Loading from "./loading"
import type { Metadata, ResolvingMetadata } from 'next'
import { getBlog } from "@/lib/request"
import UpdatePost from "@/component/dashboard/posts/UpdatePosts"
 
export async function generateMetadata(
  { params }:{params:{slug:string}},
  parent: ResolvingMetadata
): Promise<Metadata> {
 
  const id = params.slug
 
  // fetch data
  const res=await getBlog(id)
  const data=await res.json()
 
  
 
  return {
    title: data.post.title,
  }
}
 
const Page= async({ params }:{params:{slug:string}}) => {
  const token=params.slug
  
  const res=await getBlog(token)
  if(!res.ok)
  {
    throw Error("unable to load post")
  }
  const data=await res.json()
 

  return (
   
    <div>
     <Suspense fallback={<Loading/>}>
     <UpdatePost  post={data.post}/>
     </Suspense>
    
     </div>

        
  )
}

export default Page


