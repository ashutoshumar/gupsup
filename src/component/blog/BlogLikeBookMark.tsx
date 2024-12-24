"use client"
import React,{useState,useEffect} from 'react'
import {Divider,Chip} from "@nextui-org/react";
import { BiSolidLike } from "react-icons/bi"
import { CiBookmark } from "react-icons/ci";
import { MdOutlineBookmark } from "react-icons/md";
import { AiOutlineLike } from "react-icons/ai";
import { postLike,getLike, postBookMark,getBookMark } from '@/lib/request';
const BlogLikeBookMark = ({likeCount,bookMarkCount,name,date,postId}:{
    
    likeCount:number,
    bookMarkCount:number,
    name:string,
    date:Date,
    postId:string
}) => {
    const [like,setLike]=useState<boolean>()
    const [bookMark,setBookMark]=useState<boolean>()
    const [likesCount,setLikeCount]=useState(likeCount)
    const [bookMarksCount,setBookMarksCount]=useState(bookMarkCount)
    const likeHandle=()=>{
      setLike(!like)
      if(like)
        { 
          postLike(postId)
          setLikeCount(likesCount-1)
           
        }
      else
      { 
        postLike(postId)
        setLikeCount(likesCount+1)
        
      }
     
    }
    const bookmarkHandle=()=>{
      setBookMark(!bookMark)
      if(bookMark)
        { 
          postBookMark(postId)
          setBookMarksCount(bookMarksCount-1)
           
        }
      else
      { 
        postBookMark(postId)
        setBookMarksCount(bookMarksCount+1)
          
      }
     
    }
    const getData = async()=>{
      const req1=await getLike(postId)
      if(!req1.ok)
      {
         setLike(false)
          
      }
      else{
      setLike(true)
      }
      const req2 =await getBookMark(postId)
      if(!req2.ok)
      {
        setBookMark(false)
        
      }
      else
      {
        setBookMark(true)
      }
    
  }
    useEffect((()=>{
      getData()
      setBookMarksCount(bookMarkCount)
      setLikeCount(likeCount)

    }),[])
  return (
    <div className='w-full'> <div className="flex h-5 w-full justify-between space-x-4 text-small">
    <div className='flex gap-8 justify-center items-center' >
         
          <div  className='flex justify-center items-center '>
          <div onClick={()=>likeHandle()} className=' cursor-pointer text-large' >{like?<BiSolidLike />:<AiOutlineLike/>}
          </div>
          <span className='text-tiny uppercase font-bold p-1'>{likesCount}</span>
            </div>
            <div  className='flex justify-center items-center '>
          <div onClick={()=>bookmarkHandle()} className=' cursor-pointer text-large' >{bookMark?<MdOutlineBookmark/>:<CiBookmark/>}
          </div>
          <span className='text-tiny uppercase font-bold p-1'>{bookMarksCount}</span>
            </div>
            </div>
            <div className='flex justify-center items-center gap-3'>
    <div>{name}</div>
    <Divider orientation="vertical" />
    <div>{date.toISOString().split('T')[0]}</div>
    </div>
    </div></div>
  )
}

export default BlogLikeBookMark