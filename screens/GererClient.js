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
  ImageBackground
} from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';
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


export default function GererClient() {


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
            //    photo: snapshot.data().info.photo,
            //    abonnement: snapshot.data().info.abonnement,
            //    profile: snapshot.data().info.profile,
            //    offres: snapshot.data().offres,
            //     demandes: snapshot.data().demandes,
                // chatRoom: snapshot.data().chatRoom
           });
           }
       )
       return () => unsubscribe();
  }, [])


  return (
    <View>
    
    </View>
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

