import React, {useState, useEffect} from 'react'
import { Col, Image, Row } from 'react-bootstrap'
import Comment from './Comment'
import { useDispatch, useSelector } from 'react-redux'
import { likeTweet, dislikeTweet, rtTweet } from '../actions/tweetActions'
import { LinkContainer } from 'react-router-bootstrap'

function Post({
    fullName, username, avatar,
    verified, text, image,
    likes, comments, retweet,
    tweet_id, like_list, error_likes, user_id
}) {
    const dispatch = useDispatch()

    const tweetRt = useSelector(state => state.tweetRt)
    const {success} = tweetRt

    const [hide, setHide] = useState(true)
    const [like, setLike] = useState(false)
    const [numLike, setNumLike] = useState(likes)
    const [numCom, setNumCom] = useState(comments)
    const [numRt, setNumRt] = useState(retweet)

    const handleLike = () => {
        dispatch(likeTweet(tweet_id))
        setLike(true)
        setNumLike(numLike+1)
    }

    const handleRt = () => {
        dispatch(rtTweet(tweet_id))
    }

    const handleDislike = () => {
        dispatch(dislikeTweet(tweet_id))
        setLike(false)
        setNumLike(numLike-1)
    }

    useEffect(() => {
        if(like_list.includes(tweet_id)){
            setLike(true)
        }
    }, [like_list, tweet_id])

    useEffect(() => {
        if(success){
            setNumRt(retweet+1)
        }
    }, [success, retweet])


    return (
        <Row className="post">
            <Col md={1} className="m-3">
                <Image src={avatar} alt="pic" className="avatar"/>
            </Col>
            <Col md={10}>
            <LinkContainer className="profile__link" to={`/profile/${user_id}`}>
                <p className="my-3 mr-3"><strong>{username}</strong>{` `}
                {verified && 
                <i className="fas fa-certificate verified"></i>
                }
                
                <small>@{fullName}</small></p>
            </LinkContainer>
            <LinkContainer to={`/tweet/${tweet_id}`}>
                <div className="tweet__details">
                <p>{text}</p>
                {image && <Image src={image} alt="content" fluid rounded/>}
                </div>
            </LinkContainer>
            
            <Row>
                <Col><i onClick={(e) => setHide(!hide)} className="far fa-comment comment__icon">{` `}{numCom}</i></Col>
                <Col><i onClick={handleRt} className="fas fa-retweet retweet__icon">{` `}{numRt}</i></Col>
                {like ?
                <Col><i onClick ={handleDislike}
                 className="fas fa-heart tweet__liked heart__icon">{` `}{numLike}</i></Col>:
                <Col><i onClick ={handleLike}
                className="far fa-heart heart__icon">{` `}{numLike}</i></Col>
                }
                
            </Row>
            {!hide && <Comment id={tweet_id} add={setNumCom} comm={numCom}/>}
            
            
            </Col>
        </Row>
    )
}

export default Post
