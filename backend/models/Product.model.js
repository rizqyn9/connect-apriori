import mongoose from "mongoose"

const ProductSchema = new mongoose.Schema({
  menu: {
    unique: true,
    type: String,
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
