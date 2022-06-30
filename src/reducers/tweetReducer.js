import { 
    TWEET_LIST_REQUEST,
    TWEET_LIST_SUCCESS,
    TWEET_LIST_FAIL,

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

    TWEET_DETAILS_REQUEST,
    TWEET_DETAILS_SUCCESS,
    TWEET_DETAILS_FAIL,

    TWEET_DELETE_REQUEST,
    TWEET_DELETE_SUCCESS,
    TWEET_DELETE_FAIL,
    TWEET_DELETE_RESET,

    TWEET_COMMENT_LIST_REQUEST,
    TWEET_COMMENT_LIST_SUCCESS,
    TWEET_COMMENT_LIST_FAIL,


} from '../constants/tweetConstants'

export const tweetListReducer = (state={loading:true}, action) => {
    switch (action.type) {
        case TWEET_LIST_REQUEST:
            return {loading:true, tweets:null}
        
        case TWEET_LIST_SUCCESS:
            return {loading:false, tweets: action.payload}
        
        case TWEET_LIST_FAIL:
            return {loading:false, error:action.payload, userInfo:null}

        default:
            return state
    }
}

export const tweetDetailsReducer = (state={loading:true}, action) => {
    switch (action.type) {
        case TWEET_DETAILS_REQUEST:
            return {loading:true, tweet:null}
        
        case TWEET_DETAILS_SUCCESS:
            return {loading:false, tweet: action.payload}
        
        case TWEET_DETAILS_FAIL:
            return {loading:false, error:action.payload}

        default:
            return state
    }
}

export const tweetUserListReducer = (state={loading:true}, action) => {
     switch (action.type) {
        case TWEET_USER_LIST_REQUEST:
            return {loading:true, tweets:null}
        
        case TWEET_USER_LIST_SUCCESS:
            return {loading:false, tweets: action.payload}
        
        case TWEET_USER_LIST_FAIL:
            return {loading:false, error:action.payload, userInfo:null}

        default:
            return state
    }
}

export const tweetLikedByUserReducer = (state={loading:true}, action) => {
    switch (action.type) {
        case TWEET_LIKE_BY_USER_REQUEST:
            return {loading:true, likes:null}
        
        case TWEET_LIKE_BY_USER_SUCCESS:
            return {loading:false, likes: action.payload}
        
        case TWEET_LIKE_BY_USER_FAIL:
            return {loading:false, error:action.payload, userInfo:null}

        default:
            return state
    }
}

export const tweetPostReducer = (state={}, action) => {
    switch (action.type) {
        case TWEET_POST_REQUEST:
            return {loading:true, tweet:null}
        
        case TWEET_POST_SUCCESS:
            return {loading:false, tweet: action.payload}
        
        case TWEET_POST_FAIL:
            return {loading:false, error:action.payload}

        case TWEET_POST_RESET:
            return {}
        
        default:
            return state
    }
}

export const tweetLikeReducer = (state={}, action) => {
    switch (action.type) {
        case TWEET_LIKE_REQUEST:
            return {loading:true}
        
        case TWEET_LIKE_SUCCESS:
            return {loading:false, success: true}
        
        case TWEET_LIKE_FAIL:
            return {loading:false, error:action.payload, userInfo:null}
        
        case TWEET_LIKE_RESET:
            return {}

        default:
            return state
    }
}

export const tweetDislikeReducer = (state={}, action) => {
    switch (action.type) {
        case TWEET_DISLIKE_REQUEST:
            return {loading:true}
        
        case TWEET_DISLIKE_SUCCESS:
            return {loading:false, success: true}
        
        case TWEET_DISLIKE_FAIL:
            return {loading:false, error:action.payload, userInfo:null}
        
        case TWEET_DISLIKE_RESET:
            return {}

        default:
            return state
    }
}

export const tweetCommentReducer = (state={}, action) => {
    switch (action.type) {
        case TWEET_COMMENT_REQUEST:
            return {loading:true}
        
        case TWEET_COMMENT_SUCCESS:
            return {loading:false, success: true}
        
        case TWEET_COMMENT_FAIL:
            return {loading:false, error:action.payload}
        
        case TWEET_COMMENT_RESET:
            return {}

        default:
            return state
    }
}

export const tweetRtReducer = (state={}, action) => {
    switch (action.type) {
        case TWEET_RT_REQUEST:
            return {loading:true}
        
        case TWEET_RT_SUCCESS:
            return {loading:false, success: true}
        
        case TWEET_RT_FAIL:
            return {loading:false, error:action.payload}
        
        case TWEET_RT_RESET:
            return {}

        default:
            return state
    }
}

export const tweetCommentListReducer = (state={loading:true}, action) => {
    switch (action.type) {
        case TWEET_COMMENT_LIST_REQUEST:
            return {loading:true, reply:null}
        
        case TWEET_COMMENT_LIST_SUCCESS:
            return {loading:false, reply: action.payload}
        
        case TWEET_COMMENT_LIST_FAIL:
            return {loading:false, error:action.payload}

        default:
            return state
    }
}

export const tweetDeleteReducer = (state={}, action) => {
    switch (action.type) {
        case TWEET_DELETE_REQUEST:
            return {loading:true}
        
        case TWEET_DELETE_SUCCESS:
            return {loading:false, success:true}
        
        case TWEET_DELETE_FAIL:
            return {loading:false, error:action.payload}

        case TWEET_DELETE_RESET:
            return {}

        default:
            return state
    }
}
