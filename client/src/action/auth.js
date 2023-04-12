import * as api from '../api/index.js'
import { auth, end_loading, signIn, start_loading } from '../constants/actions.js'

export const signin = (formData, history) => async (dispatch) => {
    try {
        dispatch({type: start_loading })
        const { data } = await api.signIn(formData);
        dispatch({type: auth, data});
        dispatch({type: end_loading})
        if(data.token) history('/')
    } catch (error) {
        console.log(error)
    }
}
export const signup = (formData, history) => async (dispatch) => {
    try {
        dispatch({type: start_loading })
        const { data } = await api.signUp(formData);
        dispatch({type: signIn, data});
        dispatch({type: end_loading})
        if(data.token) history('/')
    } catch (error) {
        console.log(error)
    }
}