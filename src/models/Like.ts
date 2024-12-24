import mongoose, {  Document, model, models, Schema } from 'mongoose';
import { Post } from './Post';
 interface LikeInterface extends Document {
   
    userId:mongoose.Schema.Types.ObjectId,
    postId:mongoose.Schema.Types.ObjectId,
    

    
}
const likeSchema = new Schema<LikeInterface>(
{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
   
  });
  
  likeSchema.index({ userId: 1, postId: 1 }, { unique: true }); // Ensure one like per user per post
  
  export const Like = models.Like || model<LikeInterface>('Like',likeSchema)