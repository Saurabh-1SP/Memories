import { create, delet, end_loading, fetch, fetchpost, fetch_by_search, like, start_loading, update, addComment } from "../constants/actions";


const postReducer = (state = { isLoading: true, posts: [],post: []}, action) => {
    switch (action.type) {
        case fetch:
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPages,
                numberOfPages: action.payload.numberOfPages,
            };
        case fetch_by_search: 
            return{
                ...state,
                posts: action.payload.data,
            };
        case fetchpost: 
            return{
                ...state,
                post: action.payload.data
            };
        case update:
            return { ...state, posts:  state.posts.map((post)=> post._id === action.payload._id ? action.payload : post )};
        case like:
            return { ...state, posts:  state.posts.map((post)=> post._id === action.payload._id ? action.payload : post )};
        case delet :
            return { ...state, posts:  state.posts.filter((post) => post._id !== action.payload)};
        case create:
            return { ...state, posts:  [ ...state.posts, action.payload]};
        case start_loading: 
            return {
                ...state,
                isLoading: true,
            }
        case end_loading: 
            return {
                ...state,
                isLoading: false,
            }
        case addComment: 
        return { ...state, posts:  state.posts.map((post)=> post._id === action.payload._id ? action.payload : post )};
        default:
            return state;
    }
};

export default postReducer;