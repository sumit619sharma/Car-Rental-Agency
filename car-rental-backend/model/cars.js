const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const Car = sequelize.define('car', {
id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
         },
vehicleModel:{
        type: Sequelize.STRING,
        required: true },
vehicleNumber:{
        type: Sequelize.STRING,
       required: true  },
seatingCapacity: {type: Sequelize.INTEGER,
      required: true},
rentPerDay: {
        type: Sequelize.INTEGER,
      required: true} ,
availability: {type: Sequelize.BOOLEAN,
            defaultValue: true },
  });

  module.exports  = Car;