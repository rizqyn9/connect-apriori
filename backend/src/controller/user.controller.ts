import { UserModel } from "@/models"
import { userProps, UserProps } from "@/types"

const findByEmail = async (email: string) => (await UserModel.findOne({ email })) ?? Promise.reject("User not found")
const findById = async (id: string) => (await UserModel.findById(id)) ?? Promise.reject("User not found")

const create = async (data: Record<string, string>) => {
  const user = userProps.omit({ isAdmin: true }).parse(data)
  const exist = await findByEmail(user.email).catch((err) => !err)
  if (exist) throw new Error("User already registered")
  return await UserModel.create({ ...user, isAdmin: false })
}

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
  create,
  filter,
  updateRole,
  db: UserModel,
}
