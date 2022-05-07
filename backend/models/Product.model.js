import mongoose from "mongoose"

const ProductSchema = new mongoose.Schema({
  menu: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  },
  totalOrdered: {
    type: Number,
  },
})

export default mongoose.model("Products", ProductSchema)
