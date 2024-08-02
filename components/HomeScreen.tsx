import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Our E-commerce Store</Text>
      <Text style={styles.description}>
      Discover a wide range of products, from electronics to fashion, all at unbeatable prices. Enjoy an exceptional shopping experience with us.
      </Text>
      <Image
        source={{ uri: 'https://tse1.mm.bing.net/th?id=OIP.j1vOYtX6KRFcU_9ht5bOKQHaE8&pid=Api&P=0&h=180' }}
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
