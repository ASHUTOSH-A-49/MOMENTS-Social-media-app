import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from '../models/user.js'



export const signin = async(req, res)=>{
    //get the data from req.body 
    const {email,password} = req.body
    const secret = process.env.JWT_SECRET_TOKEN

    try {
        const existingUser = await User.findOne({email});

        if(!existingUser) return res.status(404).json({message:"User not found!"})

        const isPasswordCorrect = await bcrypt.compare(password,existingUser.password)
        if(!isPasswordCorrect) return res.status(400).json({message:"Incorrect Password"})

        // if correct email and correct pasword then we would like to generate token for user for signin 

        //jwt.sign(payload: string | Buffer | object, secretOrPrivateKey: jwt.Secret | jwt.PrivateKey, options?: jwt.SignOptions): string

        const token = jwt.sign({email:existingUser.email,id:existingUser._id},secret,{expiresIn:"1h"})


        // return it 
        res.status(200).json({result:existingUser,token})
        //we sent it in result object as in google oauth also we were fetching it from result object 
    } catch (error) {
        res.status(500).json({message:'something went wrong signing in '})
    }
}


export const signup = async(req,res)=>{
    const {firstName,lastName,email,password,confirmPassword} = req.body;
    const secret = process.env.JWT_SECRET_TOKEN
    try {
        const existingUser = await User.findOne({email});
        //do not create account if user already exists
        if(existingUser) return res.status(400).json({message:"User already exists!"})

        if(password!==confirmPassword) return res.status(400).json({message:"passwords doesn't match "})

        //if user is unique and passwords match then 

        //hash the password
        //bcrypt.hash(password: string, salt: number | string):
        const hashedPassword = await bcrypt.hash(password,12)


        // create the user object 
        const result = await User.create({email,password: hashedPassword,name:`${firstName} ${lastName}`})

        // now create token 
        const token = jwt.sign({email:result.email,id:result._id},secret,{expiresIn:"1h"})


         // return it 
        res.status(200).json({result,token})

    } catch (error) {
        res.status(500).json({message:'something went wrong signing up '})
    }
}