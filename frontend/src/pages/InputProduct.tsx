import React, { useEffect, useState, useRef } from 'react'
import { Routes, Route, useParams } from 'react-router-dom'
import clsx from 'clsx'
import {
    FieldValues,
    UseControllerProps,
    useForm,
    useController,
} from 'react-hook-form'
import { useProductStore } from '../hooks/useProducts'
import { GridRow } from '../components/Grid'
import { H1 } from '../components/Typography'
import { zodResolver } from '@hookform/resolvers/zod'
import { ProductInputSchema, productInputSchema } from '../utils/zod.schema'
import { Button } from '../components/Button'

export function ProductPage() {
    return (
        <Routes>
            <Route index element={<InputProduct />} />
            <Route path=":id" element={<InputProduct />} />
        </Routes>
    )
}

function InputProduct() {
    const { id } = useParams()
    const [stateSubmit, setStateSubmit] = useState('iddle')
    const { getProductId, postProduct } = useProductStore()

    const {
        handleSubmit,
        setValue,
        control,
        watch,
        formState: { errors, isValid },
    } = useForm<ProductInputSchema>({
        resolver: zodResolver(productInputSchema),
        mode: 'all',
    })

    useEffect(() => {
        if (!id) return
        setValue(
            'image',
            'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
        )
        // setStateSubmit('iddle')
        // getProductId(id).then((val) => {})
    }, [])

    const onSubmit = async (data: Omit<ProductInputSchema, 'image'>) => {
        const formData = new FormData()
        const formArray: [string, string | File][] = Object.entries({ ...data })
        formArray.forEach(([key, val]) => formData.append(key, val))
        console.log(formData)
    }

    return (
        <>
            <GridRow
                className="px-5 w-full flex-auto text-sm overflow-y-scroll"
                title={
                    <div className="flex flex-col justify-center h-full w-full">
                        <H1>Input Product</H1>
                    </div>
                }
            >
                <fieldset disabled={stateSubmit == ''}>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        encType="application/x-www-form-urlencoded"
                        className="h-full flex gap-2 py-8 flex-col lg:flex-row"
                    >
                        {/*Input Image*/}
                        <div className="lg:h-full w-full lg:flex-[1_1_55%]">
                            <ImagePlaceInput
                                name={'image'}
                                setValue={(file) => setValue('image', file)}
                                value={watch('image')}
                                errors={errors?.image?.message}
                            />
                        </div>

                        {/*Form Input*/}
                        <div className="w-full flex-auto p-5 bg-dark-2 col-start-2 col-end-4 rounded-lg overflow-scroll">
                            <FormInput
                                control={control}
                                name="menu"
                                label={'Nama Menu'}
                                defaultValue=""
                            />
                            <FormInput
                                control={control}
                                name="price"
                                defaultValue=""
                                type="number"
                                label="Harga"
                            />
                            <Button className="w-full" type="submit">
                                Tambahkan
                            </Button>
                        </div>
                    </form>
                </fieldset>
            </GridRow>
        </>
    )
}

type FormInputProps<T extends FieldValues> = UseControllerProps<T> & {
    label: string
    type?: React.HTMLInputTypeAttribute
}

function FormInput<T extends FieldValues = FieldValues>({
    type,
    ...props
}: FormInputProps<T>) {
    const { field, fieldState } = useController({ ...props })
    return (
        <label
            htmlFor={props.name}
            className={'w-full flex flex-col gap-2 justify-around my-5'}
        >
            <p className="ml-1 text-md font-medium">{props.label}</p>
            <input
                id={props.name}
                {...field}
                type={type}
                className={clsx(
                    'py-2 px-3 rounded-md text-white bg-form outline-2 outline-offset-5 outline-red-200 outline-none',
                    { 'border-2 border-red-500': fieldState.error },
                )}
            />
            {fieldState.error && <p>{fieldState.error.message}</p>}
        </label>
    )
}

type ImagePlaceInputProps = {
    name: string
    setValue(arg: File): void
    value: null | string | File
    errors?: string
}

function ImagePlaceInput(props: ImagePlaceInputProps) {
    const { name, setValue, value, errors } = props
    const imageRef = useRef<HTMLInputElement>(null)
    const [selectedImage, setSelectedImage] = useState<null | string>(null)

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setValue(e.target.files[0])
            setSelectedImage(URL.createObjectURL(e.target.files[0]))
        }
    }

    useEffect(() => {
        if (!value) return
        if (value instanceof File) setSelectedImage(URL.createObjectURL(value))
        else setSelectedImage(value)
    }, [value])

    const removeImage = React.useCallback(() => {
        setSelectedImage(null)
        if (imageRef?.current?.value) imageRef.current.value = ''
    }, [imageRef.current])

    return (
        <div className="bg-dark-2 rounded-lg p-6 flex flex-col gap-4">
            <input
                accept="image/*"
                type="file"
                hidden
                name={name}
                ref={imageRef}
                onChange={onChange}
            />
            {selectedImage ? (
                <Button onClick={removeImage}>Remove</Button>
            ) : (
                <Button
                    onClick={(e) => {
                        e.preventDefault()
                        imageRef.current?.click()
                    }}
                >
                    Upload Image
                </Button>
            )}
            {errors && <p className="text-red-400">{'as'}</p>}
            {selectedImage && <img src={selectedImage} />}
        </div>
    )
}
