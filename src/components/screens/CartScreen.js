import React, { useEffect } from 'react'
import {Link, useParams, useNavigate, useLocation} from 'react-router-dom'
import {useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Card, Button, Form} from 'react-bootstrap'
import Message  from '../Message'
import { addToCart, removeFromCart } from '../../actions/cartActions'

function CartScreen() {

  const { id } = useParams()
  const productId = id
  const qtyFirst = useLocation().search
  const qty = qtyFirst ? Number(qtyFirst.split('=')[1]) : 1
  let navigate = useNavigate()

  /*if(qty){
    qty = Number(qty.split('=')[1])
    console.log('qty:',qty)
  }else{
    qty = 1
  }*/
  
  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)
  const {cartItems} = cart
  console.log('cartItems:', cartItems)

  useEffect(() => {
      if(productId){
          dispatch(addToCart(productId,qty))
      }
  }, [dispatch, productId, qty])

  const removeFromCartHandler = (id) =>{
      dispatch(removeFromCart(id))
  }
  const checkoutHandler = () => {
    navigate('/shipping')
  }

  return (
    <Row>
        <Col md={8}>
            <h1>Shopping Cart</h1>
            {cartItems.length === 0 ? (
              <Message variant='info'>
                  Your Cart is emty <Link to='/'>Go Back</Link>
              </Message>
            ): (
              <ListGroup variant='flush'>
                  {cartItems.map((item, index ) => (
                      <ListGroup.Item key={item.product}>
                        <Row>
                          <Col md={2}>
                              <Image src={item.image} alt={item.name} fluid rounded/>
                          </Col>
                          
                          <Col md={3}>
                              <Link to={`/product/${item.product}`} style={{ textDecoration: 'none' }}>{item.name}</Link>
                          </Col>
                          <Col md={2}>
                              ${item.price}
                          </Col>

                          <Col md={3}>
                            <Form.Control as='select' value={item.qty} onChange={(e) => dispatch(addToCart(item.product,Number(e.target.value)))}>
                                {[...Array(item.countInStock).keys()].map((x)=>(
                                    <option  key={x+1} value={x+1}>
                                        {x+1}
                                    </option>
                                ))}
                            </Form.Control>
                          </Col>

                          <Col md={1}>
                              <Button type='button' variant='light' onClick={() => removeFromCartHandler(item.product)}>
                                  <i className='fas fa-trash'></i>
                              </Button>     
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))
                  }
              </ListGroup>
            )}
        </Col>

        <Col md={4}>
              <Card>
                  <ListGroup variant='flush'>
                      <ListGroup.Item>
                          <h2>SubTotal ({cartItems.reduce((acc,item) => acc + item.qty, 0)}) items</h2>
                          Total Price : ${cartItems.reduce((acc,item) => acc + item.qty * item.price, 0).toFixed(2)}
                      </ListGroup.Item>

                      <ListGroup.Item>
                          <Button type = 'button' className='w-100' disabled={cartItems.length === 0 } onClick = {checkoutHandler}>
                              Proceed To Checkout
                          </Button>
                      </ListGroup.Item>
                  </ListGroup>
              </Card>
        </Col>
    </Row>
  )
}

export default CartScreen