import express from "express";
import User from "../models/User.js"
import jwt from "jsonwebtoken"

const router = express.Router();

// use jsonwebtoken to create a user token valid for 15 days
const generateToken = (userId)=>{
	return jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: "15d" })
}
// create a new User (register) 
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

		const token = generateToken(user.id);

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
	// if user couldn't be created, throw an error
	catch(error){
		console.log("Error in Register route : ", error)
    res.status(500).json({message: "Internal server error" })
  }
})


// login an existing User (authentication)
router.post("/login", async (req, res) =>{
	try{
		const {email, password} = req.body
		
		// check that email and password have been entered
		if(!email || !password)return res.status(400).json({message: "All fields required"});

		//check that a User with this email exists
		const user = await User.findOne({email});
		if(!user) return res.status(400).json({message: "User does not exist"});

		// use comparePassword function from User model to see if password is correct
		const isPasswordCorrect = await user.comparePassword(password);
		// if wrong password, send message 'invalid credentials'
		if(!isPasswordCorrect) return res.status(400).json({message: "Invalid credentials"});
	

	// generate token
	const token = generateToken(user._id);

  // respond with token and user information when user is successfully logged in
  res.status(200).json({
    token,
    user:{
      id: user._id,
      username: user.username,
      email: user.email,
      profileImage: user.profileImage,
    }
  })
  }
  // if user couldn't be logged in, throw an error
	catch(error){
		console.log("Error in Login route : ", error)
    res.status(500).json({message: "Internal server error" })
	}
})

export default router;