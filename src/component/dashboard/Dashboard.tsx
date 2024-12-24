"use client";
import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import UserLists from "./user/UserLists";
import PostLists from "./posts/PostLists";
const Dashboard = () => {
  const [user,setUser] = useState(true)

 
  
  return (
    <div className="w-full h-full p-5 ">
       <div className='w-full my-4 bg-blue  px-10 flex justify-end'>
    <Button onClick={()=>setUser(true)} size="lg" radius="none" color={user? "primary":"default"} className= { 'w-1/2 '}>
        User
      </Button> 
      <Button onClick={()=>setUser(false)} size="lg" radius="none" color={user? "default":"primary"} className= { 'w-1/2  '}>
        Post
      </Button> 
  
    </div> 
      
    {
    user?<UserLists/>:<PostLists/>
    } 
    </div>
  );
};

export default Dashboard;
