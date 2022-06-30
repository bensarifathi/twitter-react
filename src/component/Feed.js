import React, {useEffect} from 'react'
import Post from './Post'
import TweetBox from './TweetBox'
import { useDispatch, useSelector } from 'react-redux'
import { getTweetList, getTweetLikeByUser } from '../actions/tweetActions'
import Message from './Message'
import Loader from './Loader'


function Feed() {
    const dispatch = useDispatch()

    const tweetList = useSelector(state => state.tweetList)
    const {tweets, loading, error} = tweetList

    const tweetLikeByUser = useSelector(state => state.tweetLikeByUser)
    const { loading: loadLike ,likes: tweet_likes, error: errorLikes } = tweetLikeByUser


    useEffect(() => {
        dispatch(getTweetList())
        dispatch(getTweetLikeByUser())
    }, [dispatch])

    return (
        loading || loadLike ? <Loader/>:
        error ? <Message variant="danger">{error}</Message>:
        <div className="feed">
            <div className="feed__header">
                <h3>Home</h3>
            </div>
            <TweetBox/>
            {tweets.map((tweet) => (
                <Post key={tweet.id} username={tweet.author.username} 
                user_id={tweet.author.id}
                tweet_id={tweet.id}
                fullName={tweet.author.full_name}
                verified={tweet.author.isVerified}
                avatar={tweet.author.avatar}
                image={tweet.image}
                text={tweet.content}
                likes={tweet.num_likes}
                comments={tweet.num_reply}
                retweet={tweet.num_retweet}
                like_list={tweet_likes.tweet}
                error_likes={errorLikes}/>
                
            ))}
        </div>
    )
}

export default Feed
