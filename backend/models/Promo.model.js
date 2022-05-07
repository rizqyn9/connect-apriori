const { Schema, model } = require("mongoose")

const PromosSchema = new Schema({
  products: Schema.Types.Mixed,
  price: Schema.Types.Number,
  orderTotal: Schema.Types.Number,
})

module.exports = model("Promos", PromosSchema)
