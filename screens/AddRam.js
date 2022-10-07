import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Animated,
  ImageBackground,
  KeyboardAvoidingView,
   ActivityIndicator
} from 'react-native';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { LinearGradient } from 'expo-linear-gradient';
import COLORS from '../constants/colors';
// import villes from '../constants/villes';
import hotels from '../constants/hotels';
import villes from '../constants/villes';
const {width, height} = Dimensions.get('screen');
const cardWidth = width / 1.8;
import { firebase } from '../firebase';
const { 
  MOMO,
  OM,
  profilPic,
  ww
  } = images;

import { images, icons, FONTS, SIZES } from '../constants';

import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';

export default function AddRam({navigation}) {

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

    const [nom, setNom] =useState('')
    const [email, setEmail] =useState('')
    const [phone, setPhone] =useState('')
    const [secteur, setSecteur] =useState('')
    const [group, setGroup] =useState('')

    const emailValidator = (email) =>{
        let re=/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
        return re.test(email);
    }

    const {currentUser} = firebase.auth();

    const [info, setInfo] = useState([]);
    useEffect(() => {
      const unsubscribe = firebase.firestore()
      .collection('Users').doc(currentUser.uid).onSnapshot(snapshot=>
          { 
              setInfo({
               id: snapshot.data().info.id,
               Nom: snapshot.data().info.Nom,
               Email: snapshot.data().info.Email,
               Numero: snapshot.data().info.Numero,
               status: snapshot.data().info.status,
           });
           }
       )
       return () => unsubscribe();
  }, [])

  function AddingUserToDB(){
    const {currentUser} = firebase.auth();
    console.log(currentUser.uid);
    firebase.firestore()
    .collection('Rammaseur')
    .doc(group)
    .set({
        // info: {
            id: group,
            Nom: nom,
            Email: email,
            Numero: phone,
            Secteur: secteur,
            Group: group
        // },
        // chatRoom:[]
    })
}

  const submit = () => {
    if (email.length == 0 || nom.length == 0 || group.length == 0 || secteur.length == 0 || phone.length == 0){
        alert('Veillez remplir completement le formulaire')
    } else {
        if (emailValidator(email) == true){
           if (nom.length < 4) {
               alert('Le nom doit avoir plus de 4 caratèr');
           } else {
                if(phone < 9){
                    alert('Le numero doit avoir 9 chiffres');
                }
                else {
                    setOkload(true)
                    AddingUserToDB();
                    navigation.goBack();
                    alert('Ramasseur créer avec succés')
                    
                }
               
           }
        } else {
            alert("Format d'email incorrect.")
        }
    }
}

  return (
    <SafeAreaView>
                           <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          // backgroundColor: 'white'
          padding: 15,
          // marginTop: 25
        }}>
          <View>
              <Text style={{fontSize: 20, color: 'black', fontWeight: 'bold'}}>
              Hello {info.Nom}.
              </Text>
              <View style={{paddingBottom: 15}}>
          {/* <Text style={{fontSize: 25, fontWeight: 'bold', color: 'gray'}}>
            Aide au ramassage
          </Text> */}
          <View style={{flexDirection: 'row'}}>
            {/* <Text style={{fontSize: 30, fontWeight: 'bold', color: 'gray'}}>d'</Text> */}
            <Text
              style={{fontSize: 40, fontWeight: 'bold', color: COLORS.primary}}>
              Ajouter Ramm...
            </Text>
          </View>
        </View>
          </View>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <ImageBackground
            source={profilPic}
            style={{width: 55, height: 55, overflow: 'hidden', borderRadius: 25}}
            // imageStyle={{borderRadius: 25}}
          >
          </ImageBackground>
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{paddingHorizontal: 25}}>
            {/* <Text
        style={{
            // fontFamily: 'Roboto-Medium',
            fontSize: 28,
            fontWeight: '500',
            color: '#333',
            marginBottom: 30,
            alignSelf: 'center',
            color: COLORS.pr
        }}>
        Booking
        </Text> */}
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <View style={{alignItems: 'center', marginBottom: 20}}>
                <MaterialIcons name="supervised-user-circle" size={100} color={COLORS.primary} />
            </View>


            <InputField
            label={'Nom complet'}
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
            label={'Phone'}
            onChangeText={text => setPhone(text)}
            icon={
                <MaterialIcons
                name="phone"
                size={20}
                color="#666"
                style={{marginRight: 5}}
                />
            }
            keyboardType="phone-pad"
            />

            <InputField
            label={'Groupe'}
            onChangeText={text => setGroup(text)}
            icon={
                <FontAwesome
                name="group"
                size={20}
                color="#666"
                style={{marginRight: 5}}
                />
            }
            />

        <InputField
            label={'Secteur de rammassage'}
            onChangeText={text => setSecteur(text)}
            icon={
                <Ionicons
                name="location"
                size={20}
                color="#666"
                style={{marginRight: 5}}
                />
            }
            />

            <CustomButton label={'Ajouter'} onPress={() => {submit()}} />

        </KeyboardAvoidingView>
    
      </ScrollView>
      <Loader />
    
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    //   padding: 10,
    backgroundColor: 'white'
    },
    title: {
      fontWeight: 'bold',
      textAlign: 'center',
      color: 'white',
      fontSize: 40,
      top: -10
    },
    titleBar: {
      flexDirection: "row",
      justifyContent: "space-between",
      // alignItems: "center",
      marginTop: 24,
      marginHorizontal: 16
  },
})
