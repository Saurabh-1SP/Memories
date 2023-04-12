import * as api from '../api/index.js'
import { auth, signIn } from '../constants/actions.js'

export const signin = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);
        
        dispatch({type: auth, data});
        if(data.token) history.push('/')
    } catch (error) {
        console.log(error)
    }
}
export const signup = (formData, history) => async (dispatch) => {
    try {
        
        const { data } = await api.signUp(formData);
        dispatch({type: signIn, data});
        if(data.token) history.push('/')

    } catch (error) {
        console.log(error)
    }
}