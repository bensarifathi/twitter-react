import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { userDetailsReducer, userLoginReducer, userRegisterReducer, userUpdateReducer } from './reducers/userReducer'
import { tweetCommentListReducer, tweetCommentReducer, tweetDeleteReducer, tweetDetailsReducer, tweetDislikeReducer, tweetLikedByUserReducer, tweetLikeReducer, tweetListReducer, tweetPostReducer, tweetRtReducer, tweetUserListReducer } from './reducers/tweetReducer'
import { followersUserListReducer, followingUserListReducer, followUserReducer, nonFollowListReducer, unfollowUserReducer } from './reducers/followReducer'


const reducer = combineReducers({
    userLogin : userLoginReducer,
    userUpdate : userUpdateReducer,
    userDetails : userDetailsReducer,
    userRegister : userRegisterReducer,

    tweetList : tweetListReducer,
    tweetDetails : tweetDetailsReducer,
    tweetUserList : tweetUserListReducer,
    tweetLikeByUser : tweetLikedByUserReducer,
    tweetPost : tweetPostReducer,
    tweetLike : tweetLikeReducer,
    tweetDislike : tweetDislikeReducer,
    tweetComment : tweetCommentReducer,
    tweetRt :  tweetRtReducer,
    tweetCommentList : tweetCommentListReducer,
    tweetDelete : tweetDeleteReducer,

    nonFollowList : nonFollowListReducer,
    followUser : followUserReducer,
    followingUserList : followingUserListReducer,
    followersUserList : followersUserListReducer,
    unfollowUser : unfollowUserReducer,
})

const userInfoFromStorage = localStorage.getItem("userInfo") ?
JSON.parse(localStorage.getItem("userInfo")) : null

const initialState = {
    userLogin: {userInfo: userInfoFromStorage},
    userRegister: {userInfo: userInfoFromStorage},
}

const middleware = [thunk]
const store = createStore(reducer, initialState, 
    composeWithDevTools(applyMiddleware(...middleware)))

export default store