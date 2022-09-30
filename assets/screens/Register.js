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
  
  const {
      facebook,
      google,
      registration,
      twitter
    } = images;
  
  import CustomButton from '../components/CustomButton';
  import InputField from '../components/InputField';
import { auth } from '../firebase';

export default function Register({navigation}) {

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
                    <ActivityIndicator size="large" color={'#AD40AF'} />
                    <Text style={{color: 'white'}}>Chargement...</Text>
                </View>
            );
        }
        else return null;
    }

    const [nom, setNom] =useState('')
    const [email, setEmail] =useState('')
    const [pass, setPass] =useState('')

    const emailValidator = (email) =>{
        let re=/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
        return re.test(email);
    }

    const submit = () => {
        if (email.length == 0 || nom.length == 0 || pass.length == 0){
            alert('Veillez remplir completement le formulaire')
        } else {
            if (emailValidator(email) == true){
               if (nom.length < 4) {
                   alert('Le nom doit avoir plus de 4 caratèr');
               } else {
                   if (pass < 6) {
                    alert('Le mot de pass doit avoir plus de 4 caratèr');
                   } else {
                        setOkload(true)
                        auth.createUserWithEmailAndPassword(email, pass)
                            .then((userCredentials) => {
                                setOkload(false)
                                const user = userCredentials.user;
                                console.log(user);
                            })
                            .catch(error => {
                                setOkload(false)
                                alert(error.message)
                            })
                        
                   }
               }
            } else {
                alert("Format d'email incorrect.")
            }
        }
    }

  return (
<SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
    <StatusBar translucent backgroundColor={'#AD40AF'} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{paddingHorizontal: 25}}>
            <Text
        style={{
            // fontFamily: 'Roboto-Medium',
            fontSize: 28,
            fontWeight: '500',
            color: '#333',
            marginBottom: 30,
            alignSelf: 'center',
            color: '#AD40AF'
        }}>
        RMpro
        </Text>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <View style={{alignItems: 'center'}}>
            <Image
                        source={registration}
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
                fontSize: 28,
                fontWeight: '500',
                color: '#333',
                marginBottom: 30,
            }}>
            Register
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

            <Text style={{textAlign: 'center', color: '#666', marginBottom: 30}}>
            Or, register with email ...
            </Text>

            <InputField
            label={'Full Name'}
            onChangeText={text => setNom(text)}
            icon={
                <Ionicons
                name="person-outline"
                size={20}
                color="#666"
                style={{marginRight: 5}}
                />
            }
            />

            <InputField
            label={'Email ID'}
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
            label={'Password'}
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
            />

            <CustomButton label={'Register'} onPress={() => {submit()}} />

            <View
            style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: 30,
            }}>
            <Text>Already registered?</Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{color: '#AD40AF', fontWeight: '700'}}> Login</Text>
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