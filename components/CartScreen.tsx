import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Button,
  Alert,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { increaseQuantity, decreaseQuantity, removeItemFromCart, increaseItemQty, decreaseItemQty } from "@/store/slices/CartSlice";
import { Link, useNavigation } from "expo-router";

const CartScreen = () => {
  const cartItemList = useSelector((state) => state.cart?.cartItemList);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleIncrease = (itemId) => {
    dispatch(increaseItemQty(itemId));
  };

  const handleDecrease = (itemId) => {
    dispatch(decreaseItemQty(itemId));
  };

  const handleRemove = (productId) => {
    dispatch(removeItemFromCart(productId))
  };

  const renderCartItem = ({ item }) => {
    console.log("itemm",item.qty);
    return(

 
    
    <View style={styles.itemContainer}>
          <View
          style={{ width: "100%", paddingHorizontal: 5, paddingVertical: 5 }}
        >
          <Image source={{ uri: item.image }} style={styles.image} />
        </View>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.price}>${item.price.toFixed(2)}</Text>
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => handleDecrease(item.id)}
        >
          <Text style={styles.quantityText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{item.qty}</Text>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => handleIncrease(item.id)}
        >
          <Text style={styles.quantityText}>+</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => handleRemove(item.id)}
      >
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  )};

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItemList}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text style={styles.emptyText}>Cart is empty</Text>}
      />
      {cartItemList.length > 0 ? <TouchableOpacity style={{justifyContent:"center",alignItems:"center",backgroundColor:"#000",paddingVertical:10}} onPress={() => navigation.navigate("Checkout")}>
        <Text style={{color:"white",fontWeight:"bold"}}>Go to Checkout</Text>
      </TouchableOpacity> : <TouchableOpacity style={{justifyContent:"center",alignItems:"center",backgroundColor:"#000",paddingVertical:7}} onPress={() => navigation.navigate("Products")}>
        <Text style={{color:"white",fontWeight:"bold"}}>Shop Now</Text>
      </TouchableOpacity>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#00BFFF",
  },
  itemContainer: {
    backgroundColor: "#F5F5F5",
    padding: 16,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#00BFFF",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  quantityText: {
    color: "#000",
    fontSize: 20,
    fontWeight: "bold",
  },
  removeButton: {
    marginTop: 10,
    backgroundColor: "#000",
    paddingHorizontal: 10,
    paddingVertical:7,
    borderRadius: 5,
    alignItems: "center",
  },
  removeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  emptyText: {
    textAlign: "center",
    fontSize: 18,
    color: "#666",
    marginTop: 20,
  },
  image: {
    width: "100%",
    height: 140,
    resizeMode: "cover",
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
    borderRadius: 5,
  },
});

export default CartScreen;
