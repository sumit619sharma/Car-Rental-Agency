// AgencyRegistration.js
import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function AgencyRegistration() {
  const [adminData, setAdminData] = useState({
    name: '',
    email: '',
    password: '',
      });
const navigate =  useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminData({ ...adminData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    await axios.post('http://localhost:5000/auth/agent',adminData)
    navigate('/login');
   } catch (error) {
    
   }
   
    setAdminData({
      name: '',
      email: '',
      password: '',
      
    
    });
  };

  return (
    <Container>
      <h2>Agency Registration</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="agencyName" className='mb-2'>
          <Form.Label>Agency Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={adminData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="email" className='mb-2'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={adminData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="password" className='mb-2'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={adminData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>
        
        <div className='d-flex justify-content-between  m-2' > <div> customer <Link to={'/customer'} >sign up?</Link> </div> 
        <div> <Link to='/login'>login?</Link> </div>
         </div>

        <Button variant="primary" type="submit"className='w-100'>
          Register
        </Button>
      </Form>
    </Container>
  );
}

export default AgencyRegistration;
