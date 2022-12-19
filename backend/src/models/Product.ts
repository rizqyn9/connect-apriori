import { Schema, model } from "mongoose"

export type ProductProps = {
  menu: string
  price: number
  imageURL: string
}

const ProductSchema = new Schema<ProductProps>(
  {
    menu: {
      unique: true,
      type: String,
      index: true,
    },
    price: {
      type: Number,
      required: true,
    },
    imageURL: {
      type: String,
    },
  },
  { timestamps: true }
)

export const ProductModel = model("product", ProductSchema)
