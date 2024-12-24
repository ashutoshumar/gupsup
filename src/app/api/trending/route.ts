import { NextResponse,NextRequest } from "next/server"
import { connectToDatabase } from "@/lib/database";
import { Post } from "@/models/Post";

export const GET= async(req: NextRequest)=>{
  let page=req.nextUrl.searchParams.get('initial')
  let pageNumber = page?parseInt(page, 10):0;

    try {
       
      
        await connectToDatabase();
         const post =await Post.aggregate([
            {
              $facet: {
                metadata: [{ $count: 'totalCount' }],
                data: [{ $sort : { updatedAt:-1 } },{ $skip: (pageNumber) *5 }, { $limit: 5 }],
              },
            },
          ]);
       
        if(post)
         {   return NextResponse.json({posts:{post:post[0].data,metadata:post[0].metadata[0].totalCount}},{status:200})
      }
          else{
            
            return NextResponse.json({ success:false},{status:404})
         }
      
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success:false},{status:500})
        
    }

}
