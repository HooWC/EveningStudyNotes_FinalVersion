import axios from 'axios'
import { useUserStore } from '../store/user'

const api = axios.create({
    baseURL: 'http://localhost:9560/api'
})

// 请求拦截器，自动加 JWT
api.interceptors.request.use((config) => {
    const userStore = useUserStore()
    if (userStore.token) {
        config.headers.Authorization = `Bearer ${userStore.token}`
    }
    return config
})

export default api