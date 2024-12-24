"use client";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useSession } from "next-auth/react";

const ThreadHero = ({
  id,
  title,
  description,
 
}: {
  id: string;
  title: string;
  description: string;
 
}) => {
  const { data: session } = useSession();

  return (
    <div className="w-full h-full flex   justify-center items-center">
      
      <main className="flex    justify-center items-center h-full">
     
          <div className=" flex flex-col  justify-center items-center">
        <div className="flex flex-col my-5 justify-center items-center ">
         <h1 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl md:text-4xl lg:text-5xl">
            <motion.span className="block text-blue-500">{title}</motion.span>
          </h1>
         
          </div>
          <p className="prose-4xl my-3 text-2xl text-black w-1/2">
            {description}
          </p>
          <div className=" w-full flex flex-col justify-center items-end ">
         
         
        {session && session.user?.email === "ashu@gmail.com" && (
            <div className="mx-4 md:mx-16">
             <Button size="lg"  color="primary" variant="ghost">
   
                <Link href={`/addthread/${id}`}>Add</Link>
              </Button>
            </div>
          )}
     
          </div>
        
       
        
        </div>
      </main>
    </div>
  );
};

export default ThreadHero;
