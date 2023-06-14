import { ROLE } from '@/hooks'
import api from '.'
import { SignUpSchema, SignInSchema } from '../utils/zod.schema'

const signUp = async (payload: SignUpSchema) => {
  const { status, data } = await api.post('/auth/signup', payload)
  if (status === 200) return { success: true, msg: 'Register success' }
  if (status === 400) return { invalid: true, msg: String(data.msg) }
  throw new Error('Server error')
}

const signIn = async (payload: SignInSchema) => {
  const { status, data } = await api.post('/auth/signin', payload)
  if (status == 200)
    return {
      token: data.token!,
      tokenType: 'token',
      expiresIn: 60 * 60 * 24 * 7,
      authState: { ...data.payload, role: data.payload.isAdmin ? ROLE.Enum.admin : ROLE.Enum.casheer },
      msg: `Wellcome ${data.payload.name}`,
    }
  else return { invalid: true, msg: data.msg ?? 'Failed to signin' }
}

export const authService = {
  signUp,
  signIn,
}
