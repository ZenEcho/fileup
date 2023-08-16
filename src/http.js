// http.js
import axios from 'axios';
import { useToast } from "vue-toastification";
import router from '@/router'; // Import your Vue Router instance
const toast = useToast();
const http = axios.create({
    baseURL: 'http://localhost:3199', // 设置基础 URL
    withCredentials: true,
    timeout: 60000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// 添加响应拦截器
http.interceptors.response.use(
    response => {
        // 检查响应头是否有新 Token
        const Token = response.data.token;
        if (Token) {
            // 保存新 Token 到 localStorage
            localStorage.setItem('token', Token);
        }
        return response;
    },
    error => {
        const errorinfos = error.response.data;
        if (errorinfos && errorinfos.message === "认证失败") {
            toast.error(errorinfos.message)
            localStorage.clear();
            return router.push('/login')
        }
        return Promise.reject(error.response);
    }
);

export default http;
