import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		caption:{
			type: String,
      required: true,
		},
		image:{
			type: String,
      required: true,
		},
		rating:{
			type: Number,
      min: 1,
      max: 5,
      required: true,
		},
		user:{
			// reference User model
			type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
		}
	},
		{ timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);

export default Book;