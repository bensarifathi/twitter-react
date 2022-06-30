import React, {useRef, useState, useEffect} from 'react'
import { Button, Form, Image } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { postTweet, getTweetList } from '../actions/tweetActions'
import Loader from './Loader'
import Message from './Message'

function TweetBox() {

    const dispatch = useDispatch()
    
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const tweetPost = useSelector(state => state.tweetPost)
    const {loading, tweet, error} = tweetPost

    const fileInput = useRef()

    const [image, setImage] = useState(null)
    const [content, setContent] = useState('')
    const [imName, setImName] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        const form = new FormData()
        form.append('content', content)
        form.append('image', image)
        form.append('tweet_type', 'tweet')
        dispatch(postTweet(form))
    }

    useEffect(() => {
       if(!loading){
            setContent('')
            setImage(null)
       }

    }, [loading])

    useEffect(() => {
        if(tweet){
            dispatch(getTweetList())
        }
    }, [dispatch, tweet])

    useEffect(() => {
        if(image){
            setImName(image.name)
        }
    }, [image])


    return (
        <div className="tweetbox">
            <Form onSubmit={handleSubmit}>
                {error && <Message variant="danger">{error}</Message>}
                {loading && <Loader/>}
                <div className="tweetbox__input">
                <Image className="avatar p-1" src={userInfo.avatar}/>
                <Form.Control type="text" placeholder="What's up ...."
                value={content} onChange={(e) => setContent(e.target.value)} />
                </div>

                <div className="d-flex justify-content-between parent">
                    <input ref={fileInput} type="file" hidden onChange={(e) => setImage(e.target.files[0])}/>
                    <Button onClick={() => fileInput.current.click()} className="tweetbox__upload"><i className="fas fa-photo-video"></i></Button>
                    <p className="upload__filename">{imName}</p>
                    <Button type="submit" className="tweetbox__button" disabled={!content && !image}>
                        Tweet
                    </Button>
                </div>
                
            </Form>
        </div>
    )
}

export default TweetBox
