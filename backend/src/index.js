import express from "express";
import "dotenv/config";

// import Route files
import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";


// import connectDB to connect to MongoDB and start the server
import { connectDB } from "./lib/db.js";

const app = express();
const PORT = process.env.PORT;

// middleware to parse JSON request bodies
app.use(express.json())

// define location of routes
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);

app.listen(PORT, () =>{
	console.log(`Server is running on port ${PORT}`);
	//connect to mongoDB
	connectDB();
});