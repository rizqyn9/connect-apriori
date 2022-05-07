import mongoose from "mongoose"

const AnalyticsModel = new mongoose.Schema({
  label: {
    type: String,
  },
  products: {
    type: Array,
  },
  transactions: {
    type: Array,
  },
  profit: {
    type: Number,
  },
})

export default mongoose.model("Analytics", AnalyticsModel)
