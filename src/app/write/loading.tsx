import React from 'react'
const Loading = () => {
  return (
   
    <div className="fixed top-14 left-0 w-full h-full flex items-center justify-center bg-gray-900 text-white z-50">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-100"></div>
    </div>
   
 
)
}

export default Loading



{/* return (
    <div className='fixed  w-full h-full flex items-center  justify-center '>
     <div className="flex flex-col w-full h-[70%] mx-5  ">
    <div className="mt-5 w-full h-full max-md:max-w-full ">
        <div className="flex h-full gap-5 max-md:flex-col max-md:gap-0 ">
          <div className="flex flex-col w-[24%] h-[100%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col  ml-5 px-5 text-base font-medium leading-6 text-black max-md:mt-2.5">
            
       
       
            <div className="space-y-3">
         <Skeleton className="h-7 mt-2 w-2/5 rounded-lg"/>
         <Skeleton className="h-8 w-4/5 rounded-lg"/>
         <Skeleton className="h-8 w-4/5 rounded-lg"/>
        
</div>
  
     
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[76%] h-200  max-md:ml-0 max-md:w-full">
          <Skeleton className="rounded-lg h-full">
           <div className="h-24 w-full rounded-lg bg-default-300"></div>
           </Skeleton>
          </div>
         
        </div>
        <div className='absolute right-5 mt-5 '>
        <Skeleton className="h-10 w-20 rounded-lg">
        <div className=" rounded-lg bg-default-200"></div>
        </Skeleton>
         
        </div>
      </div>
    </div>
 
</div>
    

  )*/}