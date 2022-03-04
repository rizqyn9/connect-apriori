import { useAxiosPrivate } from './useAxiosPrivate'

function useProducts() {
    const axiosPrivate = useAxiosPrivate()

    const getAllProducts = async () => {
        return await axiosPrivate.get('/products')
    }

    const getProductById = async (id) => {
        return await axiosPrivate.get(`/products/${id}`)
    }

    const postProduct = async (data) => {
        return await axiosPrivate.post('/products', data)
    }

    return { getAllProducts, getProductById, postProduct }
}

export { useProducts }
