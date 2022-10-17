import clsx from 'clsx'
import { FieldValues, useController } from 'react-hook-form'
import { FormInputProps } from './Input'

export function FormInput<T extends FieldValues = FieldValues>({ type, ...props }: FormInputProps<T>) {
    const { field, fieldState } = useController({ ...props })
    return (
        <label htmlFor={props.name} className={'w-full flex flex-col gap-2 justify-around my-5'}>
            <p className="ml-1 text-md font-medium">{props.label}</p>
            <input
                id={props.name}
                {...field}
                type={type}
                className={clsx('py-2 px-3 rounded-md text-white bg-form outline-2 outline-offset-5 outline-red-200 outline-none', {
                    'border-2 border-red-500': fieldState.error,
                })}
            />
            {fieldState.error && <p>{fieldState.error.message}</p>}
        </label>
    )
}
