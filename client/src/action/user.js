import * as api from '../api'

export const fetchUser = (id) => async (dispatch) => {

    try {
        dispatch({type: 'userStartLoading'})
        const {data} = await api.fetchUser(id)
        dispatch({type: 'fetchUser',payload: data})
        setTimeout(()=>dispatch({type: 'userEndLoading'}),200)
    } catch (error) {
        console.log(error)
    }
}