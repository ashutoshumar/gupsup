import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/database";
import { User } from "@/models/User";
import bcrypt from "bcryptjs"
export const POST =async  (req: Request )=>{
    try {
        const {user}=await req.json()
       
        const name=user.name
        const email=user.email
        const hashedPassword = await bcrypt.hash(user.password,10)
        await connectToDatabase();
        
        const res =await User.findOne({email:user.email})
        if(res)
          return NextResponse.json({message:"User Already Exists"},{status:302})
        const data = await User.create({name,email,password:hashedPassword})
        if(data){
            console.log(data)
            return NextResponse.json({ success:true},{status:200})
         }
         else{
            
            return NextResponse.json({ success:false},{status:500})
         }
       
       
        
       
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success:false},{status:500})
    }

}