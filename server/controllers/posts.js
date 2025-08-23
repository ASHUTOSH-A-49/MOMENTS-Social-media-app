import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js"





export const getPosts = async (req, res) => {
    const {page} = req.query;
    try {
        const LIMIT = 5;
        const startIndex = (Number(page)-1)*LIMIT; //get startindex of every page
        const total = await PostMessage.countDocuments({});
        

        const posts = await PostMessage.find().sort({_id:-1}).limit(LIMIT).skip(startIndex);
        res.status(200).json({data:posts,currentPage:Number(page),numberOfPages:Math.ceil(total/LIMIT)});
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


//query and params basoc difference
//QUERY - /posts?page=1 -> page  = 1
//PARAMS - /posts/:id  ---> /posts/123 -> id = 123
export const getPostsBySearch = async(req,res)=>{
    const{searchQuery,tags} = req.query;

    try {
        const title = new RegExp(searchQuery,'i'); //i is for ignore case i.e. we search for Test or TEst or test or TEST ..etc
        const posts = await PostMessage.find({$or:[{title},{tags:{$in:tags.split(',')}}]});
        res.json({data:posts})

    } catch (error) {
        
    }
}