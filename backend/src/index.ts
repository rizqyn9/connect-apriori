import "express-async-errors"
import { config } from "@/constant/config"
import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import { mongoConnect } from "@/lib/mongo"
import routes from "@/routes"
import { errorHandler } from "./utils/error-handler"

const app = express()

app.use(cors())
app.use(bodyParser.json({ limit: "50mb" }))

app.use(routes)

app.use(errorHandler())

const server = () => app.listen(config.PORT, () => console.log(`Server listening on http://localhost:${config.PORT}`))

mongoConnect().then(server).catch(console.log)
