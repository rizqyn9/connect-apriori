import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { FormInput } from '../components/Form'
import { AuthLayout } from '../components/Layout'
import { SignInSchema, signInSchema } from '../utils/zod.schema'
import { useMutation } from '@tanstack/react-query'
import { authService } from '../services'
import { useSignIn } from 'react-auth-kit'
import { useToastStore } from '../components/Toast'

export function SignIn() {
  const authSignIn = useSignIn()
  const { addToast } = useToastStore()
  const mutation = useMutation(authService.signIn)

  const { control, handleSubmit } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
  })

  const onSubmit = (data: SignInSchema) =>
    mutation.mutate(data, {
      onSuccess: ({ invalid, msg, ...rest }) => {
        // @ts-expect-error
        if (rest.token) authSignIn(rest)
        addToast({ type: invalid ? 'error' : 'success', msg })
      },
    })

  return (
    <AuthLayout>
      <h1 className="text-xl font-bold py-3 mb-3 text-center">MASUK</h1>
      <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <FormInput control={control} label={'Email'} name={'email'} type={'email'} defaultValue="" />
        <FormInput defaultValue="" control={control} name={'password'} label={'Password'} type={'password'} />
        <button type={'submit'} className={'py-2 mt-8 rounded-lg bg-primary hover:bg-primary/80 cursor-pointer'}>
          Sign In
        </button>
        {/* <Link to={'/auth/signup'} className={'text-sm text-white hover:text-white/80 italic mt-3'}>
          Create new account ?
        </Link> */}
      </form>
    </AuthLayout>
  )
}
