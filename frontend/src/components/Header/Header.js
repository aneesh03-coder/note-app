import React from 'react'
import { Container, Form, FormControl, Nav, Navbar, NavDropdown} from 'react-bootstrap'
import {Link, useHistory} from 'react-router-dom'
import {loggingOut, selectuserInfo} from "../../features/user/userLoginSlice"
import { useDispatch, useSelector } from 'react-redux'

function Header({setSearch}) {
    const history=useHistory();
    const dispatch=useDispatch();
    const {userInfo}=useSelector(selectuserInfo)
    const logoutHandler=()=>{
        dispatch(loggingOut());
        history.push("/");
    }
    return (
        <Navbar bg="primary" expand="lg" variant='dark'>
            <Container>
                <Navbar.Brand >                   
                        <a href="/">Leave Management System</a>                    
               </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className='m-auto'>
                        <Form inline>
                            <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={(e)=>setSearch(e.target.value)} />
                        </Form>
                    </Nav>
                 { userInfo ? <Nav >
                        <Nav.Link >
                            <Link to="/mynotes">
                                My Notes
                            </Link>
                        </Nav.Link>
                        
                        <NavDropdown title={userInfo?.name} id="basic-nav-dropdown">
                            <NavDropdown.Item ><Link to="/profile">My Profile</Link></NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>: <Nav>
                    <Nav.Link >
                            <Link to="/login">
                               Login
                            </Link>
                        </Nav.Link>
                    </Nav>}
                </Navbar.Collapse>
            </Container>
        </Navbar>
  
    )
}

export default Header
