import { products } from "@/constants/dummyProductData";
import { addItemToCart, decreaseItemQty, increaseItemQty } from "@/store/slices/CartSlice";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

const fetchProducts = () => {
  try {
    // currently we not calling an api dummy data that are store in contants file but we calling any api then we use try catch for exception handling and make a function asynchrous
    return products;
  } catch (error) {
    console.log(error);
  }
};

const ProductListingScreen = () => {
  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const cartItemList = useSelector((state) => state.cart?.cartItemList);
  console.log("cartItemList", cartItemList);
  const dispatch = useDispatch();

  const pageSize = 10;

  const loadProducts = () => {
    setLoading(true);
    const allProducts = fetchProducts();
    setProducts(allProducts);
    setDisplayedProducts(allProducts.slice(0, pageSize));
    setLoading(false);
    setHasMore(allProducts.length > pageSize);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    const newProducts = products.slice(0, (page + 1) * pageSize);
    setDisplayedProducts(newProducts);
    setHasMore(newProducts.length < products.length);
  }, [page, products]);

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const onIncrease = (productId) => {
      dispatch(increaseItemQty(productId));
  }

  const onDecrease = (productId) => {
     dispatch(decreaseItemQty(productId))
  }

  //   handlingAddToCart
  const handleAddToCart = (item) => {
      dispatch(addItemToCart({...item,qty:1}))
  };

  //   rending Products
  const renderProduct = ({ item }: any) => {
    const cartItem = cartItemList.find((cartItem) => cartItem.id === item.id);
    const isItemPresentInCart = cartItem !== undefined;
    const quantity = isItemPresentInCart ? cartItem.qty : 0;

    return (
      <View style={styles.card}>
        <View
          style={{ width: "100%", paddingHorizontal: 5, paddingVertical: 5 }}
        >
          <Image source={{ uri: item.image }} style={styles.image} />
        </View>
        <View style={styles.details}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.price}>{item.price.toFixed(2)}</Text>
          {isItemPresentInCart ? (
              <View style={styles.btnContainer}>
             
              <TouchableOpacity style={styles.buttonQty} onPress={() => onDecrease(item?.id)}>
                <Text style={styles.buttonText}>-</Text>
              </TouchableOpacity>
              <View><Text style={{fontWeight:"bold"}}>{quantity}</Text></View>
              <TouchableOpacity style={styles.buttonQty} onPress={() => onIncrease(item?.id)}>
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleAddToCart(item)}
            >
              <Text style={styles.buttonText}>Add to Cart</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={displayedProducts}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={
          loading ? <ActivityIndicator size="large" color="#FF8C00" /> : null
        }
      />
      {hasMore === false && !loading && (
        <Text style={styles.noMoreText}>No more products available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00BFFF",
    // padding: 16,
    justifyContent: "center",
    alignItems: "center",
    // flexDirection:"row",
    // flexWrap:'wrap',
    // width:"100%"
  },
  productContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    padding: 16,
    marginBottom: 10,
    borderColor: "#2E8B57",
    borderWidth: 1,
  },
  productName: {
    fontSize: 18,
    color: "#2E8B57",
  },
  noMoreText: {
    textAlign: "center",
    fontSize: 16,
    color: "fff",
    marginVertical: 20,
    fontWeight:"bold"
  },

  card: {
    backgroundColor: "#FFF",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
    margin: 15,
    overflow: "hidden",
    width: 350,
  },
  image: {
    width: "100%",
    height: 160,
    resizeMode: "cover",
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
    borderRadius: 5,
  },
  details: {
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    color: "#00BFFF",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#000",
    paddingVertical: 7,
    borderRadius: 5,
    alignItems: "center",
    elevation: 5,
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  buttonQty: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#00BFFF", // Blue color
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProductListingScreen;
