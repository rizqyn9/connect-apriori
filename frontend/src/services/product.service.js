import api from './index'

export async function GetAllProducts() {
    api.get('/products').then((data) => console.log(data))
}

export async function PostProduct() {}

export async function EditProduct() {}

export async function DeleteProduct() {}
