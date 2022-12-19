import { Schema, model } from "mongoose"

export type AnalyticsProps = {
  label: string
  products: unknown[]
  transactions: unknown[]
  profit: number
}

const AnalyticsModel = new Schema<AnalyticsProps>({
  label: String,
  products: Array,
  transactions: Array,
  profit: Number,
})

export default model("Analytics", AnalyticsModel)
