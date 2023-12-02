const userReducer = (state = {user: {},isLoading: false},action) => {
    switch (action.type) {
        case "fetchUser":
            if (action?.payload.message === 'User Not Found'){
                return {
                    ...state,
                }
            }
            return{
                ...state,
                user: action.payload,
            };
        case 'userStartLoading':
            return{ ...state, isLoading: true }
        case 'userEndLoading':
            return{ ...state, isLoading: false}
        default:
            return state;
    }
}

export default userReducer;