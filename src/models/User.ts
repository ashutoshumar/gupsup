import { Document, model, models, Schema } from 'mongoose';

 interface UserDocument extends Document {
    name: string;
    email: string;
    password: string;
    about:string;
    provider:string;
    picture:{
      public_id:string,
      url:string,
    };
    role:string;
    resetToken:string;
    resetTokenExpiry:Date
   
  }
  

  const userSchema = new Schema<UserDocument>(
    {
      name: {
        type: String,
        trim: true,
        required: true,
      },
      email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
      },
      password: {
        type: String,
        required: true,
        
      },
      about:{
        type:String,
        default:"Please Tell Us About Yourself"
      },
      provider:{
        type: String,
      },
      picture: {
        public_id: {
          type: String,
          
        },
        url: {
          type: String,
          
        },
      },
      role:{
        type:String,
        default:"user"
      }, 
      resetToken: {
        type: String,
        default: null,
      },
      resetTokenExpiry: {
        type: Date,
        default: null,
      },
    },
    { timestamps: true ,
      strict:false 
    }
  );
  

  export const User = models?.Users || model<UserDocument>('Users', userSchema);