import React, {  useState } from 'react'
import {Container, Navbar, Nav , NavDropdown} from 'react-bootstrap';
import { Link,  useNavigate } from 'react-router-dom';


const NavBar = () => {
  console.log('navbar render irespective');
 const navigate = useNavigate();

 const handleLogout  =() => {
    localStorage.removeItem('user');
   navigate('/login');
  }

const user = JSON.parse(localStorage.getItem('user'))  || {};


  return (
    <div>
        <Navbar bg="success" data-bs-theme="dark">
        <Container>
          <Navbar.Brand className='fs-4 fst-italic' >CarAgency</Navbar.Brand>
         
  {user.isAgent && 
    <Nav className="me-auto">       
    <NavDropdown title="Admin-View" id="basic-nav-dropdown">
            <NavDropdown.Item > <Link  to='/car' >Add-Car</Link> </NavDropdown.Item>
            <NavDropdown.Item > <Link to='booked' >Booked-Car</Link> </NavDropdown.Item>
           
                  </NavDropdown>
       </Nav>
  }
 
     <div className=''> <Link className='  fs-5 me-2' style={{textDecoration: 'none',color: 'white'}} to="/">Home</Link></div>
          <div className='d-flex'>  
            {
              !user.token? (
                <div>
              <Link className='btn bg-white text-success mx-1 p-1' style={{textDecoration: 'none',color: 'white'}} to="/login">login</Link>
              <Link className='btn bg-white text-success mx-1 p-1' style={{textDecoration: 'none',color: 'white'}} to="/signup">signup</Link>
              </div> ) :
               <div>
                        <div onClick={handleLogout} className='btn bg-white text-danger mx-1 p-1' style={{textDecoration: 'none',color: 'white'}} to="/signup">logout</div>
            </div>
            }
            
            </div>
            
        </Container>
      </Navbar>
    </div>
  )
}

export default NavBar;
