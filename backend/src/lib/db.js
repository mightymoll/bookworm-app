import mongoose from "mongoose";

export const connectDB = async()=>{
	try{
		const conn = await mongoose.connect(process.env.MONGO_URI);
		console.log(`Database connected ${conn.connection.host}`);
	}
	catch(error){
    console.error("Error connecting to database", error);
		proces.exit(1); // exit with failure
  }
};
