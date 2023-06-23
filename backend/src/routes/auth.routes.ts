// #1 Import semua module
import { Router } from "express"
import { login, register } from "@/controller"

const app = Router()

/* --------------------------- Handle user signup --------------------------- */
app.post("/signup", register)

/* ------------------------------ User sign in ------------------------------ */
// #2 Definisikan endpoint untuk melakukan autentikasi user menggunakan email dan password
app.post("/signin", login)

export default app
