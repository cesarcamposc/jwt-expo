import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import api from '../utils/api'

const ProfileScreen = ({ setToken }) => {

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/profile');
        setProfile(response.data.user);
      } catch (error) {
        Alert.alert('Error al obtener el perfil', error.response.data.message);
      }
    }
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    setToken(null);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {profile ? (
          <>
            <Text style={styles.text}>Bienvenido: {profile.name}</Text>
            <Text style={styles.text}>Email : {profile.email}</Text>
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