import React, {useRef, useState, useEffect} from 'react'
import { Button, Form, Image } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { commentTweet } from '../actions/tweetActions'
import Message from './Message'

function Comment( {id, add, comm} ) {

    const dispatch = useDispatch()
    
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const tweetComment = useSelector(state => state.tweetComment)
    const {loading, success, error} = tweetComment

    const fileInput = useRef()

    const [imName, setImName] = useState('')

    const [image, setImage] = useState(null)
    const [content, setContent] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        const form = new FormData()
        form.append('content', content)
        form.append('image', image)
        form.append('tweet_type', 'reply')
        form.append('parent', id)
        console.log(image, content)
        dispatch(commentTweet(form, id))
    }

    useEffect(() => {
       if(!loading){
            setContent('')
            setImage(null)
       }

    }, [loading])


    useEffect(() => {
        if(success){
            add(comm +1)
        }
    }, [success, add, comm])

    useEffect(() => {
        if(image){
            setImName(image.name)
        }
    }, [image])



    return (
        <div className="tweetbox">
            <Form onSubmit={handleSubmit}>
                {error && <Message variant="danger">{error}</Message>}
                <div className="tweetbox__input">
                <Image className="avatar p-1" src={userInfo.avatar}/>
                <Form.Control type="text" placeholder="What's up ...."
                value={content} onChange={(e) => setContent(e.target.value)} />
                </div>

                <div className="d-flex justify-content-between">
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

export default Comment
