const { Schema, model } = require("mongoose")

const CustomerModel = new Schema({
  name: {
    type: String,
  },
  id_customer: {
    type: String,
    unique: true,
  },
  transactions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Transactions",
    },
  ],
})

module.exports = model("Customers", CustomerModel)
