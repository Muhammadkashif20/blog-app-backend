import express from "express";
const router = express.Router();
import Blog from "../models/Blogs.js";
import cors from "cors";
router.use(cors());
// Get Blogs
router.get("/getBlogs", async (req, res) => {
  const { Blogs } = req.query;
  try {
    let getBlogs = await Blog.find();
    res.status(200).json(getBlogs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Blogs" });
  }
});

// get Single Blog
router.get("/getSingleBlog/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const getSingleBlog = await Blog.findById(id);
    res.status(200).json(getSingleBlog);
    console.log("getSingleBlog=>", getSingleBlog);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Get Single Blog" });
  }
});

// Add Blogs
router.post("/addBlog", async (req, res) => {
  const { title, description, image } = req.body;
  try {
    let newBlog = new Blog({ ...req.body });
    const savedBlog = await newBlog.save();
    console.log("savedBlog", savedBlog);
    console.log("req.body", req.body);
    res
      .status(200)
      .json({ message: "Blog added successfully", blog: savedBlog });
  } catch (error) {
    res.status(500).json({ error: "Failed to add Blog" });
  }
});

// Update Blogs
router.put("/updateBlog/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, image } = req.body;
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true },
    );
    console.log("updatedBlog", updatedBlog);
    res
      .status(200)
      .json({ message: "Blog updated successfully", blog: updatedBlog });
  } catch (error) {
    res.status(500).json({ error: "Failed to update Blog" });
  }
});

// Delete Blogs
router.delete("/deleteBlog/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBlog = await Blog.findByIdAndDelete(id);
    console.log("deletedBlog=>", deletedBlog);
    res
      .status(200)
      .json({ message: "Blog deleted successfully", blog: deletedBlog });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete Blog" });
  }
});

export default router;
