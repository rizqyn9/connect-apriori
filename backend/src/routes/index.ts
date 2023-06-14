import { Router } from "express"

// Routes
import AuthRouter from "./auth.routes"
import ProductRouter from "./product.routes"
import CustomerRouter from "./customer.routes"
import UserRouter from "./user.routes"
import TransactionRouter from "./transaction.routes"
import AdminRouter from "./admin.routes"
import PromoRouter from "./promo.routes"
import AnalyticsRouter from "./analytics.routes"
import AprioriRouter from "./apriori.routes"
import UserManagement from "./m-user.routes"
import jwt from "jsonwebtoken"

const app = Router()

app.use("/auth", AuthRouter)

app.use((req, res, next) => {
  const { authorization } = req.headers
  if (!authorization || !jwt.verify(authorization, "secret"))
    return res.status(501).json({
      msg: "invalid token",
    })
  else {
    const { id, role } = jwt.decode(authorization) as { id: string; role: "admin" | "casheer" }
    req.user = {
      id,
      isAdmin: true,
      role,
    }
  }
  next()
})

app.use("/user-management", UserManagement)
app.use("/user", UserRouter)
app.use("/transaction", TransactionRouter)
app.use("/products", ProductRouter)
app.use("/admin", AdminRouter)
app.use("/customer", CustomerRouter)
app.use("/promo", PromoRouter)
app.use("/analytics", AnalyticsRouter)
app.use("/apriori", AprioriRouter)

export default app
