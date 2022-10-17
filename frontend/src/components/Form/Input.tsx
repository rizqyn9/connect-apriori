import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

export type FormInputProps<T extends FieldValues> = UseControllerProps<T> & {
    label: string
    type: React.HTMLInputTypeAttribute
}

export function FormInput<T extends FieldValues = FieldValues>(props: FormInputProps<T>) {
    const { field, fieldState } = useController({ ...props })
    return (
        <label htmlFor={field.name} className={'w-full flex flex-col'}>
            <p className="ml-1 pb-1 text-sm font-medium">{props.label}</p>
            <input
                id={field.name}
                type={props.type}
                {...field}
                className="py-2 px-3 rounded-md text-white bg-form outline-2 border-2 border-dark-line outline-offset-5 outline-red-200 "
            />
            {fieldState.error && <p className={'text-xs mt-1 italic text-red-300'}>{fieldState.error.message}</p>}
        </label>
    )
}
