import express from "express";
import { setDefaultResultOrder } from "dns";
setDefaultResultOrder("ipv4first");
const PORT = 4000;
const app = express();
import "dotenv/config";
import cors from "cors";
import blogRouter from "./routers/blogs.js";
import uploadRouter from "./routers/upload.js";
import mongoose from "mongoose";

mongoose
  .connect(process.env.MONGODBURI, { family: 4 })
  .then(() => {
    console.log("Mongodb Connected Successfully");
  })
  .catch((error) => {
    console.log("failed to Connect Mongodb", error);
  });

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use("/api", blogRouter);
app.use("/api", uploadRouter);

app.listen(PORT, () => {
  console.log("backend is running on port=>", PORT);
});
