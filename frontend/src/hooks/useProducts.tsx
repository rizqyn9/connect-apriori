import { atom, useAtom } from 'jotai'
import { useAxiosPrivate } from './useAxiosPrivate'
import create from 'zustand'
import { axiosPrivate } from '../services'

const atomProducts = atom([])

const useProductStore = create<ProductStore>((set, get) => ({
    products: [],
    async getAllProducts() {
        try {
            set({
                products: await axiosPrivate
                    .get<{ payload: ProductProps[] }>('/products')
                    .then((res) => res.data.payload)
                    .then((res) =>
                        res.map((data) => ({
                            ...data,
                            imageURL:
                                import.meta.env.VITE_SERVER +
                                '/' +
                                data.imageURL,
                        })),
                    ),
            })
        } catch (error: unknown) {
            Promise.reject(error)
        }
    },
}))

function useProducts() {
    const [products, setProducts] = useAtom(atomProducts)
    const axiosPrivate = useAxiosPrivate()

    /**
     * Mengambil semua products yang ada di databases
     */
    // const getAllProducts = async () => {
    //     return await axiosPrivate.get('/products').then((res) => {
    //         console.log(res)
    //         if (!Array.isArray(res.data.data)) return
    //         const parsed = res.data.data.map((val) => ({
    //             ...val,
    //             image: ,
    //         }))

    //         setProducts(parsed)
    //     })
    // }

    const getProductById = async (id) => {
        return await axiosPrivate.get(`/products/${id}`)
    }

    const postProduct = async (data) => {
        return await axiosPrivate.post('/products', data)
    }

    const testPostProduct = async (data) => {
        console.log(data)
        return await axiosPrivate.post('/products/test', data)
    }

    return {
        // getAllProducts,
        getProductById,
        postProduct,
        testPostProduct,
        products,
    }
}

export { useProducts, atomProducts, useProductStore }
