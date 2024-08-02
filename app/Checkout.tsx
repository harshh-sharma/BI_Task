// app/Checkout.js
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Easing, FlatList, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '@/store/slices/CartSlice';

const Checkout = () => {
  const navigation = useNavigation();
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.5);
  const rotateAnim = new Animated.Value(0);
  const [purchaseConfirmed, setPurchaseConfirmed] = useState(false);
  const cartItemList = useSelector(store => store?.cart?.cartItemList);
  const dispatch = useDispatch();

  const handleConfirmOrder = () => {
    setPurchaseConfirmed(true);
    dispatch(clearCart());

    // Start the animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleContinueShopping = () => {
    setPurchaseConfirmed(false);
    fadeAnim.setValue(0);
    scaleAnim.setValue(0.5);
    rotateAnim.setValue(0);
    navigation.navigate('Products');
  };

  const handleGoToHome = () => {
    setPurchaseConfirmed(false);
    fadeAnim.setValue(0);
    scaleAnim.setValue(0.5);
    rotateAnim.setValue(0);
    navigation.navigate('Home');
  };

  // Interpolate rotateAnim to convert it to degrees
  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  // Render cart item
  const renderCartItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.label}>{item.title}</Text>
        <Text style={styles.price}>{item.price.toFixed(2)}</Text>
      </View>
    </View>
  );

  const totalPrice = cartItemList.reduce((total, item) => total + item.price, 0);

 

  return (
    <View style={styles.container}>
      {purchaseConfirmed == false && <Text style={styles.title}>Checkout</Text>}
      <FlatList
        data={cartItemList}
        renderItem={renderCartItem}
        keyExtractor={item => item.id.toString()}
      />
      {purchaseConfirmed == false && <Text style={{fontSize:20,fontWeight:"bold",color:"#fff"}}>TotalAmount :{totalPrice}</Text>}
      {purchaseConfirmed && <View style={{justifyContent:"center",alignItems:"center"}}><Text style={{color:"white",fontWeight:"bold",fontSize:30,textAlign:"center"}}>Your order Successfully Placed</Text></View>}
      {purchaseConfirmed && (
        <Animated.View
          style={[
            styles.confirmation,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }, { rotate: rotateInterpolate }],
            },
          ]}
        >
          <Text style={styles.confirmationText}>Purchase Successful!</Text>
        </Animated.View>
      )}
      {!purchaseConfirmed ? (
        <TouchableOpacity style={styles.button} onPress={handleConfirmOrder}>
          <Text style={styles.buttonText}>Confirm Order</Text>
        </TouchableOpacity>
      ) : (
        <View>
          <TouchableOpacity style={styles.button} onPress={handleContinueShopping}>
            <Text style={styles.buttonText}>Continue Shopping</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleGoToHome}>
            <Text style={styles.buttonText}>Go to Home</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor:"#00BFFF"
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 5,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  label: {
    fontSize: 20,
    color: '#000',
    fontWeight:"500"
  },
  price: {
    fontSize: 20,
    color: '#000',
    fontWeight:"500"
  },
  confirmation: {
    marginVertical: 20,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#e0ffe0',
  },
  confirmationText: {
    fontSize: 24,
    color: 'green',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#000',
    paddingHorizontal: 15,
    paddingVertical:10,
    borderRadius: 5,
    marginVertical: 3,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default Checkout;
