const userModel = require('../models/user.model');


/**
 * @name getUser
 * @description get/fetch the details of current user
 * @access Private
 */

const getUser = async (req, res) =>{

    try{
        
        const user = await userModel.findById( req.user.id );

        res.status(200).json({
            message:"user fetched successfully.",
            user:{
                id:user._id,
                username:user.username,
                email:user.email
            }
        })

    }catch(err){
        console.log(err);
    }
}

module.exports = {
    getUser
}