const express = require("express");

const { getAgencyBookings , createBooking } = require("../controller/booking");
const {isAuthrorized, userRole} = require('../controller/auth')

const bookingRouter = express.Router();

bookingRouter.post("/", isAuthrorized , userRole,  createBooking);
bookingRouter.get("/", isAuthrorized , userRole,  getAgencyBookings);

module.exports = bookingRouter;
