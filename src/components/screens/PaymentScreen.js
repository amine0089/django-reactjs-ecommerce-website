import React, {useState} from 'react'
import { useNavigate} from 'react-router-dom'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector} from 'react-redux'
import FormConainer from '../FormConainer'
import { savePaymentMethod } from '../../actions/cartActions'
import CheqoutSteps from '../CheqoutSteps'


function PaymentScreen() {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart 
    const dispatch = useDispatch()
    const [paymentMethod, setPaymentMethod] = useState('PayPal')
    const navigate = useNavigate()

    if(!shippingAddress.address){
        navigate('/shipping')
    }
    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }

  return (
    <FormConainer>
        <CheqoutSteps step1 step2 step3 />

        <Form onSubmit={submitHandler}>
            <Form.Group>
                <Form.Label as='legend'>
                    Select Method
                </Form.Label>
                <Col>
                    <Form.Check
                        type='radio'
                        label='PayPal or Credit Card'
                        id='paypal'
                        name='paymentMethod'
                        checked
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    >

                    </Form.Check>
                    
                </Col>
            </Form.Group>
            <Button type='submit' variant='primary' className='w-100 mt-3'>Continue</Button>
        </Form>
    </FormConainer>
  )
}

export default PaymentScreen