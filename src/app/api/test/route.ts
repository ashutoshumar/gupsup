import { NextRequest,NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/database";
import { Post } from "@/models/Post";
import { User } from "@/models/User";

export const GET=async()=>{
    try {

        await connectToDatabase();
      const tags =await  User.updateMany({}, { $set: { resetTokenExpiry: null } }) // Add "views" field with a default value of 0 to all posts
  

            if(tags)
                { return NextResponse.json({tags:tags},{status:200})}
                 else{
                   
                   return NextResponse.json({ success:false},{status:500})
                }
        
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success:false},{status:500})
        
    }

}

