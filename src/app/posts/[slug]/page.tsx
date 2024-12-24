import Blog from "@/component/blog/Blog"
import React from "react"
import { Suspense } from "react"
import Loading from "./loading"
import type { Metadata, ResolvingMetadata } from 'next'
import { getBlog } from "@/lib/request"
 

 
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

  

  return (
   
     <div>
     <Suspense fallback={<Loading/>}>
      <Blog token={token}/>
     </Suspense>
    
     </div>

        
  )
}

export default Page


