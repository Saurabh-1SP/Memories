const userReducer = (state = {user: null},action) => {
    switch (action.type) {
        case "fetchUser": 
            return{
                ...state,
                user: action.payload.data,
            };
        default:
            return state;
    }
}

export default userReducer;