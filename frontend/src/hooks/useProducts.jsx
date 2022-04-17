import { atom, useAtom } from 'jotai'
import { useAxiosPrivate } from './useAxiosPrivate'

/**
 * Array of products
 */
const atomProducts = atom([])

function useProducts() {
    const [products, setProducts] = useAtom(atomProducts)
    const axiosPrivate = useAxiosPrivate()

    /**
     * Mengambil semua products yang ada di databases
     */
    const getAllProducts = async () => {
        return await axiosPrivate.get('/products').then((res) => {
            if (!Array.isArray(res.data.products)) return
            const parsed = res.data.products.map((val) => ({
                ...val,
                image: import.meta.env.VITE_SERVER + '/' + val.image,
            }))

            setProducts(parsed)
        })
    }

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
        getAllProducts,
        getProductById,
        postProduct,
        testPostProduct,
        products,
    }
}

export { useProducts, atomProducts }
