const app = require("express").Router()
const mongoose = require("mongoose")
const Product = require("../models/Product.model")
const responses = require("../utils/responses")
const path = require("path")
const multer = require("multer")

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "/public"))
  },
  filename: function (req, file, cb) {
    cb(null, req.body.menu + Date.now() + path.extname(file.originalname))
  },
})
var upload = multer({ storage: storage })

/**
 * Mengambil semua data produk yang ada pada database
 */
app.get("/", (req, res) => {
  try {
    return Product.find().then((data) => {
      return responses.success(res, { products: data })
    })
  } catch (error) {
    return responses.fail(res, {}, error)
  }
})

app.post("/test", upload.single("image"), (req, res) => {
  console.log(req.body)

  return responses.success(res)
})

/**
 * Menambah produk ke dalama database
 */
app.post("/", (req, res) => {
  try {
    const valid_keys = ["menu"]

    for (const key of valid_keys) {
      if (!req.body[key])
        return responses.fail(res, (message = `${key} is required`))
    }

    return Product.create({ ...req.body }).then((err, val) => {
      if (val) return responses.success(res, "created success")
      else return responses.fail(res, "Failed to post")
    })
  } catch (error) {
    console.log(error)
    return responses.error(res, "Server error")
  }
})

/**
 * Mengupdate data produk, dari parameter yang berikan
 */
app.post("/:id", (req, res) => {
  const { id } = req.params
  try {
    // Is valid Object ID
    if (!mongoose.isValidObjectId(id))
      return responses.fail(res, "Object ID not valid")

    Product.findByIdAndUpdate(String(id)).then((data) => {
      return responses.success(res, data)
    })
  } catch (error) {
    return responses.error(res, "Server error")
  }
})

/**
 * Ambil data dari salah satu product
 */
app.get("/:id", async (req, res) => {
  const { id } = req.params
  try {
    return Product.findById(id).then((data) => {
      if (data) return responses.success(res, data)
      else return responses.fail(res, "Product not found")
    })
  } catch (error) {
    return responses.error(res, "Server error")
  }
})

module.exports = app
