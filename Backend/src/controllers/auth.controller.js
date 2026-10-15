const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const blacklistTokenModel = require('../models/blacklist.model');


/**
 * @name registerUser
 * @description register a new user, expects username , email and password in req
 * @access public
 */

const registerUser = async (req, res) =>{

    const { username , email , password } = req.body;

    if(!username || !email || !password){
        return res.status(400).json({
            message:"Invalid Credentials."
        })
    }

    try{

        // Check whether the user already exists or not.

        const isUserAlreadyExists = await userModel.findOne({
            $or:[
                {username:username.trim()},
                {email:email.trim().toLowerCase()}
            ]
        })

        if(isUserAlreadyExists){
            return res.status(409).json({
                message:"User Already Exists."
            })
        }

        // Hashing the password.

        const hashedPassword = await bcrypt.hash(password,10);


        // Create the user.

        const user = await userModel.create({
            username,
            email,
            password:hashedPassword
        })

        // Create a Token.

        const token = jwt.sign({
            id:user._id,
            email
        },process.env.JWT_SECRET_KEY,{
            expiresIn:'1d'
        })


        // Set the token in cookies.

        res.cookie("token" , token);


        // Return the response.

        res.status(201).json({
            message:"User Created Successfully.",
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


/**
 * @name loginUser
 * @description login a user, expects username or email and password in req
 * @access public
 */

const loginUser = async (req, res) =>{

    const { email , password } = req.body;

    if(!email || !password){
        return res.status(400).json({
            message:"Invalid Credentials"
        })
    }

    try{

        // Ckecking Whether User exists or not.

        const user = await userModel.findOne({
            email:email.trim().toLowerCase()
        })

        if(!user){
            return res.status(409).json({
                message:"Invalid Credentials"
            })
        }

        // Checking whether password is valid or not.

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid){
            return res.status(409).json({
                message:"Invalid Credentials"
            })
        }

        // Create a new Token.

        const token = jwt.sign({
            id:user._id,
            email:user.email
        },process.env.JWT_SECRET_KEY,{
            expiresIn:'1d'
        });


        res.cookie("token" , token);

        res.status(200).json({
            message:"User logged In Successfully",
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


/**
 * @name logoutUser
 * @description logout a user , removes the token
 * @access private
 */

const logoutUser = async (req, res) =>{

    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message:"Unauthorized"
        })
    }

    try{

        await blacklistTokenModel.create({
            token
        });

        res.clearCookie("token");

        res.status(200).json({
            message:"User logged out Successfully"
        })

    }catch(err){
        console.log(err);
    }
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser
}