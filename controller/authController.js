import User from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'




dotenv.config()


//Create a new user
export const signup = async (req, res) => {
    try{
        const { username, fullname, email, password } = req.body
        //check if required details are entered by users
        if (!username || !fullname || !email || !password){
            res.status(400).json({
                success: false,
                message: 'Required field needed'
            })
        }

        //Check if user exist
        const userExist = await User.findOne({ email }).exec()
        if (userExist){
            return res.status(400).json({
                success : false,
                message : 'User already exist'
            });
        }
         //Encrypt user password
        const salt = await bcrypt.genSalt(13);
        const encryptedPassword = await bcrypt.hash(password, salt)

        //Create user account
        const newUser = await User.create({
            username,
            fullname,
            email,
            password: encryptedPassword
        });
        // const userToken = jwt.sign({id : newUser._id}, process.env.JWT_SECRET,{expiresIn: process.env.JWT_EXPIRES_IN});
        // const token = tokenVerify(User._id)

        return res.status(201).json({
            success : true,
            message : 'User account created successfully',
            token,
            user : newUser
        })
    }catch{
        res.status(500).json({ error: "An internal error occur" });
    }
}

//Login user
export const login = async(req, res, next)=>{
    try {
        const { email, password } = req.body;

        // Check if user entered the required details
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Username & password are required'
            });
        }

        // Check if user exists
        const userExist = await User.findOne({ email });
        if (!userExist) {
            return res.status(400).json({
                success: false,
                message: 'User does not exist'
            });
        }

        // Check hashed password with user input
        const isMatch = await bcrypt.compare(password, userExist.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: 'Invalid Password'
            });
        }

        // Create access token
        const accessToken = jwt.sign(
            { access1: userExist?._id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION }
        );

        // Create refresh token
        const refreshToken = jwt.sign(
            { access2: userExist?._id },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: process.env.REFRESH_TOKEN_EXPIRATION }
        );

        // Set cookies
        res.cookie('access', accessToken, {
            httpOnly: true,
            // secure: true, // Uncomment this if you are using HTTPS
            sameSite: 'none',
            maxAge: 30 * 1000, // 30 seconds
        });

        res.cookie('refresh', refreshToken, {
            httpOnly: true,
            // secure: true, // Uncomment this if you are using HTTPS
            sameSite: 'none',
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        });

        // If login is successful
        return res.status(200).json({
            success: true,
            message: 'Login was successful'
        });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            success: false,
            message: "An internal error occurred"
        });
    }
};



// export const validateToken = (req, res) => {
//     const auth_user = req.user;
//     console.log("this is the autherntcated user", auth_user);
//     const user = {
//         _id: auth_user._id,
//         username: auth_user.username,
//         fullname:auth_user.fullname,
//         email: auth_user.email,
//     };
//     res.status(200).json({
//         success: true,
//         message: "Authorized",
//         userDetail: user,
//     });
//   };