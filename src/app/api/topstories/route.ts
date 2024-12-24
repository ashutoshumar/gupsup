import { NextRequest,NextResponse } from "next/server";
import { Post } from "@/models/Post";
import { connectToDatabase } from "@/lib/database";

export const GET=async (req:NextRequest)=>{
  let page=req.nextUrl.searchParams.get('initial')
        let pageNumber = page?parseInt(page, 10):0;
       
    try {
        await connectToDatabase()
        
        const post = await Post.aggregate([
            {
              $facet: {
                metadata: [{ $count: 'totalCount' }],
                data: [
                  
                  {$sort : { likesCount:-1 }},      // Sort by the 'length' field (descending)
                  { $skip: (pageNumber) *5 }, // Skip 0 results (for pagination)
                  { $limit: 5 }                   // Limit to 5 results
                ]
              }
            }
          ]);
        // console.log(post[0].data)
        if(post)
            {   return NextResponse.json({data:{post:post[0].data,metadata:post[0].metadata[0].totalCount}},{status:200})
         }
             else{
               
               return NextResponse.json({ success:false},{status:404})
            }
         
           
       } catch (error) {
           console.log(error)
           return NextResponse.json({ success:false},{status:500})
           
       }
      }
