const express = require('express');
const router = express.Router();


// ----------------------------
// CONTROLLERS:-
// ----------------------------
const { getUser } = require('../controllers/user.controller');


// ----------------------------
// MIDDLEWARES:-
// ----------------------------
const { authUser } = require('../middlewares/auth.middleware');




/**
 * @route GET /api/v1/user
 * @description fetch the details of the user if logged in
 * @access private
 */
router.get('/', authUser , getUser);


module.exports = router;