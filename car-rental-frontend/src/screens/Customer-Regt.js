// Registration.js
import axios from 'axios';
import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import {Link, NavLink, useNavigate} from 'react-router-dom'

function CustomerRegistration() {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    
try {
  const resp = await axios.post('http://localhost:5000/auth/customer',userData)
  navigate('/login');
} catch (error) {
  
}

    setUserData({ name: '', email: '', password: '' });
  };

  return (
    <Container>
      <h2>Registration</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="username" className='mb-2'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="email" className='mb-2'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="password" className='mb-2'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <div className='d-flex justify-content-between  m-2' > <div> agency <Link to={'/agency'} >sign up?</Link> </div> 
        <div> <Link to='/login'>login?</Link> </div>
         </div>
        <Button variant="primary" type="submit" className='w-100'>
          Register
        </Button>
      </Form>
    </Container>
  );
}

export default CustomerRegistration;
