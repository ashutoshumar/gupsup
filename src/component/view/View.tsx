"use client"
import React,{useState,useEffect} from 'react'
import { getViewPosts } from '@/lib/request'
import ViewPostCard from './ViewPostCard'
import ViewSuspense from './ViewSuspense'
import NoContentFound from '../NoContentFound'
import { PostInterface } from '@/utility/PostInterface'
const  View= ({initialView}:{initialView:string}) => {
    const [posts,setPosts]=useState<PostInterface[]>([])
    const [loading,setLoading]=useState(true)
    
   
    const loadMorePosts = async()=>{
        const apiPost=await getViewPosts(initialView)
        if(!apiPost.ok)
        {
           
            return
        }
        const data=await apiPost.json()
        
        setPosts([...data.data])
        setLoading(false)
      
    }
   console.log(posts)
    useEffect(
        ()=>{
             setLoading(true)
            loadMorePosts()
            // setLoading(false)
           
        },[initialView])
  return (
    // <div className='border-5 mt-14 w-[75%] overflow-y-auto scroll-smooth flex items-center flex-col gap-3 mx-auto '>
    //   <div className='overflow-y-auto scroll-smooth border-8'> {
    //       loading ? <ViewSuspense/>:
            
    //        posts && posts.map((post:any,index:any)=>(
    //         <ViewPostCard key={post.title} post={post}/>
    //     ))
    //     }
    //     </div> 
     
    //   {/* <button onClick={loadMoreUsers}>Load more</button> */}
    // </div>
    <div className='mt-10 w-[75%]  flex items-center flex-col gap-2 mx-auto '>
   

    <div
        className="w-full">
        {
          loading ? <ViewSuspense/>:
        
          (posts && posts.length > 0 ? 

            
           posts && posts.map((post:PostInterface,index:number)=>(
            <ViewPostCard key={post.title} post={post}/>
        )) : 
        < NoContentFound/>
       )
        }
    </div>
</div>
  )
}

export default View