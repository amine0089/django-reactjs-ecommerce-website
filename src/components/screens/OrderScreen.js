import React, {useEffect , useState} from 'react'
import { Link, useParams, useNavigate} from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector} from 'react-redux'
//import { saveShippinAddress } from '../../actions/cartActions'
import Message from '../Message'
import Loader from '../Loader'
import { getOrderDetails, payOrder, deliverOrder } from '../../actions/orderActions'
import { PayPalButton } from 'react-paypal-button-v2'
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../../constant/orderConstant'
//amineshope@gmail.com 
//AUn0eCTLFoE8V8l1p_o3wv_hAff3t83o6os0Abws6s3vrDIQfIZPRtRL5DDNUgj5YCa6Il7qMvpL3T2_

function OrderScreen() {

    
    const dispatch = useDispatch()

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, error, loading } = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const { loading:loadingPay, success:successPay } = orderPay

    const orderDeliver = useSelector(state => state.orderDeliver)
    const { loading:loadingDeliver, success:successDeliver } = orderDeliver

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const { id }  = useParams()
    const [sdkReady, setSdkReady] = useState(false)
    const navigate = useNavigate()
    if(!loading && !error){
        order.itemPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    }

    const addPaypalScript = () =>{
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = 'https://www.paypal.com/sdk/js?client-id=AUn0eCTLFoE8V8l1p_o3wv_hAff3t83o6os0Abws6s3vrDIQfIZPRtRL5DDNUgj5YCa6Il7qMvpL3T2_'
        script.async = true
        script.onload = () => {
            setSdkReady(true)
        }
        document.body.append(script)
    }
    
    

    useEffect(() => {
        if(!userInfo){
            navigate('/login')
        }
        if(!order || successPay || order._id !== Number(id) || successDeliver ){
            dispatch({type: ORDER_PAY_RESET})
            dispatch({type: ORDER_DELIVER_RESET})
            dispatch(getOrderDetails(id))
        }else if(!order.isPaid){
            if(!window.paypal){
                addPaypalScript()
            }else{
                setSdkReady(true)
            }
        }
        
    }, [dispatch,order,id, successPay, successDeliver,navigate])

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(id,paymentResult))
    }

    const delivertHandler = () => {
        dispatch(deliverOrder(order))
    }

  return loading ? (
      <Loader/>
  ) : error ? (
      <Message variant='danger'>{error}</Message>
  ) : (
    <div>
        <h1>Order : {order._id}</h1>
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2><i className="fa-solid fa-house-chimney"></i> Shipping</h2>
                        <p><strong>Name: {order.user.name}</strong></p>
                        <p><strong>Email: <a href={`mailTo:${order.user.email}`} target='_blank'>{order.user.email}</a></strong></p>
                        <p>
                            <strong>Shipping: </strong>
                            {order.shippingAddress.address}, {order.shippingAddress.city}
                            {' '}
                            {order.shippingAddress.postalCode},
                            {' '}
                            {order.shippingAddress.country}
                        </p>
                        {order.isDelivered ? (
                            <Message variant='success'>Delivered On {order.deliverdAt}</Message>
                        ) : (
                            <Message variant='warning'>Not Delivered</Message>
                        )}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2><i className="fa-brands fa-paypal"></i> Payment Method</h2>
                        <p>
                            <strong>Method: </strong>
                            {order.paymentMethod}
                        </p>

                        {order.isPaid ? (
                            <Message variant='success'>Paid On {order.paidAt}</Message>
                        ) : (
                            <Message variant='warning'>Not Paid</Message>
                        )}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2><i className="fa-solid fa-bag-shopping"></i> Order Items</h2>
                        {order.orderItems.length === 0 ? <Message variant='info'>
                            Order Is Empty
                        </Message> : (
                            <ListGroup variant='flush'> 
                                {order.orderItems.map((item,index) => (
                                    <ListGroup.Item key={index}>
                                        <Row>
                                            <Col md={1}>
                                                <Image src={item.image}  fluid rounded />
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
                                    ${order.itemPrice}
                                </Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Shipping:
                                </Col>
                                <Col>
                                    ${order.shippingPrice}
                                </Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Tax:
                                </Col>
                                <Col>
                                    ${order.taxPrice}
                                </Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Total:
                                </Col>
                                <Col>
                                    ${order.totalPrice}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        
                        {!order.isPaid && (
                            <ListGroup.Item>
                                {loadingPay && <Loader/>}
                                {!sdkReady ? (
                                    <Loader/>
                                ) : (
                                    <PayPalButton
                                        amount={order.totalPrice}
                                        onSuccess = {successPaymentHandler}

                                    />
                                )}
                            </ListGroup.Item>
                        )}
                    </ListGroup>
                    {loadingDeliver && <Loader />}
                    {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                        <ListGroup.Item>
                            <Button type='button' className='w-100' onClick={delivertHandler}>
                                Mark As Deliver
                            </Button>
                        </ListGroup.Item>
                    )}
                </Card>
            </Col>
        </Row>
    </div>
  )
}

export default OrderScreen