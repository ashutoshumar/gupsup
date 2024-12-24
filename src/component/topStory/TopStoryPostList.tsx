"use client"
import React,{useState,useEffect} from 'react'
import TopStoryPostCard from './TopStoryPostCard'
import { getTopPosts } from '@/lib/request'
import { useInView } from 'react-intersection-observer'
import TopStoryPostCardSkeleton from './TopStoryPostCardSkeleton'
import { PostInterface } from '@/utility/PostInterface'
const TopStoryPostList = ({initialPosts}:{initialPosts:PostInterface[]}) => {
    const [posts,setPosts]=useState<PostInterface[]>(initialPosts)
    const [total,setTotal]=useState(0)
    const [offset,setOffset]=useState(1);
    const [ref,inView]=useInView()
   
    const loadMorePosts = async()=>{
        const apiPost=await getTopPosts(offset)
        if(!apiPost.ok)
        {
          throw Error("some thing went wrong")
          
        }
        const data=await apiPost.json()
        setPosts([...posts,...data.data.post])
        setTotal(data.data.metadata)
        setOffset(offset+1)
    }
  
    useEffect(
        ()=>{
            if(inView)
            {
                loadMorePosts()
            }
        },[inView])

     
  return (
    <div className="mt-20 w-[70%]   lg:w-[75%] xl:w-[70%] h-full flex justify-center items-center flex-col gap-3 mx-auto px-4 sm:px-2">
    {/* Render posts */}
    {posts.map((post: PostInterface, index: number) => (
      <TopStoryPostCard key={index} post={post} />
    
    ))}

    {/* Infinite scroll trigger */}
    <div ref={ref} className="my-10 w-full ">
      {posts && posts.length < total && (
        <div>
          <TopStoryPostCardSkeleton />
        </div>
     )} 
    </div>
  </div>
  )
}

export default TopStoryPostList