import { Schema, Types, model } from "mongoose"

export type CustomerProps = {
  name: string
  cardId?: string
  transactions?: Types.ObjectId[]
}

const CustomerModel = new Schema<CustomerProps>({
  name: String,
  cardId: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  transactions: [
    {
      type: Types.ObjectId,
      ref: "Transactions",
    },
  ],
})

export default model("Customers", CustomerModel)
