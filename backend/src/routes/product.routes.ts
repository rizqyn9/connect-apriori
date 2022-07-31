import { Router } from "express"
import path from "path"
import multer from "multer"
import * as ProductControl from "@/controller/product.controller"
import Product from "@/models/Product"
import { mongoObject } from "@/types/misc.schema"

const app = Router()

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(process.cwd() + "/public"))
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  },
})
var upload = multer({ storage: storage })

/* ---------------------------- Get all products ---------------------------- */
app.get("/", async (req, res, next) => {
  try {
    await ProductControl.getAllProduts().then((payload) => res.json({ payload }))
  } catch (error) {
    next(error)
  }
})

/* ---------------------------- Added new product --------------------------- */
app.post("/", upload.single("image"), async (req, res, next) => {
  try {
    if (!req.file) throw new Error("Image is required")

    // Check product is exist
    if (await Product.exists({ menu: req.body.menu })) throw new Error(`Menu ${req.body.menu} exist`)

    await ProductControl.create({
      ...req.body,
      imageURL: req.file.filename,
    }).then((payload) => res.json({ payload }))
  } catch (error) {
    next(error)
  }
})

/* ------------------------ Update data product by id ----------------------- */
app.post("/:id", async (req, res, next) => {
  try {
    const id = mongoObject.parse(req.params.id)

    await ProductControl.update(id, req.body).then((payload) => res.json({ payload }))
  } catch (error) {
    next(error)
  }
})

/* --------------------------- Get a product by id -------------------------- */
app.get("/:id", async (req, res, next) => {
  try {
    const id = mongoObject.parse(req.params.id)

    await ProductControl.getProductByID(id).then((payload) => res.json({ payload }))
  } catch (error) {
    next(error)
  }
})

/* -------------------------- Delete Product By ID -------------------------- */
app.delete("/:id", async (req, res, next) => {
  try {
    const id = mongoObject.parse(req.params.id)

    await ProductControl.remove(id).then((payload) => res.json({ msg: "Success delete", payload }))
  } catch (error) {
    next(error)
  }
})

export default app
