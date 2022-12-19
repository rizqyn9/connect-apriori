import { imageKitController } from "@/controller/imagekit.controller"
import { ProductModel } from "@/models/product"
import { PromoModel } from "@/models/promo"
import { Router } from "express"

const router = Router()

router.post("/", async (req, res, next) => {
  try {
    const { price, image, packetName } = req.body

    const menu = await ProductModel.find({
      menu: { $in: req.body.menu },
    })

    const imagekit = await imageKitController.upload(image, Date.now().toString())

    const newPacket = await PromoModel.create({
      price,
      imageUrl: imagekit.url,
      productsList: menu.map((x) => x._id),
      menu: packetName,
    })

    res.json({
      menu,
      newPacket,
    })
  } catch (error) {
    next(error)
  }
})

router.get("/", async (req, res, next) => {
  try {
    const productPromo = await PromoModel.find({}).populate("productsList")
    res.json({
      products: productPromo,
    })
  } catch (error) {
    next(error)
  }
})

export default router
