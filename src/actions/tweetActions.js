import { 
    TWEET_LIST_REQUEST,
    TWEET_LIST_SUCCESS,
    TWEET_LIST_FAIL,

    TWEET_DETAILS_REQUEST,
    TWEET_DETAILS_SUCCESS,
    TWEET_DETAILS_FAIL,

    TWEET_USER_LIST_REQUEST,
    TWEET_USER_LIST_SUCCESS,
    TWEET_USER_LIST_FAIL,

    TWEET_LIKE_BY_USER_REQUEST,
    TWEET_LIKE_BY_USER_SUCCESS,
    TWEET_LIKE_BY_USER_FAIL,

    TWEET_POST_REQUEST,
    TWEET_POST_SUCCESS,
    TWEET_POST_FAIL,
    TWEET_POST_RESET,

    TWEET_LIKE_REQUEST,
    TWEET_LIKE_SUCCESS,
    TWEET_LIKE_FAIL,
    TWEET_LIKE_RESET,

    TWEET_DISLIKE_REQUEST,
    TWEET_DISLIKE_SUCCESS,
    TWEET_DISLIKE_FAIL,
    TWEET_DISLIKE_RESET,

    TWEET_COMMENT_REQUEST,
    TWEET_COMMENT_SUCCESS,
    TWEET_COMMENT_FAIL,
    TWEET_COMMENT_RESET,

    TWEET_RT_REQUEST,
    TWEET_RT_SUCCESS,
    TWEET_RT_FAIL,
    TWEET_RT_RESET,

    TWEET_COMMENT_LIST_REQUEST,
    TWEET_COMMENT_LIST_SUCCESS,
    TWEET_COMMENT_LIST_FAIL,


    TWEET_DELETE_REQUEST,
    TWEET_DELETE_SUCCESS,
    TWEET_DELETE_FAIL,
    TWEET_DELETE_RESET,
    

} from '../constants/tweetConstants'
import axiosInstance from '../axiosApi'

export const getTweetList = () => async (dispatch) => {
    try {
        dispatch({type: TWEET_LIST_REQUEST})
        const {data} = await axiosInstance.get('tweets/')

        dispatch({
            type: TWEET_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type : TWEET_LIST_FAIL,
            payload : error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}

export const getTweetDetails = (id) => async (dispatch) => {
    try {
        dispatch({type: TWEET_DETAILS_REQUEST})
        const {data} = await axiosInstance.get(`tweet/${id}/`)

        dispatch({
            type: TWEET_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type : TWEET_DETAILS_FAIL,
            payload : error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}

export const getUserTweetList = (id) => async (dispatch) => {
    try {
        dispatch({type: TWEET_USER_LIST_REQUEST})
        const {data} = await axiosInstance.get(`user/${id}/tweets/`)

        dispatch({
            type: TWEET_USER_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type : TWEET_USER_LIST_FAIL,
            payload : error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}


export const getTweetLikeByUser = () => async (dispatch) => {
    try {
        dispatch({type: TWEET_LIKE_BY_USER_REQUEST})
        const {data} = await axiosInstance.get('user/tweets/like/')

        dispatch({
            type: TWEET_LIKE_BY_USER_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type : TWEET_LIKE_BY_USER_FAIL,
            payload : error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}

export const postTweet = (tweet) => async (dispatch) => {
    try {
        dispatch({type: TWEET_POST_REQUEST})
        const {data} = await axiosInstance.post('tweet/add/', tweet)

        dispatch({
            type: TWEET_POST_SUCCESS,
            payload: data
        })

        dispatch({type: TWEET_POST_RESET})

    } catch (error) {
        dispatch({
            type : TWEET_POST_FAIL,
            payload : error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}

export const likeTweet = (tweet_id) => async (dispatch) => {
    try {
        dispatch({type: TWEET_LIKE_REQUEST})
        const {data} = await axiosInstance.post(`tweet/${tweet_id}/like`, {})

        dispatch({
            type: TWEET_LIKE_SUCCESS,
            payload: data
        })

        dispatch({type: TWEET_LIKE_RESET})

    } catch (error) {
        dispatch({
            type : TWEET_LIKE_FAIL,
            payload : error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}

export const dislikeTweet = (tweet_id) => async (dispatch) => {
    try {
        dispatch({type: TWEET_DISLIKE_REQUEST})
        const {data} = await axiosInstance.post(`tweet/${tweet_id}/dislike`, {})

        dispatch({
            type: TWEET_DISLIKE_SUCCESS,
            payload: data
        })

        dispatch({type: TWEET_DISLIKE_RESET})

    } catch (error) {
        dispatch({
            type : TWEET_DISLIKE_FAIL,
            payload : error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}

export const commentTweet = (form, tweet_id) => async (dispatch) => {
    try {
        dispatch({type: TWEET_COMMENT_REQUEST})
        const {data} = await axiosInstance.post(`tweet/${tweet_id}/comment`, form)

        dispatch({
            type: TWEET_COMMENT_SUCCESS,
            payload: data
        })

        dispatch({type: TWEET_COMMENT_RESET})

    } catch (error) {
        dispatch({
            type : TWEET_COMMENT_FAIL,
            payload : error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}

export const rtTweet = (tweet_id) => async (dispatch) => {
    try {
        dispatch({type: TWEET_RT_REQUEST})
        const {data} = await axiosInstance.post(`tweet/${tweet_id}/retweet`, {})

        dispatch({
            type: TWEET_RT_SUCCESS,
            payload: data
        })

        dispatch({type: TWEET_RT_RESET})

    } catch (error) {
        dispatch({
            type : TWEET_RT_FAIL,
            payload : error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}

export const getCommentTweetList = (tweet_id) => async (dispatch) => {
    try {
        dispatch({type: TWEET_COMMENT_LIST_REQUEST})
        const {data} = await axiosInstance.get(`tweet/${tweet_id}/reply`)

        dispatch({
            type: TWEET_COMMENT_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type : TWEET_COMMENT_LIST_FAIL,
            payload : error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}

export const deleteTweet = (tweet_id) => async (dispatch) => {
    try {
        dispatch({type: TWEET_DELETE_REQUEST})
        const {data} = await axiosInstance.delete(`tweet/${tweet_id}/`)

        dispatch({
            type: TWEET_DELETE_SUCCESS,
            payload: data
        })

        dispatch({
            type: TWEET_DELETE_RESET
        })

    } catch (error) {
        dispatch({
            type : TWEET_DELETE_FAIL,
            payload : error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}