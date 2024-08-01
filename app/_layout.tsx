import { Stack } from 'expo-router'
import React from 'react'
import { Text, View } from 'react-native'

const RootLayout = () => {
  return (
    <Stack>
        <Stack.Screen name="index" options={{headerShown:false}} />
    </Stack>
  )
}

export default RootLayout



