import express from "express";
import cloudinary from "../lib/cloudinary.js";

import Book from "../models/Book.js"

const router = express.Router();

// create a new book
router.post("/", async(req,res)=>{
	try{
		const {title, caption, rating, image} = req.body;

		// check that all information has been entered
		if(!title || !caption || !rating || !image) {
			return res.status(400).json({message: "Please provide all fields"});
		}

		// upload the image to cloudinary
		const uploadResponse = await cloudinary.uploader.upload(image);
		const imageUrl = uploadResponse.secure_url;

		const newBook = new Book({
			title,
			caption,
      rating,
      image: imageUrl,
      // user: req.user.id,
		})

		// save to mongoDB
		await newBook.save();

    res.status(201).json(newBook);
	}
	catch(error){
		console.log("error creating Book")
		res.status(500).json({message: error.message})
  }
})

export default router;