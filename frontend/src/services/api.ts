import axios from 'axios'
import { getToken } from "./auth"

const api = axios.create({
    baseURL: process.env.BASE_URL || 'http://localhost:3150',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        },
})

api.interceptors.request.use(async config => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${JSON.parse(token).token}`
    }
    return config
  })

export default api
