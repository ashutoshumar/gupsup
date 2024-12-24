import mongoose, { Document, model, models, Schema } from 'mongoose';
import { Post } from './Post';  // Import Post model
import { User } from './User';
// Define the interface for the Thread document
 interface ThreadInterface extends Document {
    title: string;
    image: {
        public_id?: string;  // Made optional
        url?: string;        // Made optional
    };
    description:string;
    username: string;
    userId: mongoose.Schema.Types.ObjectId;
    threads: mongoose.Schema.Types.ObjectId[];  // Array of ObjectIds referring to Post
}

// Define the schema for the Thread model
const ThreadSchema = new Schema<ThreadInterface>(
    {
        title: {
            type: String,
            required: true,
        },
        image: {
            public_id: {
                type: String,
                default: null,  // Provide a default value
            },
            url: {
                type: String,
                default: null,  // Provide a default value
            }
        },
        description:{
            type:String,
            required:true
        },
        username: {
            type: String,
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',  // Ensure you have a User model if referring to users
        },
        threads: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',  // Reference to the Post model
            default: [],  // Provide a default empty array
        }],
        
    
    },
    {
        timestamps: true, 
        strict:false 
    }
);

// Export the Thread model, or create a new one if it doesn't exist
export const Thread = models.Thread || model<ThreadInterface>('Thread', ThreadSchema);
