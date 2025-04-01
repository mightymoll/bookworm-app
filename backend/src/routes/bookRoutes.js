import express from "express";
import cloudinary from "../lib/cloudinary.js";
import protectRoute from "../middleware/auth.middleware.js";

import Book from "../models/Book.js"

const router = express.Router();

// create a new book
router.post("/", protectRoute, async(req,res)=>{
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
      user: req.user._id,
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

// get all Books
router.get("/", protectRoute, async(req,res)=>{
	try{

		// setup pagination based on query info in url
		const page = req.query.page || 1;
		const limit = 5;
		const skip = (page - 1) * limit;

		// get books
    const books = await Book.find()
		.sort({createdAt: -1}) // sort by desc order
    .skip(skip) // skip previous results to limit # of books fetched as defined in 'skip'
		.limit(limit) // only fetch # results defined in 'limit'
		.populate("user", "username profileImage"); // populate 'user' field with User information
		

		const totalBooks = await Book.countDocuments();

		// send books and pagination information to frontend
		res.send({
			books,
			currentPage: page,
			totalBooks,
			totalPages: Math.ceil(totalBooks / limit),
		});
  }
  catch(error){
    console.log("error in get all books route", error)
    res.status(500).json({message: "Internal server error"})
  }
})

// delete a Book
router.delete(":/id", protectRoute, async(req,res)=>{
	try{
		// find book by id and check if it exists
		const book = await Book.findById(req.params.id);
    if(!book) return res.status(404).json({message: "Book not found"});

		// check if user is the creater of this 'Book', if not return 'unauthorized'
		if(book.user.toSTring() !== req.user._id.toString())
			return res.status(401).json({message: "Unauthorized"});

		// delete image from Cloudinary
		if(book.image && book.image.includes("cloudinary")){
			try{
				// get id of image from cloudinary URL (split the string)
				// cloudinary URL example: https://res.cloudinary.com/de1rn4uto/image/upload/v1741568358/gyup61vejflxxw8igvi0.png
				
				// split() @ slashes then pop() to get last one (gyup61vejflxxw8igvi0.png)
				// split @ '.' and get first part [0] for publicId (removes '.png')
				// publicId ex : gyup61vejflxxw8igvi0
				const publicId = book.image.split("/").pop().split(".")[0];
				// delete image from cloudinary using publicId
				await cloudinary.uploader.destroy(publicId);
				console.log("Image deleted from Cloudinary successfully");
			}
			catch (deleteError){
				console.log("Error deleting image from Cloudinary", deleteError)
			}
		}
		// delete book from DB
		await book.deleteOne();

    res.status(200).json({message: "Book deleted successfully"});
	}
	catch(error){
    console.log("Error deleting book", error)
    res.status(500).json({message: "Internal server error"})
  }
})

export default router;