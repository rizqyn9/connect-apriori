import mongoose from "mongoose"

const PromosSchema = new mongoose.Schema({
  productsList: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Products",
    },
  ],
  discount: mongoose.Schema.Types.Number,
  orderTotal: mongoose.Schema.Types.Number,
})

export default mongoose.model("Promos", PromosSchema)
