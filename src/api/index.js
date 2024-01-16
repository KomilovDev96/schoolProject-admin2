import axios from 'axios'
import { USER_TOKEN } from "@/utils/variables";
const api = axios.create({
    baseURL: `${import.meta.env.VITE_APP_BASE_URL}`,
});
api.interceptors.request.use((config) => {
    const TokentParse = localStorage.getItem(USER_TOKEN)
    const token = JSON.parse(TokentParse);
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export default api;