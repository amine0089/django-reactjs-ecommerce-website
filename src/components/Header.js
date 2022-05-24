import React from 'react'
import { useDispatch, useSelector  } from 'react-redux'
import { Container, Row, Nav, Navbar, NavDropdown} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../actions/userActions'
import SearchBox from './SearchBox'
function Header() {

  const userLogin = useSelector(state => state.userLogin)
  const  { userInfo } = userLogin

  const dispatch = useDispatch()
  
  const logoutHandler = () =>{
    dispatch(logout())
  }

  return (
    <header>
      <Navbar id='headermy' variant='dark' expand="lg">
          <Container>
            <LinkContainer to='/'>
                  <Navbar.Brand>AmineShop</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <SearchBox />
                <Nav style={{marginLeft:'auto'}}>
                <LinkContainer to='/cart'>
                    <Nav.Link><i className='fas fa-shopping-cart'> Cart</i></Nav.Link>
                </LinkContainer>

                {userInfo ? (
                    <NavDropdown title={userInfo.name} id='username'>
                          <LinkContainer to='/profile'>
                                <NavDropdown.Item>
                                    Profile
                                </NavDropdown.Item>
                          </LinkContainer>
                                <NavDropdown.Item onClick={logoutHandler}>
                                    Logout
                                </NavDropdown.Item>
                    </NavDropdown>
                ) : (
                  <LinkContainer to='/login'>
                        <Nav.Link><i className='fas fa-user'> Login</i> </Nav.Link>
                  </LinkContainer>
                )}

                {userInfo && userInfo.isAdmin  && (
                  <NavDropdown title='Admin' id='adminmenue'>
                      <LinkContainer to='/admin/userlist'>
                          <NavDropdown.Item>
                              Users
                          </NavDropdown.Item>
                      </LinkContainer>

                      <LinkContainer to='/admin/productlist'>
                          <NavDropdown.Item>
                              Products
                          </NavDropdown.Item>
                      </LinkContainer>

                      <LinkContainer to='/admin/orderlist'>
                          <NavDropdown.Item>
                              Orders
                          </NavDropdown.Item>
                      </LinkContainer>
                  </NavDropdown>
                )}
                </Nav>
              </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header