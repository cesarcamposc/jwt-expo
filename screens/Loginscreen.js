import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native'
import React from 'react'
import { useState } from 'react';
import api from '../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Loginscreen = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleLogin = async () => {
        try {
            const response = await api.post('/login', { email, password });
            const { token } = response.data;
            await AsyncStorage.setItem('token', token);
            navigation.replace('Profile');
        } catch (error) {
            Alert.alert('Error al iniciar sesión', error);
        }        
    }    
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Login Screen JWT</Text>
      <TextInput
      style={styles.input}
      placeholder="Email"
      value={email}
      keyboardType="email-address"
      autoCapitalize="none"
      autoCorrect={false}
      onChangeText={setEmail}/>

      <TextInput
      style={styles.input}
      placeholder="Password" 
      value={password}
      secureTextEntry={true} 
      onChangeText={setPassword}/>  
      
      <Pressable
      style={styles.button}
      onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
    </View>
  )
}

export default Loginscreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    input: {
        width: '90%',
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    button: {
        width: '50%',
        height: 50,
        backgroundColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
    },
})