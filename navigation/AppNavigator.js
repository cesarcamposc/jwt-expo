import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Loginscreen from '../screens/Loginscreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {

    const [token, setToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadToken = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (token) {
                    setToken(token);
                }
            } catch (error) {
                console.log('Error al cargar el token', error);
            } finally {
                setIsLoading(false);
            }
        }
        loadToken();
    }, []);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Cargando...</Text>
            </View>
        )
    }
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}>
            {token ? (
                <Stack.Screen name="Profile">
                    {(props) => <ProfileScreen {...props} setToken={setToken} />}
                </Stack.Screen>
            ) : (
                <Stack.Screen name="Login">
                    {(props) => <Loginscreen {...props} setToken={setToken} />}
                </Stack.Screen>
            )}
        </Stack.Navigator>
    )
}

export default AppNavigator

const styles = StyleSheet.create({})