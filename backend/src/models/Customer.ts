import { Schema, Types, model } from "mongoose"

export type CustomerProps = {
  name: string
  id_customer: string
  transactions: Types.ObjectId[]
}

const CustomerModel = new Schema<CustomerProps>({
  name: {
    type: String,
  },
  id_customer: {
    type: String,
    unique: true,
  },
  transactions: [
    {
      type: Types.ObjectId,
      ref: "Transactions",
    },
  ],
})

export default model("Customers", CustomerModel)
