import { NextRequest,NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/database";
import { Like } from "@/models/Like";
import { getServerSession } from "next-auth";
import { authOption } from "@/utility/auth";
export const GET = async (req:NextRequest,{ params }: { params: { slug: string } })=>
  {
     
      const session=await getServerSession(authOption)
      
      if(session && session.user)
        {
      const userId = session.user.id

      await connectToDatabase()
      try {
       
          // Check if the user has already liked the post
          const likedPost = await Like.find({userId})
          .populate("postId") // Populate the `postId` field with the actual post document
          .exec();
      
          if (likedPost) {
            
            const posts = likedPost.map((like) => like.postId);
             console.log(posts)
              return NextResponse.json({posts:posts, success:true},{status:200})
          }
      
          
         
          return NextResponse.json({message:"not found", success:false},{status:404})
        } catch (error) {
          console.log(error)
          return NextResponse.json({ success:false},{status:500})
        }}
        else{
          return NextResponse.json({ success:false},{status:401})

        }
      
  
  }
  
    
  
