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
import { useTransition } from 'react'

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
        getValues,
        control,
        watch,
        formState: { errors },
    } = useForm<ProductInputSchema>({
        resolver: zodResolver(productInputSchema),
        mode: 'onBlur',
    })

    const watchImage = watch('image')

    useEffect(() => {
        if (!id) return
        setStateSubmit('iddle')
        getProductId(id).then((val) => {
            // setProducts(val)
            setValue('menu', val.menu)
            setValue('price', val.price)
        })
    }, [])

    const onSubmit = async (data: ProductInputSchema) => {
        const formData = new FormData()
        Object.entries(data).forEach(([key, val]) => {
            formData.append(key, String(val))
        })

        await postProduct(formData).then((val) => {
            console.log(val)
            setStateSubmit('finish')
        })

        setStateSubmit('iddle')
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
                                value={getValues('image')}
                                errors={errors?.image?.message}
                            />
                        </div>

                        {/*Form Input*/}
                        <div className="w-full flex-auto p-5 bg-dark-2 col-start-2 col-end-4 rounded-lg overflow-scroll">
                            <FormInput
                                control={control}
                                name="menu"
                                label={'Nama Menu'}
                            />
                            <FormInput
                                control={control}
                                name={'price'}
                                type="number"
                                label={'Harga'}
                            />
                            <button
                                type={'submit'}
                                className={
                                    'bg-primary p-3 w-full rounded-lg mt-5'
                                }
                            >
                                Tambahkan
                            </button>
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

function FormInput<T extends FieldValues = FieldValues>(
    props: FormInputProps<T>,
) {
    const { field, fieldState } = useController({ ...props })
    return (
        <label
            htmlFor={props.name}
            className={'w-full flex flex-col gap-2 justify-around my-5'}
        >
            <p className="ml-1 text-md font-medium">{props.label}</p>
            <input
                id={props.name}
                type={props.type ?? 'text'}
                {...field}
                className={clsx(
                    'py-2 px-3 rounded-md text-white bg-form outline-2 outline-offset-5 outline-red-200 outline-none',
                    { 'border-2 border-red-500': fieldState.error },
                )}
            />
        </label>
    )
}

type ImagePlaceInputProps = {
    name: string
    setValue(arg: File): void
    value: File | null
    errors?: string
}

function ImagePlaceInput(props: ImagePlaceInputProps) {
    const { name, setValue, value, errors } = props
    const imageRef = useRef<HTMLInputElement>(null)
    const [selectedImage, setSelectedImage] = useState<null | File | string>(
        value,
    )

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            console.log(e.target.files[0])

            setValue(e.target.files[0])
            setSelectedImage(e.target.files[0])
        }
    }

    const removeImage = React.useCallback(() => {
        setSelectedImage(null)
        if (imageRef?.current?.value) {
            imageRef.current.value = ''
        }
    }, [imageRef.current])

    const getHref = React.useCallback(() => {
        return selectedImage
            ? new URL(
                  selectedImage instanceof File
                      ? URL.createObjectURL(selectedImage)
                      : 'https://hackernoon.imgix.net/drafts/sool3tca.png?auto=format&fit=max&w=1920',
              ).href
            : undefined
    }, [props, selectedImage])

    return (
        <div className="bg-dark-2 rounded-lg p-6 flex flex-col gap-4">
            <input
                accept="image/*"
                type="file"
                id="thumbnail"
                name={name}
                className="block w-full py-4 px-2 border-2 border-primary rounded-lg text-center"
                ref={imageRef}
                onChange={onChange}
            />
            {errors && <p className="text-red-400">{errors}</p>}
            {getHref() && (
                <>
                    <label
                        htmlFor="thumbnail"
                        className=" overflow-hidden rounded-lg border-2 border-primary"
                    >
                        <img src={getHref()} />
                    </label>
                    <button
                        className="bg-red-700 hover:bg-red-800 rounded-md w-1/2 mx-auto p-3"
                        onClick={removeImage}
                        type="button"
                    >
                        Remove Image
                    </button>
                </>
            )}
        </div>
    )
}
