const { Schema, model } = require("mongoose")

const ProductSchema = new Schema({
  menu: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: Object,
  },
  totalOrdered: {
    type: Number,
  },
})

module.exports = model("Products", ProductSchema)
