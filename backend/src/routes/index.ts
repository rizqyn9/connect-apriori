import { Router } from "express"
import { verifyToken } from "@/middleware/token"

// Routes
import AuthRouter from "./auth.routes"
import ProductRouter from "./product.routes"
import CustomerRouter from "./customer.routes"
import UserRouter from "./user.routes"
import TransactionRouter from "./transaction.routes"
import PromoRouter from "./promo.routes"
import AnalyticsRouter from "./analytics.routes"
import AprioriRouter from "./apriori.routes"
import UserManagement from "./m-user.routes"

const app = Router()

app.use("/auth", AuthRouter)

app.use(verifyToken())

app.use("/user-management", UserManagement)
app.use("/user", UserRouter)
app.use("/transaction", TransactionRouter)
app.use("/products", ProductRouter)
app.use("/customer", CustomerRouter)
app.use("/promo", PromoRouter)
app.use("/analytics", AnalyticsRouter)
app.use("/apriori", AprioriRouter)

export default app
