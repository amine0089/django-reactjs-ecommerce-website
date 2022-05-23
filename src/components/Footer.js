import React from 'react'
import { Container,Row,Col } from 'react-bootstrap'

function Footer() {
  return (
    <footer  style={{background:'#090b13',color:'white'}}>
            <Container>
              <Row>
                  <Col className='text-center py-3' >
                      Copyright &copy; Mohammed
                  </Col>
              </Row>
            </Container>
    </footer>
  )
}

export default Footer