import mongoose, {  Document, model, models, Schema } from 'mongoose';

 interface BookMarkInterface extends Document {
   
    userId:mongoose.Schema.Types.ObjectId,
    postId:mongoose.Schema.Types.ObjectId,
    

    
}
const BookMarkSchema = new Schema<BookMarkInterface>(
{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
   
  });
  
  BookMarkSchema.index({ userId: 1, postId: 1 }, { unique: true }); // Ensure one BookMark per user per post
  
  export const BookMark = models.BookMark || model<BookMarkInterface>('BookMark',BookMarkSchema)