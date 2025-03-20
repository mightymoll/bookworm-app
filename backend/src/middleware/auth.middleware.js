import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protectRoute = async(req,res,next)=>{
	try{
		// get token from headers and delete "Bearer" text
		const token = req.header("Authorization").replace("Bearer ", "");

    // check if token exists
    if(!token){
      return res.status(401).json({message: "No token, authorization denied"});
    }

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // if token is valid, attach user to request (not inlcuding password)
    const user = await User.findById(decoded.userId).select("-password");

		// if user does not exist, send error message
		if(!user) return res.status(401).json({message: "Token is not valid"})
  
		// attach user to request and continue to the next middleware or route
		req.User = user;
		next();
	}
	catch{

	}
}

export default protectRoute;