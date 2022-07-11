import dotenv from "dotenv"

dotenv.config()

const config = {
  port: process.env.PORT || 4000,
  feServer: process.env.FE_SERVER || "http://localhost:3000",
  mongo: process.env.MONGO || "mongolocal",
  secretToken: process.env.SECRET_TOKEN || "supersecret",
}

export { config }
