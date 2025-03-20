import express from "express";
import "dotenv/config";

import authRoutes from "./routes/authRoutes.js";
import { connectDB } from "./lib/db.js";

const app = express();
const PORT = process.env.PORT;

// define location of routes
app.use("/api/auth", authRoutes)

app.listen(PORT, () =>{
	console.log(`Server is running on port ${PORT}`);
	//connect to mongoDB
	connectDB();
});