import React from "react";
import {Skeleton,Card} from "@nextui-org/react";

export default function EditorListSuspense() {
  return (
      
    <div className='flex flex-col gap-4'><Card >
    <div className="space-y-3 w-full flex flex-col justify-center item-center my-5">
    <Skeleton className=" w-4/5  rounded-lg mx-auto">
         <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
       </Skeleton>
       <Skeleton className=" w-4/5  rounded-lg mx-auto">
         <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
       </Skeleton>
       
     </div>
    </Card>
    <Card>
    <div className="space-y-3 w-full flex flex-col justify-center item-center my-5">
        
    <Skeleton className=" w-4/5  rounded-lg mx-auto">
         <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
       </Skeleton>
       <Skeleton className=" w-4/5  rounded-lg mx-auto">
         <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
       </Skeleton>
     </div>
    </Card>
    </div>
  );
}
