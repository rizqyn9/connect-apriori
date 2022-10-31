import { userController } from "@/controller"
import { Router } from "express"

const router = Router()

router.get("/", async (req, res, next) => {
  try {
    const payload = await userController.db.find({}).select(["-password"])
    res.json({ payload })
  } catch (error) {
    next(error)
  }
})

router.post("/update-role", async (req, res, next) => {
  try {
    const { id, admin } = req.body
    const payload = await userController.updateRole(id, admin)
    // @ts-expect-error
    delete payload.password
    res.json({ msg: "Success" })
  } catch (error) {
    next(error)
  }
})

export default router
