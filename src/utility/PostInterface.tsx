import { Document, Types } from "mongoose";

// Define the structure of the tag
 type Tag = string; // Assuming tags are simple strings

// Define the structure of a single comment
 interface Comment {
  description: string;
  username?: string; // Optional, as it might not always be present
  userId: Types.ObjectId; // Reference to a User
}

// Define the main PostInterface
export interface PostInterface extends Document {
  title: string;
  description: string;
  username?: string; // Optional, in case a post is anonymous or doesn't display username
  userId: Types.ObjectId; // Reference to a User
  tags?: Tag[]; // Optional, as there may be posts without tags
  likesCount: number; // Default is 0
  bookmarksCount: number; // Default is 0
  comment: Comment[]; // Array of Comment objects
  createdAt: Date; // Automatically added by `timestamps: true`
  [key: string]: any;}
