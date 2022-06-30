import React, {useState} from 'react'
import { Button, Col, Form, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import axiosInstance from '../axiosApi'
import Loader from '../component/Loader'
import Message from '../component/Message'
import { USER_DETAILS_SUCCESS, USER_LOGIN_SUCCESS } from '../constants/userConstants';
import { update } from '../actions/userActions'

function ProfileEdit(props) {

    const userUpdate = useSelector(state => state.userUpdate)
    const {loading, error} = userUpdate

    const userDetails = useSelector(state => state.userDetails)
    const {user} = userDetails

    const dispatch = useDispatch()

    const [image, setImage] = useState(user.avatar)
    const [backgroundIm, setBackgroundIm] = useState(user.backgroundIm)
    const [username, setUsername] = useState(user.username)
    const [fullName, setFullname] = useState(user.full_name)
    const [email, setEmail] = useState(user.email)
    const [bio, setBio] = useState(user.bio)
    const [oldpw, setOldpw] = useState('')
    const [pw, setPw] = useState('')
    const [confirmPw, setConfirmPw] = useState('')

    const [uploadAvatar, setUploadAvatar] = useState(false)
    const [uploadBack, setUploadBack] = useState(false)

    const uploadAvatarHandler = async (e) => {
      const avatar = e.target.files[0]
      const formData = new FormData()
      formData.append('image', avatar)
      try {
        setUploadAvatar(true)
        const {data} = await axiosInstance.put('/user/update/avatar/', formData)
        dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: data
        })

        dispatch({
          type: USER_DETAILS_SUCCESS,
          payload: data
        })
        setImage(data.avatar)
        localStorage.setItem('userInfo', JSON.stringify(data))
        axiosInstance.defaults.headers['Authorization'] = "JWT " + data.access
        setUploadAvatar(false)
      } catch (error) {
        setUploadAvatar(false)
      }
    }

    const uploadFileHandler = async (e) => {
      const background = e.target.files[0]
      const formData = new FormData()
      formData.append('image', background)
      try {
        setUploadBack(true)
        const {data} = await axiosInstance.put('/user/update/backimage/', formData)
        dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: data
        })
        dispatch({
          type: USER_DETAILS_SUCCESS,
          payload: data
        })
        setBackgroundIm(data.backgroundIm)
        setUploadBack(false)
        localStorage.setItem('userInfo', JSON.stringify(data))
        axiosInstance.defaults.headers['Authorization'] = "JWT " + data.access
        
      } catch (error) {
        setUploadBack(false)
      }
    }

    const handleSubmit = (e) => {
      e.preventDefault()
      dispatch(update({
        username,
        email,
        fullName,
        oldpw,
        pw,
        confirmPw,
        bio
      }))
    }

    return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          animation
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              <h3>Edit Profile</h3>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {loading && <Loader/>}
            {error && <Message variant="danger">{error}</Message>}    
            <Form.Row>
              <Col>
                <Form.Control type="name" placeholder="Enter name" required
                onChange={(e) => setUsername(e.target.value)} value={username}/>
              </Col>
              
              <Col>
                <Form.Control type="name" placeholder="Enter nickname" required
                onChange={(e) => setFullname(e.target.value)} value={fullName}/>
              </Col>
            </Form.Row>
            <br/>
            <Form.Row>
              <Col>
                <Form.Control type="email" placeholder="Enter email" 
                onChange={(e) => setEmail(e.target.value)} value={email}/>
              </Col>
              <Col>
              <Form.Control type="password" placeholder="Old password"
              value={oldpw} onChange={(e) => setOldpw(e.target.value)}/>
              </Col>
            </Form.Row>
            <br/>
            <Form.Row>
              <Col>
                <Form.Control type="password" placeholder="New password"
                value={pw} onChange={(e) => setPw(e.target.value)}/>
              </Col>
              <Col>
              <Form.Control type="password" placeholder="Confirm password"
              value={confirmPw} onChange={(e) => setConfirmPw(e.target.value)}/>
              </Col>   
            </Form.Row>
            <br/>
            <Form.Row>
              <Col>
                <Form.Control placeholder='Write a description ...' as="textarea" row={3}
                onChange={(e) => setBio(e.target.value)} value={bio}/>
              </Col>
            </Form.Row>
            <br/>
            <Form.Group controlId="formBasicImage">
                    <Form.Label>Avatar</Form.Label>
                    <Form.Control type="text" placeholder="Enter image"
                      value={image} onChange={(e) => setImage(e.target.value)}/>
                    <Form.File
                    id="imageFIle"
                    label="Choose an Image"
                    custom
                    onChange={uploadAvatarHandler}>
                    </Form.File>
                    {uploadAvatar && <Loader/>}
                </Form.Group>
            
                <Form.Group controlId="formBasicBImage">
                    <Form.Label>Background Image</Form.Label>
                    <Form.Control type="text" placeholder="Enter image"
                    value={backgroundIm} onChange={(e) => setBackgroundIm(e.target.value)}/>
                    <Form.File
                    id="imageBFIle"
                    label="Choose an Image"
                    custom
                    onChange={uploadFileHandler}>
                    </Form.File>
                    {uploadBack && <Loader/>}
                </Form.Group>


            <Button type='submit' variant='outline-success' block>
                Save
            </Button>

            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      );
}

export default ProfileEdit
