import React, {useEffect, useState} from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import FormContainer from '../component/FormContainer'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../actions/userActions'
import Message from '../component/Message'
import Loader from '../component/Loader'


function RegisterScreen({history}) {
    const dispatch = useDispatch()

    const userRegister = useSelector(state => state.userRegister)
    const {loading, userInfo, error} = userRegister

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [pw, setPw] = useState('')
    const [confirmPw, setConfirmPw] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(register({
            firstName, lastName,
            username, email,
            pw, confirmPw,
        }))
    }

    useEffect(() =>{
        if(userInfo){
            history.push('/')
        }
    }, [userInfo, history])

    return (
        <FormContainer>
            {loading && <Loader/>}
            {error && <Message variant="danger">{error}</Message>}
                <Form className="login__form" onSubmit={handleSubmit}>
                <h1 className='text-center text-info'><i className="fas fa-user-lock"></i></h1>
                <h2 className='text-center'>Sign Up</h2>
                <Form.Row>
                    <Col>
                        <Form.Control type="text" placeholder="First Name" 
                        value={firstName} onChange={(e) => setFirstName(e.target.value)} 
                        required/>    
                    </Col>
                    <Col>
                        <Form.Control type="text" placeholder="Last Name" 
                        value={lastName} onChange={(e) => setLastName(e.target.value)}
                        required />    
                    </Col>
                </Form.Row>
                <br/>

                <Form.Group controlId="formBasicname">
                    <Form.Control type="text" placeholder="Enter Nickname" 
                    value={username} onChange={(e) => setUsername(e.target.value)}
                    required/>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Control type="email" placeholder="Enter Email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required/>
                </Form.Group>

                <Form.Row>
                    <Col>
                        <Form.Control type="password" placeholder="Enter password" 
                        value={pw} onChange={(e) => setPw(e.target.value)}
                        required/>
                    </Col>
                    <Col>
                        <Form.Control type="password" placeholder="Confirm password" 
                        value={confirmPw} onChange={(e) => setConfirmPw(e.target.value)}
                        required/>
                    </Col>
                    
                </Form.Row>
                <br/>

                <Button className="login__button" type='submit' variant='outline-info' block>
                    Sign Up
                </Button>

                </Form>

                <Row className='py-3'>
                    <Col>
                    <small>Already have an account go to
                        <Link to='/login'> Login</Link> page
                    </small>
                    </Col>
                </Row>
        </FormContainer>
    )
}

export default RegisterScreen
