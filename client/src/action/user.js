import * as api from '../api'

export const fetchUser = (id) => async (dispatch) => {

    try {
        const {data} = await api.fetchUser(id)
        dispatch({type: 'fetchUser',payload: {data}})        
    } catch (error) {
        console.log(error)
    }
}