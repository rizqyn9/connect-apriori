import { BadRequest, NotFound } from "@/lib/error"
import { User, userValidator } from "@/models"
import { UserProps } from "@/types"
import { Request, Response } from "express"
import jwt from "jsonwebtoken"

const UserModel = User

export async function findByEmail(email: string) {
  const user = await User.findOne({ email })
  if (!user) throw new NotFound()
  return user
}

export async function register(req: Request, res: Response) {
  const { email, password, name } = userValidator.omit({ isAdmin: true }).parse(req.body)
  await findByEmail(email)
    .then((x) => {
      throw new BadRequest("Email already registered")
    })
    .catch(() => {})

  await User.create({ email, password, name }).then(({ name, email, isAdmin }) => {
    res.json({ payload: { email, name, isAdmin } })
  })
}

export async function login(req: Request, res: Response) {
  const { email, password } = userValidator.pick({ email: true, password: true }).parse(req.body)
  const user = await findByEmail(email)
  if (user.password != password) throw new Error("Wrong password")

  const token = jwt.sign({ email: user.email, id: user._id, role: user.isAdmin ? "admin" : "casheer" }, "secret")

  const { name, isAdmin } = user
  res.json({
    token,
    payload: {
      name,
      email,
      isAdmin,
    },
  })
}

const findById = async (id: string) => (await UserModel.findById(id)) ?? Promise.reject("User not found")

const filter = async (isAdmin?: string) => {
  const filter = typeof isAdmin == "undefined" ? {} : { isAdmin }
  return await UserModel.find(filter)
}

const updateRole = async (id: string, admin: boolean) => {
  const user = await findById(id)
  user.isAdmin = admin
  return await user.save()
}

const getAllAdmin = async () => await UserModel.find({ isAdmin: true })

const getAllUser = async () => await UserModel.find({ isAdmin: false })

const createNewUser = async (user: UserProps) => await UserModel.create(user)

const demoteAdmin = async (id: string) => await UserModel.findByIdAndUpdate(id, { isAdmin: false })

const promoteAdmin = async (id: string) => await UserModel.findByIdAndUpdate(id, { isAdmin: true })

export const userController = {
  getAllAdmin,
  getAllUser,
  createNewUser,
  demoteAdmin,
  promoteAdmin,
  findByEmail,
  filter,
  updateRole,
  db: UserModel,
}
