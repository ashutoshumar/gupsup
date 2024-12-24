import { NextResponse,NextRequest } from "next/server"
import { connectToDatabase } from "@/lib/database";
import { Thread } from "@/models/Thread";
const cloudinary = require("cloudinary");


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  
  
  
  export const GET= async(req: NextRequest)=>{
     
      try {
         
        
          await connectToDatabase();
          let page = req.nextUrl.searchParams.get("initial");
          const pageNumber = page ? parseInt(page, 10) : 0;
       const post =await Thread.aggregate([
              {
                $facet: {
                  metadata: [{ $count: 'totalCount' }],
                  data: [{ $sort : { updatedAt:-1 } },{ $skip: (pageNumber) *3 }, { $limit: 3 }],
                },
              },
            ]);
         
  
          if(post)
           {   return NextResponse.json({threads:{post:post[0].data,metadata:post[0].metadata[0].totalCount}},{status:200})
        }
            else{
              
              return NextResponse.json({ success:false},{status:404})
           }
        
          
      } catch (error) {
          console.log(error)
          return NextResponse.json({ success:false},{status:500})
          
      }
  
  }
  

export const POST= async(req: NextRequest)=>{
    
    try {
       
       
        const data = await req.json()
        if(data.image)
            {
                
                const myCloud = await cloudinary.v2.uploader.upload(data.image, {
                    folder: "blog",
                    width: 150,
                    crop: "scale",
                  });
                  const image = {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url,
                  };
                  const newThreadData = {
                    title : data.title,
                    image:image,
                    description:data.description,
                    username:data.username,
                    userId:data.userId
                  }
                await connectToDatabase();
                  const thread = await Thread.create(newThreadData)
                  if(thread)
                    { return NextResponse.json({thread:thread},{status:200})}
                     else{
                       
                       return NextResponse.json({ success:false},{status:500})
                    }
                  
                
            } 
        
            
              
         
            return NextResponse.json({message:"messing image", success:false},{status:500})
             
         
              
          
       
        
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success:false},{status:500})
        
    }

}