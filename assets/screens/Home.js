import React from 'react'
import { 
    StyleSheet, 
    Text, 
    View , TouchableOpacity
  } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { auth } from '../firebase';

const Home = ({navigation}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => auth.signOut()}>
          <Text>ok!</Text> 
        </TouchableOpacity>
      <StatusBar style="auto"/>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default Home
