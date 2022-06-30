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


export const nonFollowListReducer = (state={loading:true}, action) => {
    switch(action.type){
        case NON_FOLLOW_LIST_REQUEST:
            return {loading:true}
        
        case NON_FOLLOW_LIST_SUCCESS:
            return {
                loading: false,
                recommendation: action.payload
            }
        
        case NON_FOLLOW_LIST_FAIL:
            return {loading:false, error:action.payload}
        
        default:
            return state
    }
}

export const followUserReducer = (state={}, action) => {
    switch(action.type){
        case FOLLOW_USER_REQUEST:
            return {loading:true}
        
        case FOLLOW_USER_SUCCESS:
            return {
                loading: false,
                success: true
            }
        
        case FOLLOW_USER_FAIL:
            return {loading:false, error:action.payload}

        case FOLLOW_USER_RESET:
            return {}
        
        default:
            return state
    }
}

export const followingUserListReducer = (state={loading:true}, action) => {
    switch(action.type){
        case FOLLOWING_USER_LIST_REQUEST:
            return {loading:true}
        
        case FOLLOWING_USER_LIST_SUCCESS:
            return {
                loading: false,
                lists: action.payload
            }
        
        case FOLLOWING_USER_LIST_FAIL:
            return {loading:false, error:action.payload}

        default:
            return state
    }
}

export const unfollowUserReducer = (state={}, action) => {
    switch(action.type){
        case UNFOLLOW_USER_REQUEST:
            return {loading:true}
        
        case UNFOLLOW_USER_SUCCESS:
            return {
                loading: false,
                success: true
            }
        
        case UNFOLLOW_USER_FAIL:
            return {loading:false, error:action.payload}

        case UNFOLLOW_USER_RESET:
            return {}
        
        default:
            return state
    }
}

export const followersUserListReducer = (state={loading:true}, action) => {
    switch(action.type){
        case FOLLOWERS_USER_LIST_REQUEST:
            return {loading:true}
        
        case FOLLOWERS_USER_LIST_SUCCESS:
            return {
                loading: false,
                lists: action.payload
            }
        
        case FOLLOWERS_USER_LIST_FAIL:
            return {loading:false, error:action.payload}

        default:
            return state
    }
}
