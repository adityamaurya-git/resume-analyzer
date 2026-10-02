const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();

// -----------------------
// REQUIRING ROUTES:-
// -----------------------
const authRoutes = require('./routes/auth.route');
const userRoutes = require('./routes/user.route');



// -----------------------
// MIDDLEWARES:-
// -----------------------

app.use(express.json());
app.use(cookieParser());



// -----------------------
// ROUTES:-
// -----------------------

app.use('/api/v1/auth' , authRoutes);
app.use('/api/v1/user' , userRoutes);


module.exports = app;