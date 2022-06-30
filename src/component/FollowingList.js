import React, {useEffect} from 'react'
import { Button, Col, Form, Image, ListGroup, Modal, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { getFollowingList } from '../actions/followActions'
import { getUserDetails } from '../actions/userActions';
import { unfollow } from '../actions/followActions'
import Loader from './Loader';
import Message from './Message';

function FollowingList(props) {
    const {user_id} = props
    const dispatch = useDispatch()

    const followingUserList = useSelector(state => state.followingUserList)
    const {loading, lists, error} = followingUserList

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const unfollowUser = useSelector(state => state.unfollowUser)
    const {loading: loadUnfollow, success, error: errorUnfollow} = unfollowUser

    const handleUnFollow = (e, id) => {
        e.preventDefault()
        dispatch(unfollow(id))
    }

    useEffect(() => {
        dispatch(getFollowingList(user_id))
    }, [dispatch, user_id])

    useEffect(() => {
        if(success){
            dispatch(getUserDetails(user_id))
        }
    }, [success, dispatch, user_id])

    return (
        loading ? <Loader/>:
        error ? <Message variant="danger">{error}</Message>:
        <Modal
          {...props}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          animation
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Following List
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ListGroup variant="flush">
                {loadUnfollow && <Loader/>}
                {errorUnfollow && <Message variant="danger">{errorUnfollow}</Message>}
                    {lists.map((profile) => (
                        <ListGroup.Item key={profile.id}>
                        <Form onSubmit={(e) => handleUnFollow(e, profile.id)}>
                        <Row className="widgets__profile">
                        <Col md={3}>
                            <Image className="avatar" src={profile.avatar} alt="pic"/>
                        </Col>
                        <Col md={4}>
                            <p><strong>{profile.username}</strong></p>
                            <small className="widgets__small">@{profile.full_name}</small>
                        </Col>
                        {userInfo.id === Number(user_id) && 
                        <Col md={4}>
                            <Button type='submit' className="widgets__button__following" />
                        </Col>
                        }
                        
                        </Row>
                        </Form>
                    </ListGroup.Item>
                    ))}
                </ListGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      );
}

export default FollowingList
