import { NextRequest,NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/database";
import { Tags } from "@/models/Tags";
export const GET=async()=>{
    try {

        await connectToDatabase();
        console.log("tag")
       
            const tags=await Tags.find( {
            "label": {
    $ne: "editor_choice"}
  }).sort({ count: -1 }).limit(15)
            // console.log(tags)
            if(tags)
                { return NextResponse.json({tags:tags},{status:200})}
                 else{
                   
                   return NextResponse.json({ success:false},{status:404})
                }
        
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success:false},{status:500})
        
    }

}

export const POST= async(req:NextRequest)=>{

    try {

        await connectToDatabase();
        const tags = await req.json()
        for(const tag of tags.tags)
    {
            const res=await Tags.findOneAndUpdate({ label: tag.label },       // filter: find the user by name
                { $inc: { count: 1 } },{ new: true })
                if(!res)
                {
                    const Tag=await Tags.create({label:tag.label,count:1})
                    

                }
            
        }
        return NextResponse.json({ success:true},{status:200})
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success:false},{status:500})
        
    }
}