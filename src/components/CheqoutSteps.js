import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

function CheqoutSteps({ step1, step2, step3, step4 }) {
  return (
    <Nav className='justify-content-center mb-4 mt-4' >
        <Nav.Item style={{marginRight: '0px'}} >
            { step1 ? (
                <LinkContainer to='/login'>
                    <Nav.Link><i className="fa-solid fa-user"></i> Login</Nav.Link>
                </LinkContainer>
            ) : (
                <Nav.Link disabled><i className="fa-solid fa-user"></i> Login</Nav.Link>
            )}
        </Nav.Item>

        <Nav.Item style={{marginRight: '0px'}} >
            { step2 ? (
                <LinkContainer to='/shipping'>
                    <Nav.Link><i className="fa-solid fa-truck-fast"></i> Shipping</Nav.Link>
                </LinkContainer>
            ) : (
                <Nav.Link disabled><i className="fa-solid fa-truck-fast"></i> Shipping</Nav.Link>
            )}
        </Nav.Item>

        <Nav.Item style={{marginRight: '0px'}} >
            { step3 ? (
                <LinkContainer to='/payment'>
                    <Nav.Link><i className="fa-solid fa-money-bill-wave"></i> Payment</Nav.Link>
                </LinkContainer>
            ) : (
                <Nav.Link disabled><i className="fa-solid fa-money-bill-wave"></i> Payment</Nav.Link>
            )}
        </Nav.Item>

        <Nav.Item style={{marginRight: '0px'}} >
            { step4 ? (
                <LinkContainer to='/placeorder'>
                    <Nav.Link><i className="fa-solid fa-cart-arrow-down"></i> Place Order</Nav.Link>
                </LinkContainer>
            ) : (
                <Nav.Link disabled><i className="fa-solid fa-cart-arrow-down"></i> Place Order</Nav.Link>
            )}
        </Nav.Item>
    </Nav>
  )
}

export default CheqoutSteps