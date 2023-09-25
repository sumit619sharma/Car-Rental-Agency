import React, { useState,useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';

function CreateCar({onCarSave , editedCar}) {
  const [carData, setCarData] = useState({
    vehicleModel: '',
    vehicleNumber: '',
    seatingCapacity: '',
    rentPerDay: '',
  });
  

  useEffect(() => {
    if (editedCar) {
      setCarData({
        vehicleModel: editedCar.vehicleModel,
        vehicleNumber: editedCar.vehicleNumber,
        seatingCapacity: editedCar.seatingCapacity,
        rentPerDay: editedCar.rentPerDay,
      });
    }
  }, [editedCar]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarData({ ...carData, [name]: value });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    
    console.log('New Car Data:', carData);
  onCarSave(carData);

    
    setCarData({
      vehicleModel: '',
      vehicleNumber: '',
      seatingCapacity: '',
      rentPerDay: '',
    });
  };

  return (
    <Container>
      <h2>Add New Car</h2>
      <Form onSubmit={handleSubmit} className="border border-dark p-4 mb-3" >
        <Form.Group controlId="vehicleModel" className='mb-2'>
          <Form.Label>Vehicle Model</Form.Label>
          <Form.Control
            type="text"
            name="vehicleModel"
            value={carData.vehicleModel}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="vehicleNumber" className='mb-2'>
          <Form.Label>Vehicle Number</Form.Label>
          <Form.Control
            type="text"
            name="vehicleNumber"
            value={carData.vehicleNumber}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="seatingCapacity" className='mb-2'>
          <Form.Label>Seating Capacity</Form.Label>
          <Form.Control
            type="text"
            name="seatingCapacity"
            value={carData.seatingCapacity}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="rentPerDay" className='mb-2'>
          <Form.Label>Rent Per Day</Form.Label>
          <Form.Control
            type="text"
            name="rentPerDay"
            value={carData.rentPerDay}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className='w-100 mb-2'>
        {editedCar ? 'Update Car' : 'Create Car'}
      </Button>
      </Form>
    </Container>
  );
}

export default CreateCar;


