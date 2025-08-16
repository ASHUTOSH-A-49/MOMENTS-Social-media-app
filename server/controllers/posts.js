import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js"





export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// CREATE a new post
export const createPost = async (req, res) => {
    const post = req.body;

    // Ensure tags are an array
    post.tags = typeof post.tags === 'string'
        ? post.tags.split(',').map(t => t.trim())
        : post.tags;

    const newPost = new PostMessage({...post,creator:req.userId,createdAt:new Date().toISOString()});

     try {
        await newPost.save();
        const allPosts = await PostMessage.find(); // fetch updated list
        res.status(201).json(allPosts); //  send all posts
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};
// /posts/123    = 123 is the _id part 
export const updatePost = async (req,res) =>{
    const {id:_id} = req.params;
    const post = req.body;
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id')

        const updatedPost = await PostMessage.findByIdAndUpdate(_id,{...post,_id},{new:true})

    res.json(updatedPost);
}

export const deletePost =async(req,res)=>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Post with that id')

        await PostMessage.findByIdAndDelete(id)

        res.json({message:'Post deleted successfully'})
}

export const likePost = async (req,res) =>{
    const {id} = req.params
    //later added after authentication
    if(!req.userId)  return res.json({message:'Unauthenticated'})
    //---
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Post with that id')
    
    const post = await PostMessage.findById(id)    
    //later added after authentication
    const index = post.likes.findIndex((id)=>id===String(req.userId))
    //if not found index it will return -1
    if(index===-1){
        //likes the post
        post.likes.push(req.userId)

    }else{
        //dislikes the post 
        post.likes = post.likes.filter((id)=>id!==String(req.userId))

    }
    //---
    const updatedPost = await PostMessage.findByIdAndUpdate(id,post,{new:true}) 
    res.json(updatedPost);
}