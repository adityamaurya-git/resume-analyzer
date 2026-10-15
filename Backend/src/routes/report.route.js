const express = require('express');
const router = express.Router();


// ----------------------------
// CONTROLLER:-
// ----------------------------
// const { generateReport, getReportById, getAllReport } = require('../controllers/report.controller');

// ----------------------------
// MIDDLEWARES:-
// ----------------------------
const {authUser} = require('../middlewares/auth.middleware');
const upload = require('../middlewares/file.middleware');


router.get('/test', (req, res) => {
    res.status(200).json({ message: 'Report router loaded' });
});


// /**
//  * @route POST /api/v1/report
//  * @description generate new interview report on the basis of user self description , resume pdf & job description
//  * @access private
//  */

// router.post('/', authUser, upload.single('resume'), generateReport);


// /**
//  * @route GET /api/v1/report/:reportId
//  * @description get interview report by id
//  * @access private
//  */

// router.get('/:reportId', authUser, getReportById)



// /**
//  * @route GET /api/v1/report/
//  * @description get all the interview reports
//  * @access private
//  */

// router.get('/', authUser, getAllReport)

module.exports = router;