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

import ListItem from '../components/ListItem';

export default function GererRam({navigation}) {

const [ram, setRam] = useState([])
useEffect(() => {
    const unsubscribe = firebase.firestore()
    .collection('Rammaseur').onSnapshot(snapshot=>
        { 
            setRam(
                snapshot.docs.map(doc =>({
                    user: doc.data().Nom,
                    titre: doc.data().Secteur,
                    description: doc.data().Group,
                    // photo: doc.data().photo,
                    location: doc.data().Numero,
                    // date: doc.data().date,
                    category: doc.data().category,
                    // likes: doc.data().likes,
                    // unLike: doc.data().unLike
                })
            ))
        }
     )
     return () => unsubscribe();
  }, [])


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
              Gérer Ramm...
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
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('AddRam')}>
            <View style={{
                backgroundColor: COLORS.primary,
                padding: 20,
                width: width / 2,
                borderRadius: 50,
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center'
            }}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>Ajouter Rammasseur</Text>
            </View>
        </TouchableOpacity>
        <Text style={{marginLeft: 10, marginBottom: 10, marginTop: 20}}>Liste des rammasseurs</Text>

        <View style={{padding: 20}}>
            {
                ram.map(item => (
                    <ListItem
                      key={item.id}
                      photo={item.photo}
                      title={item.titre}
                      subTitle={item.description}
                      isFree={item.isFree}
                      userName={item.user}
                      likes={0}
                      unLike={ 0}
                      onPress={() => {}}
                    />
                  ))
            }
        </View>
      </View>
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