import { NextResponse,NextRequest } from "next/server"
import { connectToDatabase } from "@/lib/database";
import { User } from "@/models/User";
const cloudinary = require("cloudinary");
import { getServerSession } from 'next-auth'
import { authOption } from "@/utility/auth";
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  
export const GET= async(req: NextRequest)=>{
   
    try {
       
        const email = req.nextUrl.searchParams.get("email");
        await connectToDatabase();
        const user =await User.findOne({email:email})
        if(user)
         { return NextResponse.json({user:user},{status:200})}
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
        
        const session = await getServerSession(authOption)
        const data = await req.json()
        const user = await User.findById(data.id);
        if( data.image)
        {
            if(user && user.picture)
            {
                if(user.picture.public_id)
                await cloudinary.v2.uploader.destroy(user.picture.public_id);
            }
            const myCloud = await cloudinary.v2.uploader.upload(data.image, {
                folder: "blog",
                width: 150,
                crop: "scale",
              });
              const picture = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
              };
           
              const newUserData = {
                name : data.name,
                about : data.about,
                picture : picture
              }
              const updatedUser = await User.findByIdAndUpdate(data.id, newUserData, {
                new: true,
                runValidators: true,
                useFindAndModify: false,
              })
              if(session)
             { 
              const user = {
                name : updatedUser.name,
                email : updatedUser.email,
                about : updatedUser.about,
                id : updatedUser._id,
                image : updatedUser.picture.url,
                role: updatedUser.role
              }
              session.user = user;
             }
            }
        else
        {
            const newUserData = {
                name : data.name,
                about : data.about
            
              }
              const updatedUser = await User.findByIdAndUpdate(data.id, newUserData, {
                new: true,
                runValidators: true,
                useFindAndModify: false,
              })
              
              if(session)
              { 
               const user = {
                 name : updatedUser.name,
                 email : updatedUser.email,
                 about : updatedUser.about,
                 id : updatedUser._id,
                 image : updatedUser.picture.url,
                 role :updatedUser.role
               }
               session.user = user;
              }
         }
        return NextResponse.json({ success:true},{status:200})
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success:false},{status:500})
        
    }

}