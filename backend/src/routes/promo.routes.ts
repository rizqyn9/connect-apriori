import { Router } from "express"
import * as promoController from "../controller/promo.controller.js"
// import * as productController from "../controller/product.controller.js"
import { isValidKeyRequest, isValidObjectId } from "../utils/index.js"

const app = Router()

// Get all promos
app.get("/", async (req, res) => {
  // try {
  //   await promoController.getAll().then((val) => responses.success(res, val))
  // } catch (error) {
  //   if (error instanceof Error) responses.fail(res, error.stack, error.message)
  //   else responses.error(res, "Server error")
  // }
})

// Get promo by id
app.get("/:id", async (req, res) => {
  // try {
  //   isValidObjectId(req.params.id)
  //   await promoController
  //     .getById(req.params.id)
  //     .then((val) => responses.success(res, val))
  // } catch (error) {
  //   if (error instanceof Error) responses.fail(res, error.stack, error.message)
  //   else responses.error(res, "Server error")
  // }
})

// Create promo
app.post("/", async (req, res) => {
  // try {
  //   isValidKeyRequest(["products", "discount"], req)
  //   const { products, discount } = req.body
  //   const promoResult = await promoController
  //     .create(products, discount)
  //     .then((val) => val)
  //   responses.success(res, promoResult)
  // } catch (error) {
  //   if (error instanceof Error) responses.fail(res, {}, error.message)
  //   else responses.error(res, "Server error")
  // }
})

// Update promo
app.post("/:id", async (req, res) => {
  // try {
  //   isValidObjectId(req.params.id)
  //   await promoController
  //     .update(req.params.id, { ...req.body })
  //     .then((val) => responses.success(res, val, "Success update promo"))
  // } catch (error) {
  //   if (error instanceof Error) responses.fail(res, {}, error.message)
  //   else responses.error(res, "Server error")
  // }
})

// Remove promo
app.delete("/:id", async (req, res) => {
  // try {
  //   isValidObjectId(req.params.id)
  //   await promoController
  //     .remove(req.params.id)
  //     .then((val) => responses.success(res, val, "Success to delete promo"))
  // } catch (error) {
  //   if (error instanceof Error) responses.fail(res, {}, error.message)
  //   else responses.error(res, "Server error")
  // }
})

export default app
