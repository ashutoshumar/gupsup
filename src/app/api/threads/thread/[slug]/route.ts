import { NextRequest,NextResponse } from "next/server";
import { Thread } from "@/models/Thread";
import { Post } from "@/models/Post";
import { connectToDatabase } from "@/lib/database";
import mongoose from "mongoose";
export const GET= async(req: NextRequest, { params }: { params: { slug: string } })=>{
   
    try {
       
       
        await connectToDatabase();
        const id = params.slug
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ success: false, message: "Invalid ID format" }, { status: 400 });
          }
        const post =await Thread.findById(id).populate('threads');   // Populate threads to get post details

  

    
        
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
export const POST= async(req: NextRequest, { params }: { params: { slug: string } })=>{
    
    try {
        const threadId = params.slug
        if (!mongoose.Types.ObjectId.isValid(threadId)) {
            return NextResponse.json({ success: false, message: "Invalid ID format" }, { status: 400 });
          }
        const data = await req.json()
        const newPostData = {
                title : data.title,
                description:data.description,
                username:data.username,
                userId: data.userId,
                tags : data.tags
              }
            
              await connectToDatabase();
              const post = await Post.create(newPostData)
              const thread = await Thread.findByIdAndUpdate(  threadId,
                { $push: { threads: post._id } }, // Push newThreadId into the threads array
                { new: true, runValidators: true } // Return the updated document and run validation
            ).lean();
               if(thread)
                { return NextResponse.json({thread:thread},{status:200})}
                 else{
                   
                   return NextResponse.json({ success:false},{status:500})
                }
              
          
       
        
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success:false},{status:500})
        
    }

}


