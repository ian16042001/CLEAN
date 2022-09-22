import React from 'react';
import {View, Text, Touchable, TouchableOpacity, Dimensions} from 'react-native';
import Background from './Background';
import Btn from './Btn';
import {darkGreen} from './Constants';
import Field from './Field';

const {width, height} = Dimensions.get('screen');

const Login = (props) => {
  return (
    <Background>
      <View style={{alignItems: 'center'}}>
        <Text
          style={{
            color: 'white',
            fontSize: 64,
            fontWeight: 'bold',
            marginTop: 70,
          }}>
          Login
        </Text>
        <View
          style={{
            backgroundColor: 'white',
            height: height,
            width: width,
            borderTopLeftRadius: 130,
            paddingTop: 80,
            alignItems: 'center',
            marginTop: 50,
          }}>
          <Text style={{fontSize: 40, color: darkGreen, fontWeight: 'bold'}}>
            Bienvenue
          </Text>
          <Text
            style={{
              color: 'grey',
              fontSize: 19,
              fontWeight: 'bold',
              marginBottom: 20,
            }}>
            Connectez-vous à votre compte
          </Text>
          <Field
            placeholder="Email / Nom d'utilisateur"
            keyboardType={'email-address'}
          />
          <Field placeholder="Mot de passe" secureTextEntry={true} />
          <View
            style={{alignItems: 'flex-end', width: '100%', paddingRight: 16, marginBottom: 100}}>
            <Text style={{color: darkGreen, fontWeight: 'bold', fontSize: 16, marginTop: 8}}>
              Mot de passe oublié ?
            </Text>
          </View>
          <Btn textColor='white' bgColor={darkGreen} btnLabel="Connexion" Press={() => alert("Connecté")} />
          <View style={{ display: 'flex', flexDirection :'row', justifyContent: "center" }}>
            <Text style={{ fontSize: 16, fontWeight:"bold" }}>Vous n'avez pas de compte ? </Text>
            <TouchableOpacity onPress={() => props.navigation.navigate("Signup")}>
            <Text style={{ color: darkGreen, fontWeight: 'bold', fontSize: 16 }}>Créer compte</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Background>
  );
};

export default Login;
