const express = require("express");

const { addCar,  updateCar , deleteCar , getAllCars } = require("../controller/cars");
 const {isAuthrorized , userRole } = require('../controller/auth')
const carsRouter = express.Router();

carsRouter.get('/', getAllCars)
carsRouter.post('/',isAuthrorized, userRole,  addCar)
carsRouter.delete('/:carId', isAuthrorized, userRole , deleteCar);
carsRouter.put('/:carId', isAuthrorized, userRole ,  updateCar);


module.exports = carsRouter;
