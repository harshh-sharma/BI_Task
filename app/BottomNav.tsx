// App.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../components/HomeScreen';
import ProductsScreen from '../components/ProductScreen';
import CartScreen from '../components/CartScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (

      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: { backgroundColor: '#000' },
          
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Products" component={ProductsScreen} />
        <Tab.Screen name="Cart" component={CartScreen} />
      </Tab.Navigator>

  );
}
