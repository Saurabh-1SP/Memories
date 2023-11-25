import axios from 'axios'

// const API = axios.create({baseURL: 'https://memories-96r5.onrender.com'})
const API = axios.create({baseURL: "http://localhost:5000"})

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }

    return req;
})

export const fetchPosts = (page) => API.get(`/posts?page=${page}`)

export const fetchPost = (id) => API.get(`/posts/${id}`)

export const createPost = (newPost) => API.post('/posts',newPost)

export const updatePost = (id, updatePost) => API.patch(`/posts/${id}`,updatePost);

export const deletePost = (id) => API.delete(`/posts/${id}`);

export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const createComment = (comment,id) => API.patch(`/posts/comment/${id}`, comment)

export const fetchPostsBysearch = (searchQuery) => API.get(`/posts/search/${searchQuery}`);

export const fetchPostsByTags = (searchQuery) => API.get(`/posts/search/tag/${JSON.stringify(searchQuery)}`)

export const signIn = (formData)  => API.post('/user/signin',formData)

export const signUp = (formData)  => API.post('/user/signup',formData)

export const googleSignIn = (data) => API.post('/user/google/signin',data)

export const fetchUser = (id) => API.get(`/user/${id}`)