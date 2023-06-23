import mongoose from "mongoose"
import { config } from "@/constant/config"
import cache from "ts-cache-mongoose"

cache.init(mongoose, {
  engine: "memory",
  defaultTTL: "5m",
})
async function mongoConnect() {
  await mongoose.connect(config.MONGO_URI)
  console.log("Connected to MongoDB")
}

export { mongoConnect }
