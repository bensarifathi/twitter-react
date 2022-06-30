import React, {useEffect, useState} from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import FormContainer from '../component/FormContainer'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/userActions'
import Message from '../component/Message'
import Loader from '../component/Loader'


function LoginScreen({history}) {
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const {loading, error, userInfo} = userLogin

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    useEffect(() => {
        if(userInfo){
            history.push('/')
        }
    }, [history, userInfo])

    return (
        <FormContainer>
                <Form className="login__form" onSubmit={handleSubmit}>
                <h1 className='text-center text-info'><i className="fas fa-user-lock"></i></h1>
                <h2 className='text-center'>Sign In</h2>

                {error && <Message variant="danger">{error}</Message>}
                {loading && <Loader/>}

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" required
                      name="email" onChange={(e) => setEmail(e.target.value)}/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" required
                     name="password" onChange={(e) => setPassword(e.target.value)}/>
                </Form.Group>

                <Button className="login__button" type='submit' variant='outline-info' block>
                    Sign In
                </Button>

                </Form>

                <Row className='py-3'>
                    <Col>
                    <small>Don't have an account please
                        <Link to='/register'> Sign Up</Link>
                    </small>
                    </Col>
                </Row>
            </FormContainer>
    )
}

export default LoginScreen
