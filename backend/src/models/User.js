import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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
		},
	},
	// adds 'createdAt' and 'updatedAt' timestamp props to User object
	{timestamps: true}
);

// hash password with bcrypt before saving User to DB
userSchema.pre("save", async function(next) {
  // only hash password if it has been modified (i.e., not from a pre-save hook)
	if(!this.isModified("password")) return next();

	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);

	next();
})

// compare password function with bcrypt
userSchema.methods.comparePassword = async function(userPassword) {
  return await bcrypt.compare(userPassword, this.password);
}

const User = mongoose.model("User", userSchema);

export default User;