const ProductModel = require("../models/Product.model")
const responses = require("../utils/responses")

const app = require("express").Router()

app.get("/products", async (req, res) => {
  ProductModel.find().then((val, err) => {
    if (err) responses.fail(res, "Something Error")
    else responses.success(res, val)
  })
})

module.exports = app
