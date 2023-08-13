const { DataTypes } = require('sequelize');
const { db } = require('../database/config');

const Transfer = db.define('transfers', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  amount: {
    type: DataTypes.INTEGER,
    defaultValue: 1000,
  },
  senderUserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  reciverUserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Transfer;
