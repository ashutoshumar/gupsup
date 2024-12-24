"use client"
import React,{FC,useState} from 'react'
import {Image,Divider,Button,Chip} from "@nextui-org/react";
import { useSession } from 'next-auth/react';
import { useRouter } from "next/navigation";
import PrevueMdx from '@/component/mdx/PrevueMdx';
import matter from 'gray-matter';
import {  putAdminPosts } from '@/lib/request';
interface Tag{
  label:string
}
interface iProp{
  id:string
  prevue:boolean
  content:string
  setPrevue:(arg:boolean) => void;
  errorNotify:(arg:string)=> void;

}


export const PrevueUpdatePosts:FC<iProp> = async({id,prevue,content:source,setPrevue,errorNotify}) => {
  const router  = useRouter()
  const [loading,setLoading]=useState(false)
  const {data:session}=useSession()
  const { data:metaData, content:greyContent } = matter(source);
  const tags:Tag[]=[]
  for(const i of metaData.tags) 
  {
     tags.push({label:i.toLowerCase()})
  }
  var today = new Date(),
            date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
           
              const handleSubmit = async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
  
    setLoading(true)
    const author:string=session?.user?.name!;
    const userId=session?.user?.id!
    console.log(userId)

    try {
    //  Send the blog post data to the server
  
      const res = await putAdminPosts(id,metaData.title,author,tags,greyContent,userId)
     
      const data = await res.json()
        console.log(data)
      if(res.ok)
      {
        
        
        console.log(res)
        router.push("/")
       
       
      }
      else
      {
        console.log(res)
        setLoading(false)
        setPrevue(!prevue)
        errorNotify(data.message)
       
      }
    } catch (error) {
     console.log(error)
     setLoading(false)
     setPrevue(!prevue)
      errorNotify("some error occured")
    }
  };
  return (
  <>
      { loading?( <div className="fixed  left-0 w-full h-full flex items-center justify-center bg-gray-900 text-white z-50">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-100"></div>
    </div>):(  
      <div className={`relative z-100 t-500 w-full h-full   flex items-center justify-center bg-gradient-to-r ${prevue ? '' : 'hidden'}`}>
    <div className=" mt-500 p-20  overflow-auto flex flex-col items-center px-20 pt-11 pb-20 bg-slate-50 max-md:px-5">
     <div className="flex gap-5 justify-between w-full  max-md:flex-wrap max-md:max-w-full">
       
         <Button onClick={()=>setPrevue(!prevue)} isIconOnly color="primary" variant="faded" aria-label="edit">
         <Image
            width={0}
            height={0}
             alt='wow'
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/08f3305b7b1f335d9bc0262e030868090d4b4378edb50db2d9fc9fdbed196fe4?apiKey=af54ddae12a9477d820f69e1b11356e3&"
              className="w-6 aspect-square"
            />
      </Button>
       
        <Button color="primary" variant="ghost" onClick={(e)=>handleSubmit(e)}>
       Update
       </Button>
       
      </div>
      <div className="rounded overflow-hidden flex flex-col ">
      
   
    
      
       
      <h1 className="mt-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"> <span className="text-blue-600 dark:text-blue-500">{metaData.title}</span> </h1>
        
       
        <Divider className="mt-4" />
        <div className="flex h-5 justify-center space-x-4 text-small">
        
        <div>{session?.user?.name}</div>
        <Divider orientation="vertical" />
        <div>{date}</div>
      </div>
      
    

      </div>
      
      <div className="flex gap-5 mt-5 max-md:flex-wrap max-md:justify-around justify-center items-center m-auto max-w-sm   text-base leading-4  ">
       {
        
        tags.map((tag:Tag)=>{
       
            return(
<div key={tag.label} className="flex flex-1   ">
         
<Chip
       
        
      >
        #{tag.label}
      </Chip>
       </div>
            )
          })
       } 
        
      </div>
      <div className="prose lg:prose-2xl   dark:prose-invert mt-5 dark:text-slate-300 font-light font-sans  max-md:mt-6 w-full">
     <PrevueMdx >{greyContent}</PrevueMdx>
</div>

  
      
    </div>
    </div>
    )}


        
    </>
  )
}
