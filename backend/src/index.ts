import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import cookieParser from "cookie-parser"

import { MongoConnect } from "./lib/mongo"
import { config } from "@/lib/config"
import Routes from "./routes"

const app = express()

app.use(cors())
app.use(express.static("public"))

app.use(cookieParser())
// application/json
app.use(bodyParser.json({ limit: "50mb" }))

app.use((req, res, next) => {
  next()
})

// app.use(cors({ credentials: true, origin: "http://localhost:3000" }), Routes)
app.use(Routes)

app.use("*", (req, res) => {
  res.send("Routes not found")
})

MongoConnect()
  .then(() => {
    app.listen(config.port, () => {
      console.log(`Server listening on http://localhost:${config.port}`)
    })
  })
  .catch((e) => {
    console.log(e)
  })
