export default function authHeader() {
    const token = JSON.parse(localStorage.getItem('token'))
    // const { cookies } = useAuth()

    if (token) {
        return { 'x-access-token': token } // for Node.js Express back-end
    } else {
        return {}
    }
}
