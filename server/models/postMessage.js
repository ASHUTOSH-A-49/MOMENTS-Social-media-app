import mongoose, { mongo } from "mongoose";

const postSchema = mongoose.Schema({
    title:String,
    message:String,
    creator:String,
    name:String,
    tags: {
        type: [String],
        default: []
    },

    selectedFile: String, //convert image to string format to upload 
    likes:{
        type:[String],
        default:[]
    },
    comments:{
        type:[String],
        default:[]
    },
    createdAt:{
        type:Date,
        default:new Date()
    }
})

//converting schema to model
//model<any>(name: string, schema?: any)

const PostMessage = mongoose.model('PostMessage',postSchema);

export default PostMessage;