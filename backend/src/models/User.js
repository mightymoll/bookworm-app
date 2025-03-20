import mongoose from "mongoose";

// define properties of User model
const userSchema = new mongoose.Schema({
	username:{
		type: String,
    required: true,
    unique: true,
	},
	email:{
		type: String,
    required: true,
    unique: true
	},
	password:{
    type: String,
    required: true,
		minlength: 8,
  },
	profileImage:{
		type:String,
		default: ""
	}
});

const User = mongoose.model("User", userSchema);

export default User;