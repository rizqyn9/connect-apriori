import { Schema, model, Types } from "mongoose"

export type PromoProps = {
  productsList: Types.ObjectId[]
  discount: number
  orderTotal: number
}

const PromosSchema = new Schema<PromoProps>({
  productsList: [
    {
      type: Types.ObjectId,
      ref: "Products",
    },
  ],
  discount: Number,
  orderTotal: Number,
})

export default model("Promos", PromosSchema)
