'use client'
import React from 'react'
import { Dispatch,SetStateAction } from 'react';
import {Button} from "@nextui-org/react";
const Post = ({content,setContent,handlePrevue}:{
    content:string,setContent:Dispatch<SetStateAction<string>>,
    handlePrevue:()=>void
}) => {
  return (
    <div className="flex flex-col p-5  w-full h-[70%] mx-5  max-md:max-w-full">
   

        
    <div className="flex flex-col ml-5 w-[86%] h-full  max-md:ml-0 max-md:h-full max-md:w-full">
      <textarea placeholder=" write..." value={content} onChange={e=>{setContent(e.target.value)}} className="grow justify-center self-stretch px-4 py-3 w-full text-base font-medium leading-6 whitespace-nowrap bg-white rounded-lg border border-solid shadow-sm border-neutral-200 text-zinc-500 max-md:mt-2 max-md:max-w-full">
        
      </textarea>
      <div className='absolute right-8  '>
   <Button  onClick={handlePrevue} color="primary" variant="ghost">
   Preview
   </Button> 
   
  </div>
    </div>
   
  {/* </div> */}

{/* </div> */}

</div>
  )
}

export default Post