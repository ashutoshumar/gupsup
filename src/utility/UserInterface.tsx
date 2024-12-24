import { Document, Types } from "mongoose";

export interface UserInterface extends Document {
  name: string;
  email: string;
  about: string;
  provider?: string;
  picture?: {
    public_id?: string;
    url?: string;
  };
  role: string;
  createdAt: Date; // Automatically added by `timestamps: true`
  [key: string]: any;}
