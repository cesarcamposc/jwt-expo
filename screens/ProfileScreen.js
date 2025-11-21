import { StyleSheet, Text, View, Pressable, Alert } from 'react-native'
import React from 'react'
import api from '../utils/api'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const ProfileScreen = () => {

  const  [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async() => {
      try {
         const response = await api.get('/profile');
         setProfile(response.data.user);
      } catch (error) {
        Alert.alert('Error al obtener el perfil', error);
      }
    }
    fetchProfile();
  }, []);

  const handleLogout = async() => {
    await AsyncStorage.removeItem('token');
    setToken(null);
    navigation.replace('Login');    
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        {profile ? (
          <>
          <Text style={styles.text}>Bienvenido Cesar Campos</Text>
          <Text style={styles.text}>Email : cesar.campos@idat.edu.pe</Text>
          </>
        ) : (
          <Text style={styles.text}>  Cargando Perfil...</Text>
        )}
        
        <Pressable
        style={styles.button}
        onPress={handleLogout}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

export default ProfileScreen

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