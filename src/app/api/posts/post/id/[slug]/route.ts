import { NextResponse,NextRequest } from "next/server"
import { connectToDatabase } from "@/lib/database";
import { Post } from "@/models/Post";
import mongoose from "mongoose";
export const GET= async(req: NextRequest, { params }: { params: { slug: string } })=>{
   
    try {
       
       
        await connectToDatabase();
        const id = params.slug
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ success: false, message: "Invalid ID format" }, { status: 400 });
          }
        const post =await Post.findById(id)
         if(post)
         { return NextResponse.json({post:post},{status:200})}
          else{
            
            return NextResponse.json({ success:false},{status:404})
         }
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success:false},{status:500})
        
    }

}

