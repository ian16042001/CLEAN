import React from 'react';
import {View, Text, Touchable, TouchableOpacity, Dimensions} from 'react-native';
import Background from './Background';
import Btn from './Btn';
import {darkGreen} from './Constants';
import Field from './Field';

const {width, height} = Dimensions.get('screen');

const Signup = props => {
  return (
    <Background>
      <View style={{alignItems: 'center', width: width}}>
        <Text
          style={{
            color: 'white',
            fontSize: 64,
            fontWeight: 'bold',
            marginTop: 50,
          }}>
          Inscription
        </Text>
        <Text
          style={{
            color: 'white',
            fontSize: 19,
            fontWeight: 'bold',
            marginBottom: 20,
          }}>
          Créer un nouveau compte
        </Text>
        <View
          style={{
            backgroundColor: 'white',
            height: 700,
            width: width,
            borderTopLeftRadius: 130,
            paddingTop: 50,
            alignItems: 'center',
          }}>
          <Field placeholder="Noms" />
          <Field placeholder="Prénom" />
          <Field
            placeholder="Email / Nom d'utilisateur"
            keyboardType={'email-address'}
          />
          <Field placeholder="Numéro de tel" keyboardType={'number'} />
          <Field placeholder="Mot de passe" secureTextEntry={true} />
          <Field placeholder="Confirmer mdp" secureTextEntry={true} />
          <View
            style={{
              display: 'flex',
              // flexDirection: 'row',
              // width: '100%',
              paddingRight: 16,
              marginTop: 10
            }}>
            <Text style={{color: 'grey', fontSize: 16}}>
            En vous inscrivant, vous acceptez nos{' '}
            </Text>
            <Text style={{color: darkGreen, fontWeight: 'bold', fontSize: 16}}>
              conditions générales d'utilisation
            </Text>
          </View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent :"center",
              width: '78%',
              paddingRight: 16,
              marginBottom: 10
            }}>
            <Text style={{color: 'grey', fontSize: 16}}>
              et {" "}
            </Text>
            <Text style={{color: darkGreen, fontWeight: 'bold', fontSize: 16}}>
            Politique de confidentialité
            </Text>
          </View>
          <Btn
            textColor="white"
            bgColor={darkGreen}
            btnLabel="Inscription"
            Press={() => {
              alert('Accoutn created');
              props.navigation.navigate('Login');
            }}
          />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>
            Vous avez déjà un compte ?{' '}
            </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Login')}>
              <Text
                style={{color: darkGreen, fontWeight: 'bold', fontSize: 16}}>
                Connexion
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Background>
  );
};

export default Signup;
