// App.js
import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';

import CreateCar from '../components/CreateCar';
import CarList from '../components/CarList';
import axios from 'axios';

function CustomCar() {
  const [cars, setCars] = useState([]);
  const [editedCar, setEditedCar] = useState(null); 

  const user = JSON.parse(localStorage.getItem('user'))

  const getAllCars = async () => {
    try {
        let resp =await  axios.get(`http://localhost:5000/cars`,
          { headers: {
             "Content-Type": "application/json",
             Authorization: user.token,
           },  } )
       
       const data = await resp.data;
    
       setCars(data);
       } catch (error) {
       
     }
  }

  const handleCarCreate =async (carData) => {
    if(editedCar){
       
        const carId = editedCar.id;
        try {
            let resp =await  axios.put(`http://localhost:5000/cars/${carId}`, carData,
              { headers: {
                 "Content-Type": "application/json",
                 Authorization: user.token,
               },  } )
       
           getAllCars();
           setEditedCar(null);
           } catch (error) {
           setEditedCar(null);
         }
         return ;
    }
    
    try {
   let resp =await  axios.post(`http://localhost:5000/cars`, carData,
     { headers: {
        "Content-Type": "application/json",
        Authorization: user.token,
      },  } )
  
  getAllCars();
  } catch (error) {
  
}
};

  const handleCarDelete =async (carIdToDelete) => {
    try {
        let resp =await  axios.delete(`http://localhost:5000/cars/${carIdToDelete}`,
          { headers: {
             "Content-Type": "application/json",
             Authorization: user.token,
           },  } )
  
       getAllCars();
       } catch (error) {
       
     }
    
  };

  const handleCarEdit = (carToEdit) => {
    setEditedCar(carToEdit);  };

  useEffect(() => {
    getAllCars();
  }, []);

  return (
    <Container>
      
      <CreateCar onCarSave={handleCarCreate} editedCar={editedCar} />
      <CarList cars={cars} onCarEdit={handleCarEdit} onCarDelete={handleCarDelete} />
    </Container>
  );
}

export default CustomCar;
