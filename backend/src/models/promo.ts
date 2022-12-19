import { Schema, model, Types } from "mongoose"

export type PromoProps = {
  productsList: Types.ObjectId[]
  imageUrl: string
  price: number
  menu: string
}

const PromoSchema = new Schema<PromoProps>(
  {
    productsList: [
      {
        type: Types.ObjectId,
        ref: "product",
      },
    ],
    imageUrl: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    menu: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const PromoModel = model("promo", PromoSchema)

export { PromoModel }
