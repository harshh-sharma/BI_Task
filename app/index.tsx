import { Link } from 'expo-router'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';


import { StyleSheet, Text, TouchableOpacity, TouchableOpacityComponent, View } from 'react-native'

const App = () => {
  return (
    
    <LinearGradient
      // Button Linear Gradient
      colors={['#00BFFF', '#fff']}
      style={styles.linearGradient}
    >
         <Text style={{color:"#000",fontWeight:500,fontSize:20,marginVertical:10,textAlign:"center"}}>"Good food is all the sweeter when shared with good friends."</Text>
        <Link href={"/Login"}><TouchableOpacity style={{backgroundColor:"white",borderRadius:20,paddingHorizontal:20,paddingVertical:7,marginTop:5,borderWidth:1,borderColor:"#000"}}>
           
            <Text style={{color:"#000",fontSize:18,fontWeight:"bold"}}>Get Started</Text>
        </TouchableOpacity></Link>
      {/* <Text style={styles.text}>Get started</Text> */}
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