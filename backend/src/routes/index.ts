import { Router } from "express"

// Routes
import AuthRouter from "./auth.routes"
import ProductRouter from "./product.routes"
import CustomerRouter from "./customer.routes"
import PersonRouter from "./person.routes"
import TransactionRouter from "./transaction.routes"
import AdminRouter from "./admin.routes"
import PromoRouter from "./promo.routes"
import AnalyticsRouter from "./analytics.routes"
import AprioriRouter from "./apriori.routes"

// import { VerifyToken } from "../../middleware/token"

const app = Router()

let dataKTP = { id: 123123, isNewUser: true }
app.get("/test", (req, res) => {
  res.json({ payload: { ...dataKTP } })
})

app.use("/auth", AuthRouter)
// app.use(VerifyToken)

app.use("/person", PersonRouter)
app.use("/transaction", TransactionRouter)
app.use("/products", ProductRouter)
app.use("/admin", AdminRouter)
app.use("/customer", CustomerRouter)
app.use("/promo", PromoRouter)
app.use("/analytics", AnalyticsRouter)
app.use("/apriori", AprioriRouter)

export default app
