import express from "express"
const PORT=4000
const app=express();
import "dotenv/config"
import cors from "cors"
import blogRouter from "./routers/blogs.js"
import mongoose from "mongoose"

mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
	console.log("Mongodb Connected Successfully")
})
.catch((error)=>{
	console.log("failed to Connect Mongodb", error)
})

app.use(cors())
app.use(express.json())
app.use("/api",blogRouter)

app.listen(PORT,()=>{
	console.log("backend is running on port=>",PORT)
})