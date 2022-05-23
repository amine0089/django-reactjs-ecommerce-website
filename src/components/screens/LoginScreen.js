import React, {useState, useEffect} from 'react'
import { Link , useLocation, useNavigate} from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import Loader  from '../Loader'
import Message  from '../Message'
import { useDispatch, useSelector} from 'react-redux'
import { login } from '../../actions/userActions'
import FormConainer from '../FormConainer'

function LoginScreen() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    const redi = useLocation().search
    const redirect =  redi ? useLocation.search.split('=')[1] : '/'

    const navigate = useNavigate()

    const userLogin = useSelector(state => state.userLogin)
    const { error, loading, userInfo } = userLogin

    useEffect(() => {
        if(userInfo){
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect])
    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(login(email, password))
    }
    
  return (
    <FormConainer>
        <h1>Sign in</h1>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit = {submitHandler}>
            <Form.Group controlId='email'>
                <Form.Label> Email Address:</Form.Label>
                <Form.Control type='email' placeholder='Enter Email' value={email} onChange = {(e) => setEmail(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
                <Form.Label> Password: </Form.Label>
                <Form.Control type='password' placeholder='Enter Password' value={password} onChange = {(e) => setPassword(e.target.value)}></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary' className='w-100 mt-3'>Sign In</Button>
        </Form>

        <Row className='py-3'>
             <Col>
                    New Customer?<Link to={'/register'}>Register</Link>
             </Col> 
        </Row>
    </FormConainer>
  )
}

export default LoginScreen