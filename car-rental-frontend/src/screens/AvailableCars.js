import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Table, Form, Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function AvailableCars() {
  const [cars, setCars] = useState([]);

  const [selectedCar, setSelectedCar] = useState(null);
  const [rentDays, setRentDays] = useState(1);
  const [startDate, setStartDate] = useState('');
 
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')) || null  ;

  const getAllCars = async () => {
    try {
        let resp =await  axios.get(`https://car-rental-agency-server.vercel.app/cars`,
           )
       const data = await resp.data;
          setCars(data);
       } catch (error) {
       
     }
  }

  const handleRentCar =async (e) => {
    e.preventDefault();
    if (selectedCar && startDate && rentDays >= 1) {
      
      const booking =  {
        carId: selectedCar.id,
        startDate,
        rentDays,
      };
      try {
        let resp =await  axios.post(`https://car-rental-agency-server.vercel.app/booking`, booking,
          { headers: {
             "Content-Type": "application/json",
             Authorization: user.token,
           },  } )
       } catch (error) {
       
     }
             setSelectedCar(null);
      setRentDays(1);
      setStartDate('');
    } else {
      alert('Please select a car, enter start date, and specify rent days.');
    }
  };

  const handleUserType = (car) => {
    console.log('user===',user,selectedCar);
    if(!user){
       navigate('/login')
       return;
    }
    if( user.isAgent===true){
      
    return;
    }

    setSelectedCar(car);
  }

  useEffect(() => {
  getAllCars();
  },[])

  return (
    <Container>
      <h2>Available Cars to Rent</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Vehicle Model</th>
            <th>Vehicle Number</th>
            <th>Seating Capacity</th>
            <th>Rent Per Day</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <tr key={car.id}>
              <td>{car.vehicleModel}</td>
              <td>{car.vehicleNumber}</td>
              <td>{car.seatingCapacity}</td>
              <td>{car.rentPerDay}</td>
              <td>
                {car.availability ? (
                  <Button disabled={user?user.isAgent: false}
                    variant="primary"
                    onClick={ ()=> {handleUserType(car)} }
                  >
                    Rent Car
                  </Button>
                ) : (
                  'Not Available'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {selectedCar && (
        <div>
          <Form onSubmit={handleRentCar} >
            <Form.Group controlId="rentDays" className='mb-3'>
              <Form.Label>Number of Days</Form.Label>
              <Form.Control
                type="number"
                value={rentDays}
                onChange={(e) => setRentDays(e.target.value)}
                min="1"
              />
            </Form.Group>
            <Form.Group controlId="startDate" className='mb-3'>
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </Form.Group>
          </Form>
          <Button variant="success" onClick={handleRentCar} className='w-100'>
            Rent Selected Car
          </Button>
        </div>
      )}
    </Container>
  );
}

export default AvailableCars;
