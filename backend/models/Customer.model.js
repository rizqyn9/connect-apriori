import mongoose from "mongoose"

const CustomerModel = new mongoose.Schema({
  name: {
    type: String,
  },
  id_customer: {
    type: String,
    unique: true,
  },
  transactions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transactions",
    },
  ],
})

export default mongoose.model("Customers", CustomerModel)
