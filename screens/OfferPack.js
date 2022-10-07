import React, {useRef, useState, useEffect} from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Alert,
    Image,
    ImageBackground,
    ActivityIndicator,
    Dimensions,
    Platform
} from 'react-native';
// import Image from 'react-native-image-progress';
// import ProgressCircle from 'react-native-progress/Circle';
// import LottieView from 'lottie-react-native';
import { firebase } from '../firebase';
import { images } from "../constants";
const { 
  MOMO,
  OM,
  profilPic,
  ww
  } = images;

import COLORS from '../constants/colors';


  const {width, height} = Dimensions.get("window")

export default function OfferPack({navigation}) {

  const {currentUser} = firebase.auth();

    // TYPE DE PAYEMENT (MoMo/OM)
    const [modePay, setModePay] = useState('MoMo')

    // TYPE PACK (personnel, professionnel, entreprise)
    const [pack, setPack] = useState('Personnel')

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

    function buyPoints() {
        // userPoints = parseInt(info.abonnement)
        console.log(pack)
        if(pack=="Personnel"){
            setOkload(true);
            firebase.firestore()
            .collection('Users')
            .doc(currentUser.uid)
            .update({
                info: {
                    id: currentUser.uid,
                    Nom: info.Nom,
                    Email: info.Email,
                    Numero: info.Numero,
                    status: info.status,
                    // photo: info.photo,
                    abonnement: 'Personnel',
                    // profile: info.profile,
                },
                // offres: info.offres,
                // demandes: info.demandes,
                // chatRoom: info.chatRoom
            })
            .then(()=> {
                setOkload(false);
                alert("Enrollement effetuer effectuer avec sucés");
                navigation.goBack();
            })
        }

        if(pack=="Professionnel"){
            setOkload(true);
            firebase.firestore()
            .collection('Users')
            .doc(currentUser.uid)
            .update({
                info: {
                    id: currentUser.uid,
                    Nom: info.Nom,
                    Email: info.Email,
                    Numero: info.Numero,
                    status: info.status,
                    // photo: info.photo,
                    abonnement: 'Professionnel',
                },
                // offres: info.offres,
                // demandes: info.demandes,
            })
            .then(()=> {
                setOkload(false);
                alert("Enrollement effetuer effectuer avec sucés");
                navigation.goBack();
            })
        }

        if(pack=="Entreprise"){
            setOkload(true);
            firebase.firestore()
            .collection('Users')
            .doc(currentUser.uid)
            .update({
                info: {
                    id: currentUser.uid,
                    Nom: info.Nom,
                    Email: info.Email,
                    Numero: info.Numero,
                    status: info.status,
                    // photo: info.photo,
                    abonnement: 'Professionnel'
                },
                // offres: info.offres,
                // demandes: info.demandes,
            })
            .then(()=> {
                setOkload(false);
                alert("Enrollement effetuer effectuer avec sucés");
                navigation.goBack();
            })
        }
    }

  return (
      <View style={styles.container}>
                    <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 10,
          // backgroundColor: 'white'
          padding: 10,
          marginTop: 25
        }}>
          <View>
              <Text style={{fontSize: 20, color: 'black', fontWeight: 'bold'}}>
              Hello {info.Nom}.
              </Text>
              <Text style={{fontWeight: 'bold', fontSize: 30, color: COLORS.primary}}>Mode {"\n"}de Paiement.</Text>
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
        <Text style={{fontSize: 30, fontWeight: 'bold', textAlign: 'center'}}>Operateur</Text>
        <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: 'white', padding: 10}}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
                <TouchableOpacity onPress={() => {modePay!="MoMo" ? setModePay('MoMo') : null }} style={{
                    height: 150,
                    backgroundColor: modePay=="MoMo" ? "rgba(40, 116, 166, 0.6)" : 'rgba(213, 219, 219, 1)',
                    width: width/2.5,
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Image source={MOMO} resizeMode="contain" style={{width: 120, height: 150}}/>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {modePay!="OM" ? setModePay('OM') : null }} style={{
                    height: 150,
                    backgroundColor: modePay=="OM" ? "rgba(40, 116, 166, 0.6)" : 'rgba(213, 219, 219, 1)',
                    width: width/2.5,
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Image source={OM} resizeMode="contain" style={{width: 120, height: 150}}/>
                    
                </TouchableOpacity>
            </View>
        <Text style={{fontSize: 30, fontWeight: '200', textAlign: 'center', marginTop: 15}}>Packs</Text>
            <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around', padding: 10}}>
                <TouchableOpacity onPress={() => {pack!="Personnel" ? setPack('Personnel') : null }} style={{
                    width: width/1.15,
                    height: 100,
                    backgroundColor: pack=="Personnel" ? "rgba(40, 116, 166, 0.6)" : 'rgba(213, 219, 219, 1)',
                    // backgroundColor: 'rgba(213, 219, 219, 1)',
                    borderRadius: 10,
                    padding: 5
                }}>
                    <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: pack=="Personnel" ? 'white': 'black'}}>Personnel</Text>
                    <Text style={{textAlign: 'center', fontSize: 35, fontWeight: 'bold', color: pack=="Personnel" ? 'white': 'black'}}>10 000 FCFA</Text>
                    <Text style={{textAlign: 'center', fontSize: 15, fontWeight: 'bold', color: pack=="Personnel" ? 'white': 'black', textDecorationLine: 'underline'}}>Ramassage chaque vendredi</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {pack!="Professionnel" ? setPack('Professionnel') : null }} style={{
                    width: width/1.15,
                    height: 100,
                    backgroundColor: pack=="Professionnel" ? "rgba(40, 116, 166, 0.6)" : 'rgba(213, 219, 219, 1)',
                    borderRadius: 10,
                    padding: 5,
                    marginTop: 20
                }}>
                    <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: pack=="Professionnel" ? 'white': 'black'}}>Professionnel</Text>
                    <Text style={{textAlign: 'center', fontSize: 35, fontWeight: 'bold', color: pack=="Professionnel" ? 'white': 'black'}}>15 000 FCFA</Text>
                    <Text style={{textAlign: 'center', fontSize: 15, fontWeight: 'bold', color: pack=="Professionnel" ? 'white': 'black', textDecorationLine: 'underline'}}>Ramassage chaque mercredi et vendredi</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {pack!="Entreprise" ? setPack('Entreprise') : null }} style={{
                    width: width/1.15,
                    height: 100,
                    // backgroundColor: 'rgba(213, 219, 219, 1)',
                    backgroundColor: pack=="Entreprise" ? "rgba(40, 116, 166, 0.6)" : 'rgba(213, 219, 219, 1)',
                    borderRadius: 10,
                    padding: 5,
                    marginTop: 20
                }}>
                    <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: pack=="Entreprise" ? 'white': 'black'}}>Entreprise</Text>
                    <Text style={{textAlign: 'center', fontSize: 35, fontWeight: 'bold', color: pack=="Entreprise" ? 'white': 'black'}}>30 000 FCFA</Text>
                    <Text style={{textAlign: 'center', fontSize: 15, fontWeight: 'bold', color: pack=="Entreprise" ? 'white': 'black', textDecorationLine: 'underline'}}>Ramassage au planning client</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => buyPoints()} style={{
                height: 50,
                width: width/2,
                backgroundColor: COLORS.primary,
                alignSelf: 'center',
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 20
            }}>
                <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>Valider</Text>
            </TouchableOpacity>

            <View style={{height: 30}}/>
        </ScrollView>
        <Loader />
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