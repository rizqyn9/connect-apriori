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

    console.log({
      menu,
    })

    const imagekit = image ? await imageKitController.upload(image, Date.now().toString()) : null

    const newPacket = await PromoModel.create({
      price,
      imageUrl: imagekit?.url || null,
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
