import React, {useState, useEffect} from 'react'
import { Button, Col, Image, Row } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'
import Post from '../component/Post'
import ProfileEdit from '../component/ProfileEdit'
import FollowingList from '../component/FollowingList'
import FollowersList from '../component/FollowersList'
import { useSelector, useDispatch } from 'react-redux'
import Message from '../component/Message'
import Loader from '../component/Loader'
import { getUserTweetList, getTweetLikeByUser } from '../actions/tweetActions'
import { unfollow, follow } from '../actions/followActions'
import { getUserDetails } from '../actions/userActions'


function ProfileScreen({match}) {

    const dispatch = useDispatch()
    const {id} = match.params

    const tweetUserList = useSelector(state => state.tweetUserList)
    const {loading, error, tweets} = tweetUserList

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const userDetails = useSelector(state => state.userDetails)
    const {loading: loadDetails, user, error: errorDetails} = userDetails

    const followersUserList = useSelector(state => state.followersUserList)
    const {lists, loading: loadFollowing} = followersUserList

    const tweetLikeByUser = useSelector(state => state.tweetLikeByUser)
    const { loading: loadLike ,likes: tweet_likes, error: errorLikes } = tweetLikeByUser

    const followUser = useSelector(state => state.followUser)
    const { success: successFollow, loading: loadFollow } = followUser

    const unfollowUser = useSelector(state => state.unfollowUser)
    const {loading: loadUnfollow, success: successUnfollow } = unfollowUser

    const [modalShow, setModalShow] = useState(false);
    const [followingList, setFollowingList] = useState(false);
    const [followersList, setFollowersList] = useState(false);
    const [isfollowing, setIsfollowing] = useState(false);

    const handleUnfollow = (userID) => {
        dispatch(unfollow(userID))
    }

    const handleFollow = (userID) => {
        dispatch(follow(userID))
    }


    useEffect(() => {
        dispatch(getUserTweetList(id))
        dispatch(getTweetLikeByUser())
        dispatch(getUserDetails(id))
    }, [dispatch, id])

    useEffect(() => {
        setIsfollowing(false)
        if(lists){
            for(let i=0; i<lists.length; i++){
                if(lists[i].user.id === userInfo.id){
                    console.log(lists[i].user.id, userInfo.id)
                    setIsfollowing(true)
                    break;
                }
            }
            
        }
    }, [lists, userInfo.id])

    useEffect(() => {
        if(successFollow){
            dispatch(getUserDetails(id))
            setIsfollowing(true)
        }
    }, [successFollow, dispatch, id])

    useEffect(() => {
        if(successUnfollow){
            setIsfollowing(false)
        }
    }, [successUnfollow])

    return (
        loadDetails ? <Loader/>:
        errorDetails ? <Message variant="danger">{error}</Message>:
        <Row>
            <Col className="profile__screen_border">
                <div className="profile__header">
                    <div className="profile__header__user">
                    <LinkContainer to="/">
                        <Button >Back</Button>
                    </LinkContainer>
                    <h3>{user.username}</h3>
                    </div>
                    <small>163 tweets</small>
                </div>
                <Image src={user.backgroundIm} fluid rounded/>
                <div className="d-flex justify-content-between">
                <Image className="avatar__medium__profile" src={user.avatar}/>
                {userInfo.id === user.id ?
                <button className="profile__edit" onClick={() => setModalShow(true)}>
                    Edit Profile
                </button>:
                loadFollowing ? <Loader/>:
                isfollowing ?
                loadUnfollow ? <Loader/>:
                <button className="profile__edit" onClick={(e) => handleUnfollow(user.id)}>
                    Unfollow
                </button>:
                loadFollow ? <Loader/>:
                <button className="profile__edit" onClick={(e) => handleFollow(user.id)}>
                    follow
                </button>
                }
                
                </div>
                <ProfileEdit
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
                <div className="profile__info">
                    <h3>{user.username}</h3>
                    <small>@{user.full_name}</small>
                    <p>{user.bio}</p>
                    <p><i className="far fa-calendar-alt"></i> Joined on {new Date(user.date_joined).toDateString()}</p>
                    <div className="profile__follow">
                        <Link to="#" onClick={(e) => setFollowingList(true)}><strong>{user.followingNum}</strong> Following</Link>
                        <Link to="#" onClick={(e) => setFollowersList(true)}><strong>{user.followerNum}</strong> Followers</Link>
                    </div>
                </div>
                <FollowingList
                    user_id={id}
                    show={followingList}
                    onHide={() => setFollowingList(false)}
                />
                <FollowersList
                    user_id={id}
                    show={followersList}
                    onHide={() => setFollowersList(false)}
                />

            </Col>
            <Col className="profile__screen_border">
                <h3 className="m-2"><u>Top Tweet & Retweet</u></h3>
                {loading || loadLike ? <Loader/>:
                error? <Message variant="danger">{error}</Message>:
                tweets.map((tweet) => (
                    tweet.tweet_type === 'tweet'?
                    <Post key={tweet.id} 
                    fullName={tweet.author.full_name}
                    tweet_id={tweet.id}
                    username={tweet.author.username}
                    verified={tweet.author.isVerified}
                    avatar={tweet.author.avatar}
                    image={tweet.image}
                    text={tweet.content}
                    likes={tweet.num_likes}
                    comments={tweet.num_reply}
                    retweet={tweet.num_retweet}
                    like_list={tweet_likes.tweet}
                    error_likes={errorLikes}/>:
                    
                    tweet.tweet_type === "rt"?
                    <Post key={tweet.id}  
                    fullName={tweet.parent.author.full_name}
                    tweet_id={tweet.parent.id}
                    username={tweet.parent.author.username}
                    verified={tweet.parent.author.isVerified}
                    avatar={tweet.parent.author.avatar}
                    image={tweet.parent.image}
                    text={tweet.parent.content}
                    likes={tweet.parent.num_likes}
                    comments={tweet.parent.num_reply}
                    retweet={tweet.parent.num_retweet}
                    like_list={tweet_likes.tweet}
                    error_likes={errorLikes}/>:

                    <Post key={tweet.id}  
                    fullName={tweet.author.full_name}
                    tweet_id={tweet.id}
                    username={tweet.author.username}
                    verified={tweet.author.isVerified}
                    avatar={tweet.author.avatar}
                    image={tweet.image}
                    text={tweet.content}
                    likes={tweet.num_likes}
                    comments={tweet.num_reply}
                    retweet={tweet.num_retweet}
                    like_list={tweet_likes.tweet}
                    error_likes={errorLikes}/>

                ))
                }
                
            </Col>
        </Row>
    )
}

export default ProfileScreen
