import { Link } from 'expo-router'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';


import { StyleSheet, Text, View } from 'react-native'

const App = () => {
  return (
    <LinearGradient
      // Button Linear Gradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.linearGradient}
    >
      <Text style={styles.text}>Sign in with Facebook</Text>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
    linearGradient: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: 'white',
      fontSize: 24,
      fontWeight: 'bold',
    },
  });

export default App