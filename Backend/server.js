// require('dotenv').config();
// const app = require('./src/app');
// const connectDB = require('./src/config/database');




// // -----------------------
// // CONNECT TO DATABASE
// // -----------------------
// connectDB();




// // app.listen(3000, () => {
// //     console.log("Server is running on port 3000");
// // }) 

// module.exports = app;



// require('dotenv').config();

// const app = require('./src/app');
// const connectDB = require('./src/config/database');

// // Vercel invokes this exported Express app for incoming requests.
// // Connect before processing requests that need MongoDB.
// app.use(async (req, res, next) => {
//     try {
//         await connectDB();
//         next();
//     } catch (error) {
//         console.error('Database connection failed:', error.message);
//         res.status(503).json({
//             message: 'Database temporarily unavailable'
//         });
//     }
// });

// module.exports = app;


module.exports = (req, res) => {
    res.status(200).json({
        status: 'ok',
        message: 'Vercel function is running',
        path: req.url
    });
};