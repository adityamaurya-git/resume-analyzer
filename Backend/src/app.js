const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const cors = require('cors');

// -----------------------
// REQUIRING ROUTES:-
// -----------------------
const authRoutes = require('./routes/auth.route');
const userRoutes = require('./routes/user.route');
const reportRoutes = require('./routes/report.route');



// -----------------------
// MIDDLEWARES:-
// -----------------------

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))



// -----------------------
// ROUTES:-
// -----------------------

app.use('/api/v1/auth' , authRoutes);
app.use('/api/v1/user' , userRoutes);
app.use('/api/v1/report', reportRoutes);


app.get('/', (req, res) =>{
    res.send("resume is running");
})

module.exports = app;