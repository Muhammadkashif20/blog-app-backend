	import express from "express";
import cloudinary from "../config/cloudinary.js";

const router = express.Router();

router.post("/upload-image", async (req, res) => {
  try {
    const { image } = req.body; 

    const uploadRes = await cloudinary.uploader.upload(image, {
      folder: "blog-app",
    });

    res.json({
      url: uploadRes.secure_url,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Upload failed" });
  }
});

export default router;