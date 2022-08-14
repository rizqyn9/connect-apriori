import User from "@/models/User"
import { UserProps } from "../models/User"

const getAllAdmin = async () => await User.find({ isAdmin: true })

const getAllUser = async () => await User.find({ isAdmin: false })

const createNewUser = async (user: UserProps) => await User.create(user)

const demoteAdmin = async (id: string) => await User.findByIdAndUpdate(id, { isAdmin: false })

const promoteAdmin = async (id: string) => await User.findByIdAndUpdate(id, { isAdmin: true })

export { getAllAdmin, getAllUser, createNewUser, demoteAdmin, promoteAdmin }
