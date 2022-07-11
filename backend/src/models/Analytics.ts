import { Schema, model } from "mongoose"

export type AnalyticsProps = {
  label: string
  products: unknown[]
  transactions: unknown[]
  profit: number
}

const AnalyticsModel = new Schema<AnalyticsProps>({
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

export default model("Analytics", AnalyticsModel)
