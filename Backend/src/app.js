// const cookieParser = require('cookie-parser');
// const express = require('express');
// const app = express();
// const cors = require('cors');

// // -----------------------
// // REQUIRING ROUTES:-
// // -----------------------
// const authRoutes = require('./routes/auth.route');
// const userRoutes = require('./routes/user.route');
// const reportRoutes = require('./routes/report.route');



// // -----------------------
// // MIDDLEWARES:-
// // -----------------------

// app.use(express.json());
// app.use(cookieParser());

// const allowedOrigins = [
//     'http://localhost:5173',
//     process.env.FRONTEND_URL
// ].filter(Boolean);

// app.use(cors({
//     origin:allowedOrigins,
//     credentials:true
// }))



// // -----------------------
// // ROUTES:-
// // -----------------------

// app.use('/api/v1/auth' , authRoutes);
// app.use('/api/v1/user' , userRoutes);
// app.use('/api/v1/report', reportRoutes);



// // ------------------------
// // HEALTH CHECK:-
// // ------------------------

// app.get('/', (req, res) =>{
//     res.status(200).send("Backend is running");
// })

// module.exports = app;




const express = require('express');
const app = express();

app.use(express.json());

const authRoutes = require('./routes/auth.route');
app.use('/api/v1/auth', authRoutes);

app.get('/', (req, res) => {
    res.status(200).send('App works without routes');
});

module.exports = app;