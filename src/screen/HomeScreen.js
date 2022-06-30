import React, {useEffect} from 'react'
import { Col, Row } from 'react-bootstrap'
import Feed from '../component/Feed'
import Sidebar from '../component/Sidebar'
import Widgets from '../component/Widgets'
import { useSelector } from 'react-redux'
import Loader from '../component/Loader'

function HomeScreen({history}) {
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    useEffect(() => {
        if(!userInfo){
            history.push('/login')
        }
    }, [history, userInfo])
    return (
        (!userInfo ? 
        <Loader />:
        <Row>
            <Col className="sidebar m-3"><Sidebar/></Col>
            <Col md={6}><Feed/></Col>
            <Col><Widgets/></Col>
        </Row>
        )
    )
}

export default HomeScreen
