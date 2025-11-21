import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
//* Este archivo es el que se encarga de hacer las peticiones a la API.
//* Su función principal es configurar y gestionar las peticiones al servidor(back-end)

const API_BASE_URL = "http://192.168.1.100:3000"; // reemplaza con tu direccion IP

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(async (config) => {
    try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    } catch (error) {
        console.log('Error al obtener el token', error);
        return Promise.reject(error);
    }
});

export default api;

