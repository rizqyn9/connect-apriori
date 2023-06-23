import { Router } from "express"
import { createProduct, handleProductDetails, handleRemoveProduct, handleUpdate, productController } from "@/controller"

const app = Router()

/* ---------------------------- Get all products ---------------------------- */
app.get("/", async (_, res) => {
  res.json({ payload: await productController.getAllProduts() })
})

/* ---------------------------- Added new product --------------------------- */
app.post("/", createProduct)

/* ------------------------ Update data product by id ----------------------- */
app.post("/:id", handleUpdate)

/* --------------------------- Get a product by id -------------------------- */
app.get("/:id", handleProductDetails)

/* -------------------------- Delete Product By ID -------------------------- */
app.delete("/:id", handleRemoveProduct)

export default app
