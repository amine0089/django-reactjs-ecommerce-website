import React, {useState} from 'react'
import { useNavigate} from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector} from 'react-redux'
import FormConainer from '../FormConainer'
import { saveShippinAddress } from '../../actions/cartActions'
import CheqoutSteps from '../CheqoutSteps'


function ShippingScreen() {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart
    const dispatch = useDispatch()

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const navigate = useNavigate()

    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(saveShippinAddress({address,city,postalCode,country}))
        navigate('/payment')
    }
  return (
    <FormConainer>
            <CheqoutSteps step1 step2 />
            <h1>Shipping</h1>
            
           <Form onSubmit={submitHandler}>
                   <Form.Group controlId='address' className='m-3'>
                        <Form.Label> Address:</Form.Label>
                        <Form.Control type='text' 
                            placeholder='Enter Address' 
                            value={address ? address : ''} 
                            onChange = {(e) => setAddress(e.target.value)} 
                            required>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='city' className='m-3'>
                        <Form.Label> City:</Form.Label>
                        <Form.Control type='text' 
                            placeholder='Enter City' 
                            value={city ? city : ''} 
                            onChange = {(e) => setCity(e.target.value)} 
                            required>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='postalCode' className='m-3'>
                        <Form.Label> Postal Code:</Form.Label>
                        <Form.Control type='text' 
                            placeholder='Enter Postal Code' 
                            value={postalCode ? postalCode : ''} 
                            onChange = {(e) => setPostalCode(e.target.value)} 
                            required>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='country' className='m-3'>
                        <Form.Label> Country:</Form.Label>
                        <Form.Control type='text' 
                            placeholder='Enter Country' 
                            value={country ? country : ''} 
                            onChange = {(e) => setCountry(e.target.value)} 
                            required>
                        </Form.Control>
                    </Form.Group>
                    <Button type='submit' variant='primary' className='w-100 mt-3'>Continue</Button>
            </Form>
    </FormConainer>
  )
}

export default ShippingScreen