import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Our Restaurant</Text>
      <Text style={styles.description}>
        Enjoy the best culinary experiences with our diverse and exquisite menu, crafted to satisfy all tastes.
      </Text>
      <Image
        source={{ uri: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=600' }}
        style={styles.image}
        resizeMode="cover"
      />
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
    marginBottom: 16,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
    color: '#fff',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
});

export default HomeScreen;
