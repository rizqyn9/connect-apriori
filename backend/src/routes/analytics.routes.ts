import Product from "@/models/Product"
import { Router } from "express"
import responses from "@/utils/responses"

const app = Router()

app.get("/products", async (req, res) => {
  Product.find().then((val, err) => {
    if (err) responses.fail(res, "Something Error")
    else responses.success(res, val)
  })
})

module.exports = app
