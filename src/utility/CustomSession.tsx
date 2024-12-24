import 'next-auth';
import mongoose from "mongoose";


 

export interface CustomSession {
  user: {
    name: string;
    image?:string | null | undefined ;
    email: string;
    about: string | null;
    role: string;
    id: string;
  } | null;
}