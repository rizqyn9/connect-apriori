import { Router } from "express"

// Routes
import AuthRouter from "./auth.routes"
import ProductRouter from "./product.routes"
import CustomerRouter from "./customer.routes"
import UserRouter from "./user.routes"
import TransactionRouter from "./transaction.routes"
import AdminRouter from "./admin.routes"
import PromoRouter from "./promo.routes"

// import { VerifyToken } from "../../middleware/token"

const app = Router()

app.use("/auth", AuthRouter)
// app.use(VerifyToken)

app.use("/user", UserRouter)
app.use("/transaction", TransactionRouter)
app.use("/products", ProductRouter)
app.use("/admin", AdminRouter)
app.use("/customer", CustomerRouter)
app.use("/promo", PromoRouter)

export default app
