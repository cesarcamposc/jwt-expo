import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadToken = async () => {
            try {
                const storedToken = await AsyncStorage.getItem('token');
                if (storedToken) {
                    setToken(storedToken);
                }
            } catch (error) {
                console.log('Error al cargar el token', error);
            } finally {
                setIsLoading(false);
            }
        };
        loadToken();
    }, []);

    return (
        <AuthContext.Provider value={{ token, setToken, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
};
