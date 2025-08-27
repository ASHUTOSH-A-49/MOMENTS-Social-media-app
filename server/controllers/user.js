import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from '../models/user.js'

export const signin = async(req, res)=>{
    console.log("Server: Hitting the signin controller.");
    //get the data from req.body 
    const {email,password} = req.body
    const secret = process.env.JWT_SECRET_TOKEN

    try {
        console.log("Server: Attempting to find existing user with email:", email);
        const existingUser = await User.findOne({email});

        if(!existingUser) {
            console.log("Server: User not found!");
            return res.status(404).json({message:"User not found!"})
        }
        console.log("Server: User found. Comparing password...");
        const isPasswordCorrect = await bcrypt.compare(password,existingUser.password)
        if(!isPasswordCorrect) {
            console.log("Server: Incorrect password!");
            return res.status(400).json({message:"Incorrect Password"})
        }

        console.log("Server: Password is correct. Generating JWT token...");
        const token = jwt.sign({email:existingUser.email,id:existingUser._id},secret,{expiresIn:"1h"})

        console.log("Server: Signin successful. Sending response.");
        res.status(200).json({result:existingUser,token})
    } catch (error) {
        console.log("Server: Error during signin process:", error.message);
        res.status(500).json({message:'something went wrong signing in '})
    }
}


export const signup = async(req,res)=>{
    console.log("Server: Hitting the signup controller.");
    const {firstName,lastName,email,password,confirmPassword} = req.body;
    const secret = process.env.JWT_SECRET_TOKEN
    try {
        console.log("Server: Attempting to find existing user with email:", email);
        const existingUser = await User.findOne({email});
        //do not create account if user already exists
        if(existingUser) {
            console.log("Server: User already exists!");
            return res.status(400).json({message:"User already exists!"})
        }
        console.log("Server: User does not exist. Checking password confirmation.");
        if(password!==confirmPassword) {
            console.log("Server: Passwords do not match!");
            return res.status(400).json({message:"passwords doesn't match "})
        }

        console.log("Server: Hashing password...");
        const hashedPassword = await bcrypt.hash(password,12)

        console.log("Server: Creating new user object in database.");
        const result = await User.create({email,password: hashedPassword,name:`${firstName} ${lastName}`})

        console.log("Server: Generating new JWT token.");
        const token = jwt.sign({email:result.email,id:result._id},secret,{expiresIn:"1h"})

        console.log("Server: Signup successful. Sending response.");
        res.status(200).json({result,token})

    } catch (error) {
        console.log("Server: Error during signup process:", error.message);
        res.status(500).json({message:'something went wrong signing up '})
    }
}