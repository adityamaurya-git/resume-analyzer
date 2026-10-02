const jwt = require('jsonwebtoken');
const blacklistTokenModel = require('../models/blacklist.model');

/**
 * @name authUser
 * @description Checks Whether user is loggedIn or not.
 * @access private
 */


const authUser = async (req, res, next) =>{

    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message:"Unauthorized"
        })
    }

    try{

        // Check whether token is blacklisted or not.

        const isTokenBlacklisted = await blacklistTokenModel.findOne({
            token
        })

        if(isTokenBlacklisted){
            return res.status(401).json({
                message:"unauthorized"
            })
        }

        // Verify the token and set the details in req.user

        const decodedToken = jwt.verify(token,process.env.JWT_SECRET_KEY)

        req.user = decodedToken
        next();

    }catch(err){
        console.log(err);
    }
}

module.exports = {
    authUser,
}