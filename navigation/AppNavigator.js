import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Loginscreen from '../screens/Loginscreen';
import ProfileScreen from '../screens/ProfileScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {

    const [token, setToken] = useState(null);
    
    useEffect(() => {
        const loadToken = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (token) {
                    setToken(token);
                }
            } catch (error) {
                console.log('Error al cargar el token', error);
            }
        }
        loadToken();
    }, []);
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Login'>
            <Stack.Screen name="Login" component={Loginscreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
    )
}

export default AppNavigator

const styles = StyleSheet.create({})