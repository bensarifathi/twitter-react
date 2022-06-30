import { 
    NON_FOLLOW_LIST_REQUEST,
    NON_FOLLOW_LIST_SUCCESS,
    NON_FOLLOW_LIST_FAIL,

    FOLLOW_USER_REQUEST,
    FOLLOW_USER_SUCCESS,
    FOLLOW_USER_FAIL,
    FOLLOW_USER_RESET,

    UNFOLLOW_USER_REQUEST,
    UNFOLLOW_USER_SUCCESS,
    UNFOLLOW_USER_FAIL,
    UNFOLLOW_USER_RESET,

    FOLLOWING_USER_LIST_REQUEST,
    FOLLOWING_USER_LIST_SUCCESS,
    FOLLOWING_USER_LIST_FAIL,

    FOLLOWERS_USER_LIST_REQUEST,
    FOLLOWERS_USER_LIST_SUCCESS,
    FOLLOWERS_USER_LIST_FAIL,

} from '../constants/followConstants'
import axiosInstance from '../axiosApi'


export const getNonFollowingList = () => async (dispatch) => {
    try {
        dispatch({
            type: NON_FOLLOW_LIST_REQUEST
        })
        const {data} = await axiosInstance.get(`users/recommendation/`)
        dispatch({
            type: NON_FOLLOW_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type : NON_FOLLOW_LIST_FAIL,
            payload : error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}

export const follow = (user_id) => async (dispatch) => {
    try {
        dispatch({
            type: FOLLOW_USER_REQUEST
        })
        const {data} = await axiosInstance.post(`follow/user/${user_id}/`)
        dispatch({
            type: FOLLOW_USER_SUCCESS,
            payload: data
        })

        dispatch({
            type: FOLLOW_USER_RESET
        })

    } catch (error) {
        dispatch({
            type : FOLLOW_USER_FAIL,
            payload : error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}

export const getFollowingList = (user_id) => async (dispatch) => {
    try {
        dispatch({
            type: FOLLOWING_USER_LIST_REQUEST
        })
        const {data} = await axiosInstance.get(`following/user/${user_id}/`)
        dispatch({
            type: FOLLOWING_USER_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type : FOLLOWING_USER_LIST_FAIL,
            payload : error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}

export const unfollow = (user_id) => async (dispatch) => {
    try {
        dispatch({
            type: UNFOLLOW_USER_REQUEST
        })
        const {data} = await axiosInstance.post(`unfollow/user/${user_id}/`)
        dispatch({
            type: UNFOLLOW_USER_SUCCESS,
            payload: data
        })

        dispatch({
            type: UNFOLLOW_USER_RESET
        })

    } catch (error) {
        dispatch({
            type : UNFOLLOW_USER_FAIL,
            payload : error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}

export const getFollowersList = (user_id) => async (dispatch) => {
    try {
        dispatch({
            type: FOLLOWERS_USER_LIST_REQUEST
        })
        const {data} = await axiosInstance.get(`followers/user/${user_id}/`)
        dispatch({
            type: FOLLOWERS_USER_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type : FOLLOWERS_USER_LIST_FAIL,
            payload : error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}