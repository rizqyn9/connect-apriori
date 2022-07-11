import mongoose from "mongoose"
import { config } from "./config"

const MongoConnect = async () => {
  return await mongoose
    .connect(config.mongo)
    .then(() => {
      console.log("Connected to MongoDB")
    })
    .catch((e) => {
      throw new Error(e)
    })
}

mongoose.connection.on("error", () => {
  console.log("MongoDB connection error")
})

mongoose.connection.on("disconnect", () => {
  console.log("Disconnected from MongoDB")
})

export { MongoConnect }
