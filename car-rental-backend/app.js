const express = require('express')
const app = express();
const sequelize =require('./utils/database');
const cors = require('cors')
const User = require('./model/user');
const Cars = require('./model/cars');
const Booking = require('./model/booking');

require('dotenv').config(); 
app.use(cors());
app.use(express.json());

// routes
const authRouter = require('./routes/auth');
const carsRouter = require('./routes/cars');
const bookingRouter = require('./routes/booking');

// api endpoints
app.use('/cars',carsRouter);
 app.use('/auth',authRouter );
app.use('/booking',bookingRouter );
 
// table relations
User.hasMany(Cars);
Cars.belongsTo(User);

User.hasMany(Booking);
Booking.belongsTo(User);

Cars.hasOne(Booking);
Booking.belongsTo(Cars);


sequelize
.sync()
.then(result => {

  console.log('sequelize connected')
    app.listen(5000);    
}).catch(err=> {
    console.log('.env===', process.env.DB_NAME,process.env.DB_USERNAME , process.env.DB_PASSWORD,)
    console.log("sequelize error==",err);
})


