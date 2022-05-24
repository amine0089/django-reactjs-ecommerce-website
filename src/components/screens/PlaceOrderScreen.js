import React, {useEffect} from 'react'
import { useNavigate, Link} from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector} from 'react-redux'
//import { saveShippinAddress } from '../../actions/cartActions'
import Message from '../Message'
import CheqoutSteps from '../CheqoutSteps'
import { createOrder } from '../../actions/orderActions'
import { ORDER_CREATE_RESET } from '../../constant/orderConstant'

function PlaceOrderScreen() {

    const orderCreate = useSelector(state => state.orderCreate)
    const { order, error, success } = orderCreate

const dispatch = useDispatch()
const cart = useSelector(state => state.cart)
cart.itemPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
cart.shippingPrice = (cart.itemPrice > 500 ? 10 : 0).toFixed(2)
cart.taxPrice = Number((0.013) * cart.itemPrice).toFixed(2)
cart.totalPrice = (Number(cart.itemPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)

const navigate = useNavigate()


useEffect(() => {
    if(success){
        navigate(`/order/${order._id}`)
        dispatch({type: ORDER_CREATE_RESET })
    }
}, [success, navigate])

const placeOrder = () =>{
    if(!cart.paymentMethod){
        navigate('/payment')
    }
    else{
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemPrice: cart.itemPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice
        }))
    }    
    
    
}

  return (
    <div>
        <CheqoutSteps step1 step2 step3 step4 />
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2><i className="fa-solid fa-house-chimney"></i> Shipping</h2>
                        <p>
                            <strong>Shipping: </strong>
                            {cart.shippingAddress.address}, {cart.shippingAddress.city}
                            {' '}
                            {cart.shippingAddress.postalCode},
                            {' '}
                            {cart.shippingAddress.country}
                        </p>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2><i className="fa-brands fa-paypal"></i> Payment Method</h2>
                        <p>
                            <strong>Method: </strong>
                            {cart.paymentMethod}
                        </p>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2><i className="fa-solid fa-bag-shopping"></i> Order Items</h2>
                        {cart.cartItems.length === 0 ? <Message variant='info'>
                            Your Cart Is Empty
                        </Message> : (
                            <ListGroup variant='flush'> 
                                {cart.cartItems.map((item,index) => (
                                    <ListGroup.Item key={index}>
                                        <Row>
                                            <Col md={1}>
                                                <Image src={item.image} alt={item.name} fluid rounded/>
                                            </Col>

                                            <Col>
                                                <Link to={`/product/${item.product}`} style={{ textDecoration: 'none' }}>
                                                    {item.name}
                                                </Link>
                                            </Col>

                                            <Col md={5}>
                                                {item.qty} x ${item.price} = ${(item.qty*item.price).toFixed(2)}
                                            </Col>
                            
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )}
                    </ListGroup.Item>
                </ListGroup>
            </Col>

            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Order Summary</h2>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Items:
                                </Col>
                                <Col>
                                    ${cart.itemPrice}
                                </Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Shipping:
                                </Col>
                                <Col>
                                    ${cart.shippingPrice}
                                </Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Tax:
                                </Col>
                                <Col>
                                    ${cart.taxPrice}
                                </Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Total:
                                </Col>
                                <Col>
                                    ${cart.totalPrice}
                                </Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            {error && <Message variant='danger'>{error}</Message>}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Button type='submit' 
                            variant='primary' 
                            className='w-100 mt-3' 
                            disabled={cart.cartItems === 0}
                            onClick = {placeOrder}
                            >
                                Place Order
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </div>
  )
}

export default PlaceOrderScreen