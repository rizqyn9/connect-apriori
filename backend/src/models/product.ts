import { Schema, model } from "mongoose"
import { z } from "zod"

const DB_PRODUCT = "product"

const productSchema = new Schema(
  {
    menu: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    imageURL: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
)

export const productValidator = z.object({
  menu: z.string(),
  price: z.coerce.number(),
  imageURL: z.string(),
})

export const ProductModel = model(DB_PRODUCT, productSchema, DB_PRODUCT)
export const Product = model(DB_PRODUCT, productSchema, DB_PRODUCT)
