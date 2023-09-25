const  Cars  = require('../model/cars');
const  Bookings  = require('../model/booking');
const  Users  = require('../model/user');

const getAgencyBookings = async (req,res) => {
try {
    const agencyId = req.user.id;

    const cars = await  Cars.findAll({
           where: { userId: agencyId }, 
    })
      const carIds = cars.map((car) => car.id);
    
    const bookings = await Bookings.findAll({
            where: { carId: carIds },
            include: [
            {
              model: Users,
            },
          ],
        });
    
 
        res.status(200).json(bookings);  
   } catch (error) {
  res.status(500).json({ error: 'Internal server error' });
      }
    }

const createBooking = async (req,res) => {
    const {  carId, startDate, rentDays } = req.body;

    try {
  const booking = await Bookings.create({
    userId: req.user.id, 
    carId: carId, 
    startDate: startDate,
    forDays: Number(rentDays),
  });

  res.status(201).json(booking); 
} catch (error) {

  res.status(500).json({ error: 'Internal server error' });
}
}


module.exports = {
    getAgencyBookings,
    createBooking , 
}