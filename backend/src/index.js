import express from "express";
import "dotenv/config";
import cors from "cors";
import job from "./lib/cron.js";

// import Route files
import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";


// import connectDB to connect to MongoDB and start the server
import { connectDB } from "./lib/db.js";

const app = express();
const PORT = process.env.PORT;

// run cron function to keep API active
job.start();

// middleware to parse JSON request bodies
app.use(express.json());

// middleware to use cors (Cross-Origin Resource Sharing) to allow requests from different origins
app.use(cors());

// define location of routes
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);

app.listen(PORT, () =>{
	console.log(`Server is running on port ${PORT}`);
	//connect to mongoDB
	connectDB();
});