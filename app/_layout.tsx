import appStore from '@/store/store';
import { Stack } from 'expo-router'
import React from 'react'
import { Text, View } from 'react-native';
import { Provider } from 'react-redux';

const RootLayout = () => {
  return (
    <Provider store={appStore}>
    <Stack>
        <Stack.Screen name="index" options={{headerShown:false}} />
        <Stack.Screen name="BottomNav" options={{headerShown:false}} />
        <Stack.Screen name="Checkout" options={{headerShown:true}} />
    </Stack>
    </Provider>
  )
}

export default RootLayout



