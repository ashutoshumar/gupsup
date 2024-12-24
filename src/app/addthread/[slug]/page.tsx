'use client'
import { useState } from 'react';
import toast, { Toaster } from "react-hot-toast";
import { Button } from '@nextui-org/react';
import { AddThreadPrevue } from '@/component/threads/thread/AddThreadPrevue';

const Page = ({ params }:{params:{ slug: string} }) => {
  const threadId=params.slug
 
  const [content, setContent] = useState('');
  const [prevue,setPrevue]=useState<boolean>(false)

  const errorNotify = (val:string) => toast.error(val);

  
  const handlePrevue = ()=>{
    if( !content )
    {
      errorNotify("All fields are necessary")
      throw Error("some thing occured")
    }
    else{
      setPrevue(!prevue)
    }
    
  }

 

  return (
  <div >
 
     {
        prevue ?( <div className='relative mt-14 w-full h-full flex items-center  justify-center '>
       
          <div className='relative w-full h-[50%] mx-5 '> 
            <AddThreadPrevue prevue={prevue}  content={content}  setPrevue={setPrevue} errorNotify={errorNotify} threadId={threadId}/>
            </div>
            </div>):(
          <div className='fixed w-full h-full flex flex-col gap-5  flex items-center  justify-center'>
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
  
 

</div>     
   
</div>
        )
      }
        <Toaster/>
    </div>
  );
};

export default Page;