import { NextRequest,NextResponse } from "next/server";
import { Post } from "@/models/Post";
import { connectToDatabase } from "@/lib/database";
import { Like } from "@/models/Like";
import { getServerSession } from "next-auth";
import { authOption } from "../../auth/[...nextauth]/route";
import mongoose from "mongoose";
export const GET = async (req:NextRequest,{ params }: { params: { slug: string } })=>
  {
      const id = params.slug
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({ success: false, message: "Invalid ID format" }, { status: 400 });
      }
      const session =await getServerSession(authOption)
      if(session && session.user)
      {
      const userId = session.user.id
      await connectToDatabase()
      try {
          // Check if the user has already liked the post
          const existingLike = await Like.findOne({ userId, postId: id });
      
          if (existingLike) {
              return NextResponse.json({message:"you like it", success:true},{status:200})
          }
      
          
         
          return NextResponse.json({message:"not found", success:false},{status:404})
        } catch (error) {
          console.log(error)
          return NextResponse.json({ success:false},{status:500})
        }
      }else
      {
        return NextResponse.json({ success:false},{status:401})

      }
  
  }
  
    
  

export const POST = async (req:NextRequest,{ params }: { params: { slug: string } })=>
{
    const id = params.slug
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, message: "Invalid ID format" }, { status: 400 });
    }
    const session=await getServerSession(authOption)
      if(session && session.user)
      {
      const userId = session.user.id
      await connectToDatabase()
      try {
        // Check if the user has already liked the post
        const existingLike = await Like.findOne({ userId, postId: id });
    
        if (existingLike) {
            const like = await Like.findOneAndDelete({ userId, postId: id });
            await Post.findByIdAndUpdate(id, { $inc: { likesCount: -1 } });
            return NextResponse.json({message:"like removes", success:true},{status:200})
        }
    
        // Create a new like
        await Like.create({ userId, postId: id });
    
        // Increment the likesCount in the Post
        await Post.findByIdAndUpdate(id, { $inc: { likesCount: 1 } });
    
        return NextResponse.json({message:"liked", success:true},{status:200})
      } catch (error) {
        console.log(error)
        return NextResponse.json({ success:false},{status:500})
      }
    }
    else
    {
      return NextResponse.json({ success:false},{status:401})

    }

}

  

