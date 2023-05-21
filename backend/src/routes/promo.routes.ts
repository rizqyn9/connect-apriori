import { imageKitController } from "@/controller/imagekit.controller"
import { ProductModel } from "@/models/product"
import { PromoModel } from "@/models/promo"
import { Router } from "express"

const router = Router()

function resetPromo() {
  return PromoModel.deleteMany({})
}

router.post("/", async (req, res) => {
  const { price, image, packetName } = req.body

  const menu = await ProductModel.find({ menu: { $in: req.body.menu } })
  const imagekit = image ? await imageKitController.upload(image, Date.now().toString()) : null

  await resetPromo()

  const newPacket = await PromoModel.create({
    price,
    imageUrl: imagekit?.url || null,
    productsList: menu.map((x) => x._id),
    menu: packetName,
  })

  res.json({ menu, newPacket })
})

router.get("/", async (req, res) => {
  const products = await PromoModel.find({}).populate("productsList")
  res.json({ products })
})

export default router
