import { Schema, model } from "mongoose"

export type ProductProps = {
  menu: string
  price: number
  imageURL: string
  totalOrdered: number
}

const ProductSchema = new Schema<ProductProps>({
  menu: {
    unique: true,
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  imageURL: {
    type: String,
  },
  totalOrdered: {
    type: Number,
  },
})

export default model("Products", ProductSchema)
