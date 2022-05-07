import mongoose from "mongoose"

const PromosSchema = new mongoose.Schema({
  products: Schema.Types.Mixed,
  price: Schema.Types.Number,
  orderTotal: Schema.Types.Number,
})

export default mongoose.model("Promos", PromosSchema)
