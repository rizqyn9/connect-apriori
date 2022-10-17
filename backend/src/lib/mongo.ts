import mongoose from "mongoose"
import { config } from "@/constant/config"

const mongoConnect = async () => await mongoose.connect(config.MONGO_URI).then(() => console.log("Connected to MongoDB"))

mongoose.connection.on("error", () => console.log("MongoDB connection error"))
mongoose.connection.on("disconnect", () => console.log("Disconnected from MongoDB"))

export { mongoConnect }
