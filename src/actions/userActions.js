import { 
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,

    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,

    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,

    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
} from '../constants/userConstants'
import axiosInstance from '../axiosApi'


export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({type: USER_LOGIN_REQUEST})
        const {data} = await axiosInstance.post('token/',
        {email, password})

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
        localStorage.setItem('userInfo', JSON.stringify(data))
        axiosInstance.defaults.headers['Authorization'] = "JWT " + data.access

    } catch (error) {
        dispatch({
            type : USER_LOGIN_FAIL,
            payload : error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}

export const logout = () => async (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({type:USER_LOGOUT})
    axiosInstance.defaults.headers['Authorization'] = null
}

export const update = (user) => async (dispatch) => {
    try {
        dispatch({type: USER_UPDATE_REQUEST})
        const {data} = await axiosInstance.put('user/update/', user)
        dispatch({
            type: USER_UPDATE_SUCCESS,
        })
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data,
        })
        localStorage.setItem('userInfo', JSON.stringify(data))
        axiosInstance.defaults.headers['Authorization'] = "JWT " + data.access

    } catch (error) {
        dispatch({
            type : USER_UPDATE_FAIL,
            payload : error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}

export const getUserDetails = (user_id) => async (dispatch) => {
    try {
        dispatch({type: USER_DETAILS_REQUEST})
        const {data} = await axiosInstance.get(`user/${user_id}/`)
        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type : USER_DETAILS_FAIL,
            payload : error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}

export const register = (user) => async (dispatch) => {
    try {
        dispatch({type: USER_REGISTER_REQUEST})
        const {data} = await axiosInstance.post('user/register/',
        user)

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
        localStorage.setItem('userInfo', JSON.stringify(data))
        axiosInstance.defaults.headers['Authorization'] = "JWT " + data.access

    } catch (error) {
        dispatch({
            type : USER_REGISTER_FAIL,
            payload : error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}