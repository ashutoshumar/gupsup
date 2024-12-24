import mongoose, { Document, model, models, Schema } from 'mongoose';
interface tag{
    label:string
}
 interface PostInterface extends Document {
    title:string,
    description:string,
    username:string,
    userId:mongoose.Schema.Types.ObjectId,
    tags:Array<tag>,
    likesCount:number,
    bookmarksCount:number,
    comment:[{
        description:string,
        username:string,
        userId:mongoose.Schema.Types.ObjectId,
    }]

}
const PostSchema = new Schema<PostInterface>(
    {
        title:{
            type:String,
            required:true,
           
        },
        description:{
            type:String,
            required:true, 
            
        },
        username: {
            type: String,
            
          },
      
         userId:{
          type:mongoose.Schema.Types.ObjectId,
          required:true,
          ref: 'User'},

          tags:Array<tag>,
          likesCount: { type: Number, default: 0 },
          bookmarksCount: { type: Number, default: 0 } ,

         comment: [{
            description: {
              type: String,
              
            },
             username: {
              type: String,
              
            },
        
           userId:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,}
        }]
         
            
    },

    { timestamps: true,strict:false  }
)

export const Post = models.Post || model<PostInterface>('Post', PostSchema);