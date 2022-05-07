import express from "express"
import path from "path"
import { fileURLToPath } from "url"
import multer from "multer"
import responses from "../utils/responses.js"
import * as ProductControl from "../controller/product.controller.js"
import { isValidObjectId, isValidKeyRequest } from "../utils/index.js"

const app = express.Router()

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(
      null,
      path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "/public")
    )
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  },
})
var upload = multer({ storage: storage })

/**
 * Mengambil semua data produk yang ada pada database
 */
app.get("/", async (req, res) => {
  try {
    await ProductControl.getProduts().then((val) => responses.success(res, val))
  } catch (error) {
    if (error instanceof Error) responses.fail(res, {}, error.message)
    else responses.error(res, "Server error")
  }
})

/**
 * Menambah produk ke dalam database
 */
app.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return responses.fail(res, (message = "Image is required"))
    isValidKeyRequest(["menu", "price"], req)

    await ProductControl.create({ ...req.body, image: req.file.filename }).then(
      (val) => responses.success(res, val)
    )
  } catch (error) {
    if (error instanceof Error) responses.fail(res, {}, error.message)
    else responses.error(res, "Server error")
  }
})

/**
 * Mengupdate data produk, dari parameter yang berikan
 */
app.post("/:id", async (req, res) => {
  try {
    isValidObjectId(req.params.id)

    await ProductControl.update(req.params.id, req.body).then((val) =>
      responses.success(res, val)
    )
  } catch (error) {
    if (error instanceof Error) responses.fail(res, {}, error.message)
    else responses.error(res, "Server error")
  }
})

/**
 * Ambil data dari salah satu product
 */
app.get("/:id", async (req, res) => {
  try {
    isValidObjectId(req.params.id)
    await ProductControl.getProductByID(req.params.id).then((val) =>
      responses.success(res, { ...val })
    )
  } catch (error) {
    if (error instanceof Error) return responses.fail(res, error, error.message)
    return responses.error(res, "Server error")
  }
})

/**
 * Delete Products
 */
app.delete("/:id", async (req, res) => {
  try {
    isValidObjectId(req.params.id)
    await ProductControl.remove(req.params.id).then((val) =>
      responses.success(res, val)
    )
  } catch (error) {
    if (error instanceof Error) return responses.fail(res, error, error.message)
    return responses.error(res, "Server error")
  }
})

export default app
