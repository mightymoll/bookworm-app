import express from "express";
import User from "../models/User.js"
import jwt from "jsonwebtoken"

const router = express.Router();

// use jsonwebtoken to create a user token valid for 15 days
const generateToken = (userId)=>{
	jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: "15d" })
}

router.post("/register", async (req, res) =>{
	try{
		const {username,email,password} = req.body;

		// check that username, email, and password exist
		if(!username || !email || !password){
			return res.status(400).json({message: "All fields required"});
		}
		// check password & username is the minimum length
		if(password.length < 8){
			return res.status(400).json({message: "Password should be at least 8 characters long"});
		}
		if(username.length < 3){
			return res.status(400).json({message: "Username should be at least 3 characters long"});
		}

		// check if email or username already exists
		const existingEmail = await User.findOne({email});
		if (existingEmail){
			return res.status(400).json({message: "Email already exists"});
		}
				const existingUsername = await User.findOne({username});
		if (existingUsername){
			return res.status(400).json({message: "Username already exists"});
		}

		// get a random Avatar image from Dicebear API
		const profileImage = `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`;

		const user = new User({
			email,
			username,
			password,
			profileImage,
		})

		await user.save();

		const token = generateToken(user._id);

// respond with token and user information when user is successfully created
		res.status(201).json({
			token,
			user:{
				id: user._id,
				username: user.username,
        email: user.email,
        profileImage: user.profileImage,
			}
		})
	}
	catch(error){
    res.status(500).json({error: error.message})
  }
})

router.post("/login", async (req, res) =>{
	res.send("login")
})

export default router;