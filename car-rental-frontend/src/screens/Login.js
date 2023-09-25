// Login.js
import axios from 'axios';
import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    
    
    
try {
   const resp = await axios.post('http://localhost:5000/auth/login',formData)
  if(resp.status!==200){
    return;
  }
  
  const userDetail = await  resp.data
  localStorage.setItem('user',  JSON.stringify(userDetail) );
 navigate('/')

  } catch (error) {
  
}

    setFormData({ email: '', password: '' });
  };

  return (
    <Container>
      <h2>Login</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email" className='mb-2'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="password" className='mb-2'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>
         <div>don't have account yet <Link to={'/customer'} >sign up?</Link> </div> 
        <Button variant="primary" type="submit" className='w-100 mt-3'>
          Login
        </Button>
      </Form>
    </Container>
  );
}

export default Login;
