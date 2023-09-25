
const Car = require('../model/cars');
const user = require('../model/user');


const addCar = async (req, res) => {
    try {
      const { vehicleModel, vehicleNumber, seatingCapacity, rentPerDay } = req.body;
  
   
      const newCar = await Car.create({
        vehicleModel,
        vehicleNumber,
        seatingCapacity,
        rentPerDay,
        userId: req.user.id
      });
  
      res.status(201).json({ message: 'Car added successfully', car: newCar });
    } catch (error) {
   
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  const deleteCar =  async (req, res) => {
    try {
      const carId = req.params.carId;
      
  
      
      const car = await Car.findByPk(carId);
  
      if (!car) {
        return res.status(404).json({ error: 'Car not found' });
      }
      await car.destroy();
  
      res.json({ message: 'Car deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  const updateCar =  async (req, res) => {
    try {
      const carId = req.params.carId;
      const updatedCarData = {...req.body,userId: req.user.id};
        
      const car = await Car.findByPk(carId);
  
      if (!car) {
        return res.status(404).json({ error: 'Car not found' });
      }
  
      await car.update(updatedCarData);
  
      res.json({ message: 'Car updated successfully', updatedCar: car });
    } catch (error) {
     
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

const getAllCars = async (req, res) => {
  try {
    const cars = await Car.findAll();
    res.json(cars);
  } catch (error) {
   
    res.status(500).json({ error: 'Error fetching cars' });
  }
}

  module.exports  ={
    addCar, deleteCar , updateCar,  getAllCars
  }