const { Schema, model } = require("mongoose")

const AnalyticsModel = new Schema({
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

module.exports = model("Analytics", AnalyticsModel)
