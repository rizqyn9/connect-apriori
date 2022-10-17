import { userController } from "@/controller"
import { Router } from "express"

const router = Router()

router.get("/", async (req, res, next) => {
  try {
    res.json({ payload: await userController.filter(req.query.isAdmin as string) })
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
    res.json({ payload })
  } catch (error) {
    next(error)
  }
})

export default router
