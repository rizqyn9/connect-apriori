import { Router } from "express"
import { productController } from "@/controller"

const app = Router()

/* ---------------------------- Get all products ---------------------------- */
app.get("/", async (_, res, next) => {
  try {
    const payload = await productController.getAllProduts()
    res.json({ payload })
  } catch (error) {
    next(error)
  }
})

/* ---------------------------- Added new product --------------------------- */
app.post("/", async (req, res, next) => {
  try {
    const payload = await productController.create(req.body)
    res.json({ payload })
  } catch (error) {
    next(error)
  }
})

/* ------------------------ Update data product by id ----------------------- */
app.post("/:id", async (req, res, next) => {
  try {
    const { id } = req.params
    const payload = await productController.update(id, req.body)
    res.json({ payload })
  } catch (error) {
    next(error)
  }
})

/* --------------------------- Get a product by id -------------------------- */
app.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params
    const payload = await productController.getProductByID(id)
    res.json({ payload })
  } catch (error) {
    next(error)
  }
})

/* -------------------------- Delete Product By ID -------------------------- */
app.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params

    const payload = await productController.remove(id)
    res.json({ payload })
  } catch (error) {
    next(error)
  }
})

export default app
