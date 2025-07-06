import axios from "axios";
//coment
const api = axios.create({
	// baseURL: "http://localhost:8080/",
	baseURL: "https://classy-bublanina-a5784e.netlify.app/",
});

// api.interceptors.request.use(
//     async (config) => {
//         const token = localStorage.getItem('accessToken');
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

export default api;
