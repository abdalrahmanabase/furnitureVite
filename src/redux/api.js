import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL, // Use env variable
    withCredentials: true, // ✅ Important for Sanctum
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
});

// CSRF Protection (Fix for 419)
export const getCSRFToken = async () => {
    try {
        await api.get("/sanctum/csrf-cookie");
        console.log("✅ CSRF Token Set");
    } catch (error) {
        console.error("CSRF token request failed:", error);
    }
};

// Attach token to all requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
