import { NextRequest,NextResponse } from "next/server";
import { Post } from "@/models/Post";
import { connectToDatabase } from "@/lib/database";

export const GET=async(req:NextRequest)=>{
    try {

        await connectToDatabase();
      
        let tag:string|null= req.nextUrl.searchParams.get('tags')
        
    
        const post =await Post.aggregate([
            {
              $facet: {
                metadata: [{ $count: 'totalCount' }],
                data: [{ $match: {
                    tags: {
                        $elemMatch: { label: tag }
                      }
                }},{ $sort : { updatedAt:-1 } }, { $limit: 10 }],
              },
            },
          ]);
        
          // console.log(post[0].data)
         
          if(post)
            {   return NextResponse.json({data:post[0].data},{status:200})
         }
             else{
               
               return NextResponse.json({ success:false},{status:404})
            }
         
    } catch (error) {
        return NextResponse.json({ success:false},{status:500})
    }
}