import React, {useEffect} from 'react'
import { Button, Col, ListGroup, Modal, Row, Image } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import { useDispatch, useSelector } from 'react-redux'
import { getFollowersList } from '../actions/followActions'

function FollowersList(props) {
    const {user_id} = props
    const dispatch = useDispatch()

    const followersUserList = useSelector(state => state.followersUserList)
    const {loading, lists, error} = followersUserList


    useEffect(() => {
        dispatch(getFollowersList(user_id))
    }, [dispatch, user_id])


    return (
        loading  ? <Loader/>:
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
              Followers List
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ListGroup variant="flush">
               
                    {lists.map((profile) => (
                        <ListGroup.Item key={profile.id}>
                        <Row className="widgets__profile">
                        <Col md={3}>
                            <Image className="avatar" src={profile.user.avatar} alt="pic"/>
                        </Col>
                        <Col md={4}>
                            <p><strong>{profile.user.username}</strong></p>
                            <small className="widgets__small">@{profile.user.full_name}</small>
                        </Col>
                        </Row>
                    </ListGroup.Item>
                    ))}
                </ListGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
    )
}

export default FollowersList
