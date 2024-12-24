"use client"
import React,{useState,useEffect} from 'react'
import { MdEdit ,MdDelete} from "react-icons/md";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import { deleteAdminUserById, getAdminUsers } from "@/lib/request";
import { Button } from '@nextui-org/react';
import { UserInterface } from '@/utility/UserInterface';
interface UserResponse {
  users: {
    user: UserInterface[];
    metadata: number;
  };
}
const UserLists = () => {
 
    const [users, setUsers] = useState<UserInterface[]>([]);
  const [total, setTotal] = useState(0);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [ref, inView] = useInView();
  const loadUsers = async () => {
    if (loading) return; // Prevent duplicate calls
    setLoading(true);

    try {
      const res = await getAdminUsers(offset);
      if(!res.ok )
        throw Error("Unable to load Dashboard Users")
      const data:UserResponse = await res.json();

      setUsers((prevusers) => [...prevusers, ...data.users.user]);
      setTotal(data.users.metadata);
      setOffset((prevOffset) => prevOffset + 1);
    } catch (error) {
      console.error("Error loading Users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (inView && !loading ) {
        if(users.length==0 || users.length<total  )
         loadUsers();
    }
  }, [inView, loading]); 
  const handleDelete=async(id:any)=>{
       const res =await deleteAdminUserById(id)
       if(res.ok)
       {
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
   
       }

  }
  
  return (
    <div>
        <div className="w-full gap-5 flex justify-start items-center p-5">
    <div className="w-[20%] flex justify-start items-center">Name</div>
    <div className="w-[20%] flex justify-center items-center">Email</div>
    <div className="w-[20%] flex justify-center items-center">Role</div>
    <div className="w-[20%] flex justify-center items-center">Edit</div>
    <div className="w-[20%] flex justify-end items-center">Delete</div>
  </div>
  {users.map((user: UserInterface, index: number) => (
    <div key={index} className="w-full gap-5 flex justify-between p-5">
      <div className="w-[20%]">{user.name}</div>
      <div className="w-[20%] flex justify-center items-center">{user.email}</div>
      <div className="w-[20%] flex justify-center items-center">{user.role}</div>
      <div className="w-[20%] flex justify-end items-center">
        <Link href={`/dashboard/update/users/${user._id}`}>
          <MdEdit />
        </Link>
      </div>
      <div className="w-[20%] flex justify-end items-center">
       <Button color="primary" onClick={()=>handleDelete(user._id)}>
        Delete
        </Button> 
      </div>
    </div>
  ))}
  {/* Infinite scroll trigger */}
  <div ref={ref} className="my-10 w-full">
    {users && users.length < total && <div>Loading...</div>}
  </div>
  </div>
  )
}

export default UserLists