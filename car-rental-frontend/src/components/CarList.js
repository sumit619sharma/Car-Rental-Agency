// CarList.js
import React from 'react';
import { Table, Button } from 'react-bootstrap';

function CarList({ cars, onCarEdit, onCarDelete }) {
  
  
    return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Vehicle Model</th>
          <th>Vehicle Number</th>
          <th>Seating Capacity</th>
          <th>Rent Per Day</th>
          <th>Actions</th>
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
              <Button  className='me-2' variant="primary" onClick={() => onCarEdit(car)}>
                Edit
              </Button>
              <Button variant="danger" onClick={() => onCarDelete(car.id)}>
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default CarList;
