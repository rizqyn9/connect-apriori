import api from './index'

export async function GetAllProducts() {
    try {
        return await api.get('/products').then((res) => res.data)
    } catch (e) {
        alert(e)
    }
}

export async function PostProduct(data) {
    try {
        await api.post('/products', data).then((res) => {
            console.log(res)
        })
    } catch (e) {
        alert(e)
    }
}

export async function EditProduct() {}

export async function DeleteProduct() {}
