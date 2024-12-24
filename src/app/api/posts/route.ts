import { NextResponse,NextRequest } from "next/server"
import { connectToDatabase } from "@/lib/database";
import { Post } from "@/models/Post";
const cloudinary = require("cloudinary");


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  
export const GET= async(req: NextRequest)=>{
   
  try {
    // Get the `order` query parameter and convert it to a number
    let order:any = req.nextUrl.searchParams.get("order");
     order= parseInt(order , 10); // Default to ascending if not provided

    // Connect to the database
    await connectToDatabase();

    // Fetch posts with sorting and limit
    const posts = await Post.find().sort({ $natural: order }).limit(5);

    // Check if posts are found
    if (posts && posts.length > 0) {
      return NextResponse.json({ post: posts, success: true }, { status: 200 });
    } else {
      return NextResponse.json({ success: false }, { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }

}

export const POST= async(req: NextRequest)=>{
    
    try {
       
        
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
              console.log(post)
              const res=await fetch('http://localhost:3000/api/tags',{
                method:"POST",
                headers:{
                  "Content-Type":"application/json"
                },
                body:JSON.stringify({
                 tags:data.tags
                })
              })
              return NextResponse.json({post:post, success:true},{status:200})
              
          
       
        
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success:false},{status:500})
        
    }

}


