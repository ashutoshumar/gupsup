import React from "react";
import {Card, Skeleton} from "@nextui-org/react";

export default function CardSkeleton() {
  return (
    <div className="gap-2 grid grid-cols-2 justify-end sm:grid-cols-5 mx-10">
      {Array.from({length:5}).map((_, index:any) => (
    <Card key={index} className="w-[250px] space-y-5 p-4" radius="lg">
     
      <div className="space-y-3">
        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-2/5 rounded-lg">  
          <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
        </Skeleton>
      </div>
      <Skeleton className="rounded-lg">
        <div className="h-24 rounded-lg bg-default-300"></div>
      </Skeleton>
    </Card> ))}
    </div>
  );
}
