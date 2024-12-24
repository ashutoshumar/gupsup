import mongoose,{Document,model,models,Schema} from "mongoose";

interface TagInterface extends Document{
    label:string,
    count:number
    
}

const TagsSchema = new Schema<TagInterface>(
   { 
    label:{
        required:true,
        type:String
    },
    count:{
        required:true,
        type:Number
    }
}
)
export const Tags = models.Tags || model<TagInterface>("Tags",TagsSchema)