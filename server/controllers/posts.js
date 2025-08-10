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

    const newPost = new PostMessage(post);

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