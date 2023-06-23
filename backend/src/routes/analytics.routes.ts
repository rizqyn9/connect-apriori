import { Router } from "express"
import { Transaction } from "@/models"

const app = Router()

app.get("/", async (req, res) => {
  const transactions = await Transaction.find({})

  return res.json({ payload: { transactions } })
})

export default app
