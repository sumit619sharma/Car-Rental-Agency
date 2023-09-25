import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';

const BookedCar= () => {
  const [bookedCars, setBookedCars] = useState([]);
  const user = JSON.parse(localStorage.getItem('user')) || null  ;
   const getAllBookedCars =async () => {
    try {
      let resp =await  axios.get(`https://car-rental-agency-server.vercel.app/booking`,
        { headers: {
           "Content-Type": "application/json",
           Authorization: user.token,
         },  } )
         const data = await resp.data;
         
         setBookedCars(data);
     } catch (error) {
     
   }
   }

  useEffect(() => {
  getAllBookedCars();
  }, []);

  return (
    <div>
      <h2>Booked Cars List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Car Model</th>
            <th>User Name</th>
            <th>Start Date</th>
            <th>Rental Days</th>
          </tr>
        </thead>
        <tbody>
          {bookedCars.map((car) => (
            <tr key={car.id}>
              <td>{'MP09CB'}</td>
              <td>{car.user.name}</td>
              <td>{car.startDate}</td>
              <td>{car.forDays}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default BookedCar;

