import { useNavigation } from 'expo-router';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Alert, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name,setName] = useState("");
    const navigation = useNavigation();

  
    const handleRegister = () => {
       if(name && email && password){
       AsyncStorage.setItem("user",{name,email,password});
        navigation.navigate("BottomNav")
       }else{
        Alert.alert("Invalid",'All fields are required')
       }
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name.."
          placeholderTextColor="#2E8B57"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Enter your Email.."
          placeholderTextColor="#2E8B57"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Enter your Password.."
          placeholderTextColor="#2E8B57"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
        />
        <TouchableOpacity style={{justifyContent:"center",alignItems:"center",backgroundColor:"#000",width:"100%",paddingVertical:5}} onPress={() => handleLogin()}>
            <Text style={{fontSize:18,fontWeight:"bold",color:"#fff"}}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRegister}>
          <Text style={styles.registerText} onPress={() => navigation.navigate("Login")}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
      backgroundColor: "#00BFFF",
    },
    title: {
      fontSize: 28,
      marginBottom: 24,
      fontWeight: 'bold',
      color: '#FFF5E1',
    },
    input: {
      width: '100%',
      height: 48,
      borderColor: '#2E8B57',
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      marginVertical: 3,
      backgroundColor: '#FFFFFF',
      color: '#000',
    },
    buttonContainer: {
      marginTop: 20,
      width: '100%',
      borderRadius: 5,
      overflow: 'hidden',
      backgroundColor:"#000"
    },
    registerText: {
      marginTop: 20,
      color: '#fff',
      textDecorationLine: 'underline',
    },
  });

export default Register;