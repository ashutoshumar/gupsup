"use client"
import React, { useState, useEffect } from 'react'
import { getViewPosts } from '@/lib/request'
import TagPostSuspense from './posts/TagPostSuspense'
import TagPostCard from './posts/TagPosts'
import NoContentFound from '../NoContentFound'
import { PostInterface } from '@/utility/PostInterface'
const TagLeft = ({ value }: { value: string }) => {
  const [posts, setPosts] = useState<PostInterface[]>([])
  const [loading, setLoading] = useState(true)
  
  const loadPosts = async (value: string) => {
    const apiPost = await getViewPosts(value)
    if (!apiPost.ok) {
      return <TagPostSuspense />
    }
    const data = await apiPost.json()
    setPosts(data.data)
    setLoading(false)
  }
  
  useEffect(() => {
    setLoading(true)
    loadPosts(value)
  }, [value])
  
  return (
    <div className='flex flex-col w-full h-full justify-center items-center'>
      <div className="font-bold text-4xl text-blue-500 text-transform: capitalize my-10"> 
        {value}
      </div>
      <div className="w-full">
        {
          loading ? <TagPostSuspense /> : 
          (posts.length > 0 ? 
            posts.map((post: PostInterface, index: number) => (
              <TagPostCard key={post.title} post={post} />
            )) : 
           < NoContentFound/>
          )
        }
      </div>
    </div>
  )
}

export default TagLeft
