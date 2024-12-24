import { Document } from "mongoose"

export interface TagInterface extends Document{
    label:string,
    [key: string]: any;
    
}