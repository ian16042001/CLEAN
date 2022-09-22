import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Background from './Background';
import Btn from './Btn';
import { darkGreen, green } from './Constants';

const Home = (props) => {
  return (
    <Background>
      <View style={{ padding: 20, marginTop: 100 }}>
      <Text style={{ color: 'white', fontSize: 64 }}>Gardons notre ville</Text>
      <Text style={{ color: 'white', fontSize: 64, marginBottom: 40 }}>Propre</Text>
      <Btn bgColor={green} textColor='white' btnLabel="Connexion" Press={() => props.navigation.navigate("Login")} />
      <Btn bgColor='white' textColor={darkGreen} btnLabel="Inscription" Press={() => props.navigation.navigate("Signup")} />
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({})

export default Home;
