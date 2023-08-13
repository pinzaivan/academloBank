const express = require('express');
const morgan = require('morgan');

// rutas
const userRoutes = require('./routes/user.route');
const transferRoutes = require('./routes/transfers.route');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

//rutas
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/transfers', transferRoutes);

module.exports = app;
