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


export default function AdminPage({navigation}) {


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
    <View style={styles.container}>
                <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        //   marginBottom: 10,
          // backgroundColor: 'white'
          padding: 10,
          // marginTop: 25
        }}>
          <View>
              <Text style={{fontSize: 20, color: 'black', fontWeight: 'bold'}}>
              Hello {info.Nom}.
              </Text>
              <View style={{paddingBottom: 15}}>
          <Text style={{fontSize: 25, fontWeight: 'bold', color: 'gray'}}>
            Aide au ramassage
          </Text>
          <View style={{flexDirection: 'row'}}>
            {/* <Text style={{fontSize: 30, fontWeight: 'bold', color: 'gray'}}>d'</Text> */}
            <Text
              style={{fontSize: 30, fontWeight: 'bold', color: COLORS.primary}}>
              Dashboard
            </Text>
          </View>
        </View>
          </View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ImageBackground
            source={profilPic}
            style={{width: 55, height: 55, overflow: 'hidden', borderRadius: 25}}
            // imageStyle={{borderRadius: 25}}
          >
          </ImageBackground>
        </TouchableOpacity>
      </View>

      {/* <Text style={{fontSize: 70, textAlign: 'center', fontWeight: 'bold'}}>Gérer</Text> */}
      <MaterialIcons name="admin-panel-settings" style={{alignSelf: 'center', marginTop: -20, marginBottom: 20}} size={90} color="black" />

      <ScrollView style={{marginTop: 0}}>
                        <TouchableOpacity onPress={() => {navigation.navigate("gererUSERS")}} style={{paddingBottom: 10}}>
                            <View style={{
                                width: width / 1.1,
                                backgroundColor: COLORS.primary0,
                                height: height / 8.5,
                                borderRadius: 25,
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                                alignItems: 'center',
                                padding: 20
                            }}>
                                <View style={{flexDirection: 'column'}}>
                                    <Text style={{fontSize: 30, fontWeight: 'bold', textAlign: 'center', color: COLORS.primary}}>
                                        Rammasseurs
                                    </Text>
                                    <Text style={{...FONTS.body1, color: COLORS.primary}}>
                                        {/* {userList} */}
                                        {/* {Object.keys(userList).length} */}
                                    </Text>
                                </View>
                                <View>
                                    {/* <Image source={users} resizeMode='contain' style={{width: width / 3, height: width / 3}} /> */}
                                    <MaterialIcons name="supervised-user-circle" size={70} color={COLORS.primary} />
                                </View>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {navigation.navigate("gererSignalement")}} style={{paddingBottom: 10}}>
                            <View style={{
                                width: width / 1.1,
                                backgroundColor: COLORS.primary0,
                                height: height / 8.5,
                                borderRadius: 25,
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                                alignItems: 'center',
                                padding: 20
                            }}>
                                <View>
                                    {/* <Image source={signal} resizeMode='contain' style={{width: width / 3.5, height: width / 3.5}} /> */}
                                    <MaterialIcons name="supervised-user-circle" size={70} color={COLORS.primary} />
                                </View>
                                <View style={{flexDirection: 'column'}}>
                                    <Text style={{fontSize: 30, fontWeight: 'bold', textAlign: 'center',  color: COLORS.primary}}>
                                        Clients
                                    </Text>
                                    <Text style={{...FONTS.body1, color: COLORS.white, alignSelf: 'flex-end'}}>
                                        {/* {traficMarker + policeMarker + accidentMarker + aideRoutiereMarker + routeBloquerMarker + essenceMarker + mauvaiseRouteMarker} */}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {navigation.navigate("annonce")}} style={{paddingBottom: 10}}>
                            <View style={{
                                width: width / 1.1,
                                backgroundColor: COLORS.primary0,
                                height: height / 8.5,
                                borderRadius: 25,
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                                alignItems: 'center',
                                padding: 20
                            }}>
                                <View style={{flexDirection: 'column'}}>
                                    <Text style={{fontSize: 30, fontWeight: 'bold', textAlign: 'center',  color: 'grey'}}>
                                        Annonces
                                    </Text>
                                    <Text style={{...FONTS.body1, color: COLORS.white}}>
                                        {/* { annonce !== null ? Object.keys(annonce).length : 0} */}
                                        {/* {annonce} */}
                                    </Text>
                                </View>
                                <View>
                                    {/* <Image source={mail} resizeMode='contain' style={{width: width / 3.5, height: width / 3.5}} /> */}
                                </View>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {navigation.navigate('gererMail')}} style={{paddingBottom: 10}}>
                            <View style={{
                                width: width / 1.1,
                                backgroundColor: COLORS.primary0,
                                height: height / 8.5,
                                borderRadius: 25,
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                                alignItems: 'center',
                                padding: 20
                            }}>
                                <View>
                                    {/* <Image source={notifMail} resizeMode='contain' style={{width: width / 3, height: width / 3}} /> */}
                                </View>
                                <View style={{flexDirection: 'column'}}>
                                    <Text style={{fontSize: 30, fontWeight: 'bold', textAlign: 'center',  color: 'grey'}}>
                                        Mails
                                    </Text>
                                    <Text style={{...FONTS.body1, color: COLORS.white, alignSelf: 'flex-end'}}>
                                        {/* { mails !== null ? Object.keys(mails).length : 0} */}
                                        {/* {mails} */}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                    </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
    paddingTop: 35,
  },
})