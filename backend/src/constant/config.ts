import dotenv from "dotenv"

dotenv.config()
const config = {
  MONGO_URI: String(process.env.MONGO_URI),
  PORT: Number(process.env.PORT),
  IMAGEKIT_PRIVATE: String(process.env.IMAGEKIT_PRIVATE),
  IMAGEKIT_PUBLIC: String(process.env.IMAGEKIT_PUBLIC),
  IMAGEKIT_ENDPOINT: String(process.env.IMAGEKIT_ENDPOINT),
}

console.log({ config })

export { config }
