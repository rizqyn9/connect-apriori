import { Router } from "express"
import { userController } from "@/controller"
import { UserModel } from "@/models"
import { z } from "zod"

const app = Router()

app.get("/admin", async (req, res, next) => {
  try {
    await userController.getAllAdmin().then((payload) => {
      res.json({ payload })
    })
  } catch (error) {
    next(error)
  }
})

app.get("/user", async (req, res, next) => {
  await userController.getAllUser().then((payload) => {
    res.json({ payload })
  })
})

app.get("/me", async (req, res) => {
  const user = await UserModel.findById(req.user.id)
  if (!user) throw new Error()
  const { _id: id, name, email, isAdmin } = user
  res.json({ id, name, email, role: isAdmin ? "admin" : "casheer" })
})

app.get("/:id", async (req, res) => {
  const { id } = req.params
  UserModel.findById(id).then((payload) => {
    res.json({ payload })
  })
})

app.put("/update", async (req, res) => {
  const { id, ...rest } = z
    .object({
      name: z.string().min(3),
      email: z.string().email(),
      isAdmin: z.boolean(),
      password: z.string(),
    })
    .deepPartial()
    .merge(z.object({ id: z.string() }))
    .parse(req.body)

  const user = await UserModel.findById(id)
  if (!user) throw new Error("Not found")

  Object.assign(user, rest)
  await user.save()

  res.json({ user: user._id })
})

app.delete("/:userId", async (req, res) => {
  const acc = await UserModel.findByIdAndRemove(req.params.userId)
  if (!acc) throw new Error("Not found")
  res.json({
    account: acc,
  })
})

export default app
