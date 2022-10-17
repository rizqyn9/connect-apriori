import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { AuthLayout } from '../components/Layout'
import { authService } from '../services'
import { useToastStore } from '../components/Toast'
import { FormInput } from '../components/Form'
import { SignUpSchema, signUpSchema } from '../utils/zod.schema'

export function SignUp() {
    const { addToast } = useToastStore()
    const navigate = useNavigate()

    const mutation = useMutation((data: SignUpSchema) => authService.signUp(data), {
        onSuccess: ({ success, msg }) => {
            addToast({ msg, type: success ? 'success' : 'error' })
            success && navigate('/auth/signin')
        },
    })

    const { handleSubmit, control } = useForm<SignUpSchema>({
        resolver: zodResolver(signUpSchema),
    })

    const onSubmit = async (data: SignUpSchema) => mutation.mutate(data)

    return (
        <AuthLayout>
            <h1 className="text-xl font-bold py-3 mb-3 text-center">DAFTAR</h1>
            <form className={'w-full flex flex-col gap-5'} onSubmit={handleSubmit(onSubmit)}>
                <FormInput defaultValue="" control={control} label="Name" name="name" type="text" />
                <FormInput defaultValue="" control={control} label="Email" name="email" type="email" />
                <FormInput defaultValue="" control={control} label="Password" name="password" type="password" />
                <button type="submit" className="py-2 mt-8 rounded-lg bg-primary hover:bg-primary/80 cursor-pointer">
                    Sign Up
                </button>
                <Link to="/auth/signin" className="text-sm hover:text-white/80 italic mt-3">
                    Already have account ?
                </Link>
            </form>
        </AuthLayout>
    )
}
