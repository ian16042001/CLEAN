import React, {useState} from 'react';
import { 
    StyleSheet, 
    Text, 
    View,
    TouchableOpacity,
    Image, 
    SafeAreaView,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator
  } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';

import { images } from "../constants";
import COLORS from '../constants/colors';

const {
    facebook,
    google,
    login,
    twitter
  } = images;

import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';
import { firebase } from '../firebase';

export default function Login({navigation}) {

    const [okload, setOkload] = useState(false);

    function Loader(){
        if (okload===true){
            return(
                <View style={{
                    position: 'absolute', 
                    alignItems: 'center',
                     justifyContent: 'center',
                     backgroundColor: 'rgba(52, 52, 52, 0.15)',
                    ...StyleSheet.absoluteFillObject
                    }}>
                    <ActivityIndicator size="large" color={COLORS.primary} />
                    <Text style={{color: 'white'}}>Chargement...</Text>
                </View>
            );
        }
        else return null;
    }

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const emailValidator = (email) =>{
        let re=/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
        return re.test(email);
    }

    const submit = () => {
        if(email.length == 0 || pass.length == 0){
            alert('Veillez remplir completement le formulaire')
        } else{
            if (emailValidator(email) == true){
                setOkload(true)
                firebase.auth().signInWithEmailAndPassword(email, pass)
                    .then(() => {
                        setOkload(false)
                        navigation.navigate('HomeScreen')
                    })
                    .catch(error => {
                        setOkload(false)
                        if (error.code === 'auth/email-already-in-use') {
                            alert('Cette adresse email est déjà utilisée!');
                        }

                        if (error.code === 'auth/invalid-email') {
                            alert('Cette adresse e-mail n\'est pas valide !');
                        }

                        if(error.code === 'auth/network-request-failed'){
                            setOkload(false)
                            Alert.alert('Erreur de réseau', 'Verifier votre connexion internet...');
                            {/* MODAL */}
                        }

                        if(error.code === 'auth/user-not-found'){
                            setOkload(false)
                            Alert.alert('Erreur de Connexion', 'Compte un trouvable...');
                        }

                        if(error.code === 'auth/wrong-password'){
                            setOkload(false)
                            Alert.alert('Erreur de Connexion', 'Mot de passe incorrect...');

                        }

                    })
            } else {
                alert("Format d'email incorrect.")
            }
        }
    }

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
        <StatusBar translucent backgroundColor={COLORS.primary} />
        <ScrollView>
        {/* <Text
                style={{
                    // fontFamily: 'Roboto-Medium',
                    fontSize: 28,
                    fontWeight: '500',
                    color: '#333',
                    marginBottom: 30,
                    alignSelf: 'center',
                    color: COLORS.primary
                }}>
                Booking
                </Text> */}
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{paddingHorizontal: 25}}>
                <View style={{alignItems: 'center'}}>
                <Image
                    source={login}
                    resizeMode={'center'}
                    style={{
                        height: 300, 
                        width: 300, 
                    transform: [{rotate: '-5deg'}]

                    }}
                />
                </View>

                <Text
                style={{
                    // fontFamily: 'Roboto-Medium',
                    fontSize: 28,
                    fontWeight: '500',
                    color: '#333',
                    marginBottom: 30,
                }}>
                Connexion
                </Text>

                <InputField
                label={'Email'}
                onChangeText={text => setEmail(text)}
                icon={
                    <MaterialIcons
                    name="alternate-email"
                    size={20}
                    color="#666"
                    style={{marginRight: 5}}
                />
                }
                keyboardType="email-address"
                />

                <InputField
                label={'Mot de passe'}
                onChangeText={text => setPass(text)}
                icon={
                    <Ionicons
                    name="ios-lock-closed-outline"
                    size={20}
                    color="#666"
                    style={{marginRight: 5}}
                />
                }
                inputType="password"
                fieldButtonLabel={"oubié?"}
                fieldButtonFunction={() => {}}
                />
                
                <CustomButton label={"Connexion"} onPress={() => {submit()}} />

                <Text style={{textAlign: 'center', color: '#666', marginBottom: 30}}>
                Ou, connexion avec ...
                </Text>

                <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 30,
                }}>
                <TouchableOpacity
                    onPress={() => {}}
                    style={{
                    borderColor: '#ddd',
                    borderWidth: 2,
                    borderRadius: 10,
                    paddingHorizontal: 30,
                    paddingVertical: 10,
                    }}>
                    {/* <GoogleSVG height={24} width={24} /> */}
                    <Image
                    source={google}
                    resizeMode={'cover'}
                    style={{height: 24, width: 24}}
                />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {}}
                    style={{
                    borderColor: '#ddd',
                    borderWidth: 2,
                    borderRadius: 10,
                    paddingHorizontal: 30,
                    paddingVertical: 10,
                    }}>
                    {/* <FacebookSVG height={24} width={24} /> */}
                    <Image
                    source={facebook}
                    resizeMode={'center'}
                    style={{height: 24, width: 24}}
                />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {}}
                    style={{
                    borderColor: '#ddd',
                    borderWidth: 2,
                    borderRadius: 10,
                    paddingHorizontal: 30,
                    paddingVertical: 10,
                    }}>
                    {/* <TwitterSVG height={24} width={24} /> */}
                    <Image
                    source={twitter}
                    resizeMode={'center'}
                    style={{height: 24, width: 24}}
                />
                </TouchableOpacity>
                </View>

                <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginBottom: 30,
                }}>
                <Text>Nouvel utilisateur?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={{color: COLORS.primary, fontWeight: '700'}}> Créer compte</Text>
                </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
        <Loader />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
