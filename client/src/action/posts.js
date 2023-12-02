import * as api from '../api'
import { create, delet, end_loading, fetch, fetchpost, fetch_by_search, like, start_loading, update, addComment } from '../constants/actions';


export const getPosts = (page) => async (dispatch) => {

    try {
        dispatch({type: start_loading});
        const { data } = await api.fetchPosts(page);

        dispatch({type: fetch, payload: data});
        dispatch({type: end_loading})
    } catch (error) {
        console.log(error);
    }
}
export const getPost = (id) => async (dispatch) => {

    try {
        dispatch({type: start_loading});
        const { data } = await api.fetchPost(id);

        dispatch({type: fetchpost, payload: data});
        
        setTimeout(()=>dispatch({type: end_loading}),200)
    } catch (error) {
        console.log(error);
    }
}

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({type: start_loading});
        console.log(searchQuery)
        const data = await api.fetchPostsBysearch(searchQuery);

        dispatch({type: fetch_by_search, payload: data});
        dispatch({type: end_loading})
    } catch (error) {
        console.log(error);
    }
}
export const getPostsByTags = (searchQuery) => async (dispatch) => {
    try {
        dispatch({type: start_loading});
        const data = await api.fetchPostsByTags(searchQuery);
        
        dispatch({type: fetch_by_search, payload: data});
        // dispatch({type: end_loading})
        setTimeout(()=>dispatch({type: end_loading}),200)

    } catch (error) {
        console.log(error);
    }
}

export const createPost = (post,history) => async (dispatch) => {
    try {
        dispatch({type: start_loading});
        const {data} = await api.createPost(post);

        history(`/post/${data._id}`)

        dispatch({ type: create, payload: data})
    } catch (error) {
        console.log(error.message)
    }
}

export const updatePost = (id,post) => async ( dispatch) =>{
    try {
        const { data } = await api.updatePost(id, post);

        dispatch({type: update, payload: data})

    } catch (error) {
        console.log(error)
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);

        dispatch({ type: delet , payload: id});
    } catch (error) {
        console.log(error)
    }
}
export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id)

        dispatch({ type: like , payload: data});
    } catch (error) {
        console.log(error)
    }
}

export const createComment = (comment,id) => async (dispatch) => {
    try {
        const {data} = await api.createComment(comment,id)

        dispatch({type: addComment, payload: data})
    } catch (error) {
        console.log(error)
    }
}