import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL, // Use env variable for API URL
    withCredentials: true, // ✅ Required for Laravel Sanctum
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
});

// ✅ Fetch CSRF Cookie before making requests
export const getCSRFToken = async () => {
    try {
        await api.get("/sanctum/csrf-cookie");
        console.log("✅ CSRF Token Set");
    } catch (error) {
        console.error("❌ CSRF token request failed:", error);
    }
};

// ✅ Automatically attach tokens & CSRF headers
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    // ✅ Extract CSRF token from cookies securely
    const csrfToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("XSRF-TOKEN="))
        ?.split("=")[1];

    if (csrfToken) {
        config.headers["X-XSRF-TOKEN"] = decodeURIComponent(csrfToken);
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

// ✅ Handle API errors globally
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("❌ API Request Error:", error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default api;
