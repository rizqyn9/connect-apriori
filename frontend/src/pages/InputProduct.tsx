import React, { useEffect, useState, useRef } from 'react'
import { Routes, Route, useParams } from 'react-router-dom'
import clsx from 'clsx'
import {
    FieldValues,
    UseControllerProps,
    useForm,
    useController,
    SubmitErrorHandler,
    SubmitHandler,
} from 'react-hook-form'
import { useProductStore } from '../hooks/useProducts'
import { GridRow } from '../components/Grid'
import { H1 } from '../components/Typography'
import { zodResolver } from '@hookform/resolvers/zod'
import { ProductInputSchema, productInputSchema } from '../utils/zod.schema'

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
    const [product, setProducts] = useState({})
    const { getProductId, postProduct } = useProductStore()
    const {
        handleSubmit,
        setValue,
        control,
        formState: { errors },
    } = useForm<ProductInputSchema>({
        resolver: zodResolver(productInputSchema),
        mode: 'onBlur',
    })

    useEffect(() => {
        if (!id) return
        setStateSubmit('iddle')
        getProductId(id).then((val) => {
            setProducts(val)
            setValue('menu', val.menu)
            setValue('price', val.price)
        })
    }, [])

    const onSubmit = async (data) => {
        console.log(data)
        const formData = new FormData()
        Object.entries(data).forEach(([key, val]) => {
            formData.append(key, val)
        })

        await postProduct(formData).then((val) => {
            console.log(val)
            setStateSubmit('finish')
        })

        setStateSubmit('iddle')
    }

    const onError = async (errors: SubmitErrorHandler<{}>) => {
        console.log(errors)
    }

    return (
        <>
            <GridRow
                className={'px-5 w-full flex-auto'}
                title={
                    <div className="flex flex-col justify-center h-full w-full">
                        <H1>Input Product</H1>
                    </div>
                }
            >
                <form
                    onSubmit={handleSubmit(onSubmit, onError)}
                    encType="application/x-www-form-urlencoded"
                    className="h-full flex gap-2 py-8"
                >
                    {/*Input Image*/}
                    <div className="h-full w-full" style={{ flex: '1 1 55%' }}>
                        <ImagePlanInput
                            name={'image'}
                            setValue={setValue}
                            errors={errors.image?.message}
                            stateSubmit={stateSubmit}
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
                            className={'bg-primary p-3 w-full rounded-lg mt-5'}
                        >
                            Tambahkan
                        </button>
                    </div>
                </form>
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

function ImagePlanInput({ name, setValue, errors, stateSubmit }) {
    const imageRef = useRef(null)
    const [selectedImage, setSelectedImage] = useState(null)

    useEffect(() => {
        setValue(name, selectedImage)
    }, [selectedImage])

    const onChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0])
        }
    }

    const removeImage = React.useCallback(() => {
        setSelectedImage(null)
        imageRef.current.value = null
    }, [stateSubmit])

    return (
        <div className="bg-dark-2 rounded-lg p-6 flex flex-col gap-4">
            <input
                accept="image/*"
                type="file"
                id={'thumbnail'}
                name={name}
                className={
                    'block w-full py-4 px-2 border-2 border-primary rounded-lg text-center'
                }
                ref={imageRef}
                onChange={onChange}
            />
            {errors && <p className="text-red-400">{errors}</p>}
            {selectedImage && (
                <>
                    <label
                        htmlFor="thumbnail"
                        className="max-h-[55vh] overflow-hidden rounded-lg border-2 border-primary"
                    >
                        <img src={URL.createObjectURL(selectedImage)} />
                    </label>
                    <button
                        className="bg-red-700 hover:bg-red-800 rounded-md w-1/2 mx-auto p-3"
                        onClick={removeImage}
                        type={'button'}
                    >
                        Remove Image
                    </button>
                </>
            )}
        </div>
    )
}
