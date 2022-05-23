import React, {useState, useEffect} from 'react'
import { Link , useLocation, useNavigate} from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import Loader  from '../Loader'
import Message  from '../Message'
import { useDispatch, useSelector} from 'react-redux'
import { register } from '../../actions/userActions'
import FormConainer from '../FormConainer'


function RegisterScreen() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const redi = useLocation().search
    const redirect =  redi ? useLocation.search.split('=')[1] : '/'

    const navigate = useNavigate()

    const userRegister = useSelector(state => state.userRegister)
    const { error, loading, userInfo } = userRegister

    useEffect(() => {
        if(userInfo){
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect])
    const submitHandler = (e) =>{
        e.preventDefault()
        if(password !== confirmPassword){
            setMessage('Password do not match')
        }else{
            dispatch(register(name, email, password))
        }
        
    }
  return (
    <FormConainer>
        <h1>Sign in</h1>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit = {submitHandler}>

            <Form.Group controlId='name'>
                <Form.Label> Name:</Form.Label>
                <Form.Control type='name' placeholder='Enter Name' value={name} onChange = {(e) => setName(e.target.value)} required></Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
                <Form.Label> Email Address:</Form.Label>
                <Form.Control type='email' placeholder='Enter Email' value={email} onChange = {(e) => setEmail(e.target.value)} required></Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
                <Form.Label> Password: </Form.Label>
                <Form.Control type='password' placeholder='Enter Password' value={password} onChange = {(e) => setPassword(e.target.value)} required></Form.Control>
            </Form.Group>

            <Form.Group controlId='passwordConfirm'>
                <Form.Label> Confirm Password: </Form.Label>
                <Form.Control type='password' placeholder='Confirm Password' value={confirmPassword} onChange = {(e) => setConfirmPassword(e.target.value)} required></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary' className='w-100 mt-3'>Register</Button>
        </Form>
        
        <Row className='py-3'>
             <Col>
                    Have an Account?<Link to={'/login'}>Sign In</Link>
             </Col> 
        </Row>

    </FormConainer>
  )
}

export default RegisterScreen