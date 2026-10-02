const express = require('express');
const router = express.Router();

// -----------------------
// REQUIRING CONTROLLERS:-
// -----------------------
const { registerUser, loginUser, logoutUser } = require('../controllers/auth.controller');



// -----------------------
// REQUIRING MIDDLEWARES:-
// -----------------------


/**
 * @route POST /api/v1/auth/user
 * @description Register/create a new user
 * @access public
 */
router.post('/user', registerUser);



/**
 * @route POST /api/v1/auth/user/login
 * @description Login a user
 * @access public
 */
router.post('/user/login' , loginUser);



/**
 * @route POST /api/v1/auth/user/logout
 * @description Logout a user , clear token from user cookie and add token in blacklist
 * @access public
 */
router.post('/user/logout' , logoutUser);

module.exports = router;