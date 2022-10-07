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
    Alert
  } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';
const {width, height} = Dimensions.get('screen');
import { firebase } from '../firebase';

// import files from '../assets/filesBase64';
import {images, icons, FONTS, SIZES } from '../constants';
import COLORS from '../constants/colors';


const { 
    MOMO,
    OM,
    profilPic,
    ww
    } = images;


const Profile = ({navigation}) => {

    function logout() {
        Alert.alert(
            'Deconnexion',
            'Voulez-vous vous deconnecté?',
            [
                {text: "Oui", onPress: () => {firebase.auth()
                    .signOut()
                    .then(() => {navigation.navigate('Onboarding')})
                    }, style: 'destructive'
                },
                {
                    text: "Non",
                    onPress: () => console.log("Cancel Pressed"),
                }
            ]
        );
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
    <SafeAreaView style={styles.container}>
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
              Profile
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
      <View style={styles.userInfoSection}>
        <View style={{flexDirection: 'row', marginTop: 15}}>
          <ImageBackground
            source={profilPic}
            style={{width: 80, height: 80, overflow: 'hidden', borderRadius: 90}}
            // style={{overflow: 'hidden'}}
            // imageStyle={{borderRadius: 25}}
          ></ImageBackground>
          <View style={{marginLeft: 20}}>
            <Text style={[styles.title, {
              marginTop:15,
              marginBottom: 5,
            }]}>{info.Nom}</Text>
            <Text style={styles.caption}>@{info.Nom}</Text>
          </View>
        </View>
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <MaterialIcons name="location-pin" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>Yaoundé, Cameroun</Text>
        </View>
        <View style={styles.row}>
          <MaterialIcons name="phone" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>{info.Numero}</Text>
        </View>
        <View style={styles.row}>
          <MaterialIcons name="email" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>{info.Email}</Text>
        </View>
        <TouchableOpacity style={{right: -height/4}} onPress={() => logout()}>
          <View style={styles.menuItem}>
            <MaterialIcons name="logout" color={'red'} size={25}/>
            <Text style={[styles.menuItemText, {color: 'red', marginLeft: 0}]}>Deconnexion</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={{width: width / 1.2, height: 5, backgroundColor: COLORS.primary0, borderRadius: 20, alignSelf: 'center', marginTop: -20}} />

      <View style={styles.menuWrapper}>
        {
            info.status == 'Admin' ?
            <View style={{marginTop: -10}}>
                <TouchableOpacity style={{alignSelf: 'center'}} onPress={() => {navigation.navigate('AdminPage')}}>
                    <View style={styles.menuItem}>
                    <MaterialIcons name="dashboard" color={COLORS.primary} size={30}/>
                    <Text style={{  color: 'black',
  marginLeft: 20,
  fontWeight: 'bold',
  fontSize: 25, marginLeft: 0,
  lineHeight: 30,}}>Dashboard</Text>
                    </View>
                </TouchableOpacity>


      <ScrollView style={{marginTop: -5,
    padding: 15,
    
    }}>
                        <TouchableOpacity onPress={() => {navigation.navigate('GererRam')}} style={{paddingBottom: 10}}>
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

                        <TouchableOpacity onPress={() => {}} style={{paddingBottom: 10}}>
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


                        {/* <TouchableOpacity onPress={() => {navigation.navigate('gererMail')}} style={{paddingBottom: 10}}>
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
                                </View>
                                <View style={{flexDirection: 'column'}}>
                                    <Text style={{fontSize: 30, fontWeight: 'bold', textAlign: 'center',  color: 'grey'}}>
                                        Mails
                                    </Text>
                                    <Text style={{...FONTS.body1, color: COLORS.white, alignSelf: 'flex-end'}}>
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity> */}

                    </ScrollView>
            </View>

            :
            <View>
                        <TouchableOpacity onPress={() => {}}>
          <View style={styles.menuItem}>
            <MaterialIcons name="credit-card" color={COLORS.primary} size={25}/>
            <Text style={styles.menuItemText}>Payement</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.menuItem}>
            <MaterialIcons name="share" color={COLORS.primary} size={25}/>
            <Text style={styles.menuItemText}>Partager</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <View style={styles.menuItem}>
            <MaterialIcons name="support-agent" color={COLORS.primary} size={25}/>
            <Text style={styles.menuItemText}>Aide</Text>
          </View>
        </TouchableOpacity>
            </View>
            
        }



      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
});
