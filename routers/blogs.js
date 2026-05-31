import express from "express"
const router = express.Router();
import Blog from "../models/Blogs.js"

// Get Blogs
router.get("/getBlogs",async (req, res) => {
	const { Blogs } = req.query;
	try {
		let getBlogs = await Blog.find()
		res.status(200).json(getBlogs)
	}
	catch (error) {
		res.status(500).json({ error: "Failed to fetch Blogs" });
	}
})

// Add Blogs
router.post("/addBlog",	async (req, res) => {
	const { title, description, image } = req.body;
	try{
		let newBlog=new Blog({ ...req.body })
		await newBlog.save()
		res.status(200).json({ message: "Blog added successfully" });
	}
	catch (error) {
		res.status(500).json({ error: "Failed to add Blog" });
	}
})

router.put("/updateBlog/:id", (req, res) => {
	res.send("updated blog successfully")
})
router.delete("/deleteBlog/:id", (req, res) => {
	res.send("deleted blog successfully")
})

export default router;