import React, {useEffect} from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { 
        getTweetDetails,
        getTweetLikeByUser, 
        getCommentTweetList, 
        deleteTweet,
    } from '../actions/tweetActions'
import Post from '../component/Post'
import Loader from '../component/Loader'
import Message from '../component/Message'
import { LinkContainer } from 'react-router-bootstrap'




function TweetDetailsScreen({match, history}) {
    const {id} = match.params
    const dispatch = useDispatch()

    const tweetDetails = useSelector(state => state.tweetDetails)
    const {loading: loadTweet, tweet, error: errorTweet} = tweetDetails

    const tweetLikeByUser = useSelector(state => state.tweetLikeByUser)
    const { loading: loadLike ,likes: tweet_likes, error: errorLikes } = tweetLikeByUser

    const tweetCommentList = useSelector(state => state.tweetCommentList)
    const { loading: loadReply, reply, error: errorReply } = tweetCommentList

    const tweetComment = useSelector(state => state.tweetComment)
    const {success: successComment} = tweetComment

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin


    const tweetDelete = useSelector(state => state.tweetDelete)
    const {loading: loadDel, success: successDel, error: errorDel} = tweetDelete

    const handleDel = (tweetID) => {
        if(window.confirm('Are you sure to delete this Tweet ?')){
            dispatch(deleteTweet(tweetID))
        }   
    }

    useEffect(() => {
        dispatch(getTweetDetails(id))
        dispatch(getTweetLikeByUser())
        dispatch(getCommentTweetList(id))
    }, [dispatch, id])

    useEffect(() => {
        if(successComment){
            dispatch(getCommentTweetList(id))
        }
    }, [dispatch, id, successComment])

    useEffect(() => {
        if(successDel){
            history.push('/')
        }
    }, [history, successDel])

    
    return (
        <Row>
            <Col md={2}>
                {loadDel && <Loader/>}
                {errorDel && <Message variant="danger">{errorDel}</Message>}
                <LinkContainer to="/">
                    <Button size="md" className="tweetbox__button">Back</Button>
                </LinkContainer>

                {loadTweet ? '':errorTweet ? '':
                tweet.author.id === userInfo.id &&
                <Button size="md" className="tweetbox__button__delete" onClick={() => handleDel(id)}>
                    Delete
                </Button>
                }
                
                
            </Col>
            <Col>
            {loadTweet || loadLike ? <Loader/>:
            errorTweet ? <Message variant="danger">{errorTweet}</Message>:
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
            }
            {loadReply || loadLike ?<Loader/>:
            errorReply ? <Message variant="danger">{errorReply}</Message>:
            reply.map((tweet) => (
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
            
            ))
            }
           
            
            </Col>

        </Row>
    )
}

export default TweetDetailsScreen
