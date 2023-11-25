import { auth, end_loading, googleSign, logout, signIn, start_loading} from "../constants/actions";


const authReducer = (state = {authData : null,email: true,password: true,isLoading: false}, action) => {
    switch (action.type) {
        case auth:
            if(action?.data.result === 'userDontExist'){
                console.log(`this email error`)
                return {...state,email: false}
            } else {
                if (action?.data.result === 'passwordIsNotCorret'){
                    console.log(`this is the password error`)
                    return {...state,password: false,email: true}
                } 
                else {
                    console.log('successfully loged in')
                    localStorage.setItem('profile',JSON.stringify(action?.data))
                    return {...state, authData: action?.data, email: true, password: true}
                }
            }
        case signIn: 
            if(action?.data.result === 'User already exist'){
                console.log(`this email error`)
                return {...state,email: false}
            } else {
                    console.log('successfully loged in')
                    localStorage.setItem('profile',JSON.stringify(action?.data))
                    return {...state, authData: action?.data, email: true, password: true}
            }
        case googleSign:
            if (action?.data.error) {
                console.log(action?.data.error)
                console.log('something went wrong, please try again later')
                return {...state}
            } else {
                console.log('successfully loged in')
                localStorage.setItem('profile',JSON.stringify(action?.data))
                return {...state, authData: action?.data, email: true, password: true}
            }
        case logout:
            localStorage.clear();
            
            return { ...state, authData: null}
        case start_loading: 
            return {...state, isLoading: true}
        case end_loading: 
            return {...state, isLoading: false,}
        default:
            return state;
    }
}

export default authReducer;