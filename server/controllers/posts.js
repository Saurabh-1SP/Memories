import mongoose from "mongoose"
import PostMessage from "../models/postMessage.js"

const getPosts = async (req,res) => {

    const {page} = req.query;

    try {
        const LIMIT = 12;
        const startIndex = (Number(page)-1) * LIMIT;
        const total = await PostMessage.countDocuments({});

        const posts = await PostMessage.find().sort({_id: -1}).limit(LIMIT).skip(startIndex)

        res.status(200).json({data: posts, currentPages: Number(page),numberOfPages: Math.ceil(total/ LIMIT)});
    } catch (error) {
        res.status(404).json({ message: error.message})
    }
}

const getPost = async (req,res) => {
    const {id} = req.params;

    try {
        const post = await PostMessage.findById(id);

        res.status(200).json({data: post});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

const getPostsBySearch = async (req, res) => {
    const { searchQuery} = req.params;

    try {
        const title = new RegExp(searchQuery, 'i'); 
        const SearchPost = await PostMessage.find({title: title});

        res.json(SearchPost);
    } catch (error) {
        res.status(404).json({ message: error.message})
    }
}
const getPostsByTags = async (req, res) => {
    const { searchQuery} = req.params;

    const tags = JSON.parse(searchQuery).tags;

    try {
        const SearchPost = await PostMessage.find({tags:  {$in: tags}});

        res.json(SearchPost);
    } catch (error) {
        res.status(404).json({ message: error.message})
    }
}

const createPosts = async (req,res) => {
    const post = req.body;

    const newPost = new PostMessage({...post,creator: req.userId, createdAt: new Date().toISOString()});

    try {
        await newPost.save();

        res.status(200).json(newPost)
    } catch (error) {
        res.status(400).json({ message: error.message})
    }
}

const updatePost = async (req,res) => {
    const { id: _id} = req.params;
    const post = req.body;

    // console.log(_id)
    // console.log(post)

    try {
        if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(400).send('No post found with that id')
        
        else {
        const updatePost = await PostMessage.findByIdAndUpdate(_id, post, {new: true})
    
        res.status(200).json(updatePost);}
    } catch (error) {
        res.status(400).json(error)
    }
}

const deletePost = async (req,res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('NO Post with that id');

    await PostMessage.findByIdAndDelete(id)

    res.json({ message: 'Post deleted succesfully'})
}

const likePost = async (req, res) => { 
    const { id } = req.params;

    try {
        if(!req.userId) return res.json({message: "Unathenticated"})
    
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post foun')
    
        const post = await PostMessage.findById(id);
    
        const index = post.likes.findIndex((id) => id === String(req.userId));
    
        if(index === -1){
            post.likes(req.userId)
        }else{
            post.likes = post.likes.filter((id) => id !== String(req.userId));
        }
    
        const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {new: true})
    
        res.json(updatedPost)
    } catch (error) {
        res.status(404).json({message: error})
    }

}

export {
    getPosts,
    createPosts,
    updatePost,
    deletePost,
    likePost,
    getPostsBySearch,
    getPost,
    getPostsByTags,
}