const app = require("express").Router();
const mongoose = require("mongoose");
const Product = require("../models/Product.model");
const responses = require("../utils/responses");

/**
 * Mengambil semua data produk yang ada pada database
 */
app.get("/", (req, res) => {
  try {
    return Product.find().then((data) => {
      return responses.success(res, data);
    });
  } catch (error) {
    return responses.fail(res, {}, error);
  }
});

/**
 * Menambah produk ke dalama database
 */
app.post("/", (req, res) => {
  try {
    const valid_keys = ["menu"];

    for (const key of valid_keys) {
      if (!req.body[key])
        return responses.fail(res, (message = `${key} is required`));
    }

    console.log(req.body.image.file);
    Product.create({ ...req.body }).then((data, val) => {
      console.log(val);
    });

    return responses.success(res, "created success");
  } catch (error) {}
});

/**
 * Mengupdate data produk, dari parameter yang berikan
 */
app.post("/:id", (req, res) => {
  const { id } = req.params;
  try {
    // Is valid Object ID
    if (!mongoose.isValidObjectId(id))
      return responses.fail(res, "Object ID not valid");

    Product.findByIdAndUpdate(String(id)).then((data) => {
      return responses.success(res, data);
    });
  } catch (error) {
    return responses.error(res, "Server error");
  }
});

module.exports = app;
