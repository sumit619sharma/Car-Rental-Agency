const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const Booking = sequelize.define('booking', {
id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
         },
startDate:{
        type: Sequelize.DATE ,
        required: true },

forDays: {type: Sequelize.INTEGER,
      required: true},
  });

  module.exports  = Booking;