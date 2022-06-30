import React, {useEffect} from 'react'
import { Button, Col, Form, FormControl, Image, ListGroup, Row } from 'react-bootstrap'
import Message from './Message'
import Loader from './Loader'
import { useDispatch, useSelector } from 'react-redux'
import { getNonFollowingList, follow } from '../actions/followActions'
import { Link } from 'react-router-dom'

function Widgets() {
    const dispatch = useDispatch()

    const nonFollowList = useSelector(state => state.nonFollowList)
    const {loading, recommendation, error} = nonFollowList

    const followUser = useSelector(state => state.followUser)
    const {loading: loadFollow, success: successFollow} = followUser

    const handleFollow = (e, id) => {
        e.preventDefault()
        dispatch(follow(id))
    }

    useEffect(() => {
        dispatch(getNonFollowingList())
    }, [dispatch])

    useEffect(() => {
        if(successFollow){
            dispatch(getNonFollowingList())
        }
    }, [dispatch, successFollow])

    return (
        <div className="widgets">
            <Form className="widgets__input">
                <div><i className="fas fa-search widgets__search"></i></div>
                <FormControl type="text" placeholder="Search"/>
            </Form>
            <ListGroup>
                <h2>Trend for you</h2>
                <ListGroup.Item><strong>#declaration_of_war</strong></ListGroup.Item>
                <ListGroup.Item><strong>#Ryad_mahrez</strong></ListGroup.Item>
                <ListGroup.Item><strong>#DonaldTrump</strong></ListGroup.Item>
                <ListGroup.Item><strong>#theHerosOfWar</strong></ListGroup.Item>
                <ListGroup.Item><strong>#bestColne</strong></ListGroup.Item>
                <ListGroup.Item><strong>#Django</strong></ListGroup.Item>
                <ListGroup.Item><strong>#Recat</strong></ListGroup.Item>
                <h2>More</h2>
            </ListGroup>

            <ListGroup>
                <h2>Who to follow</h2>
                
                {loadFollow && <Loader/>}
                {loading ? <Loader/>:
                error ? <Message variant="danger">{error}</Message>:
                recommendation.map((profile) => (
                    <ListGroup.Item key={profile.id}>
                        <Form onSubmit={(e) => handleFollow(e, profile.id)}>
                        <Row className="widgets__profile">
                        
                        <Col md={3}>
                            <Image className="avatar" src={profile.avatar} alt="pic"/>
                        </Col>
                        
                        <Col md={4}>
                            <Link to={`/profile/${profile.id}`}>
                            <p><strong>{profile.username}</strong></p>
                            </Link>
                        </Col>
                        
                        <Col md={4}>
                            <Button type='submit' className="widgets__button">Follow</Button>
                        </Col>
                        </Row>
                        </Form>
                    </ListGroup.Item>
                ))
                
                }   
                <h2>More</h2>
            </ListGroup>
        </div>
    )
}

export default Widgets
