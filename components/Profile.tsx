// app/Profile.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Profile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    // Fetch user data from AsyncStorage
    const fetchUserData = async () => {
      try {
        const storedName = await AsyncStorage.getItem('user_name');
        const storedEmail = await AsyncStorage.getItem('user_email');
        const storedPassword = await AsyncStorage.getItem('user_password');
        console.log("name",name);
        

        if (storedName) setName(storedName);
        if (storedEmail) setEmail(storedEmail);
        if (storedPassword) setPassword(storedPassword);
      } catch (error) {
        console.error('Failed to load user data', error);
      }
    };

    fetchUserData();
  }, []);

  const handleSave = async () => {
    try {
      await AsyncStorage.setItem('user_name', name);
      await AsyncStorage.setItem('user_email', email);
      await AsyncStorage.setItem('user_password', password);
      Alert.alert('Success', 'Profile updated successfully');
    } catch (error) {
      console.error('Failed to save user data', error);
      Alert.alert('Error', 'Failed to update profile');
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      navigation.navigate('index'); // assuming you have a 'Login' screen
    } catch (error) {
      console.error('Failed to logout', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
        editable={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        editable={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        editable={false}
      />
      <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#00BFFF',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  button: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: '#000', // Tomato color for logout
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default Profile;
