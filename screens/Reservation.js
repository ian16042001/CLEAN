import React, {useState, useEffect, useRef} from 'react';
import {
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Switch,
  FlatList,
  Image,
  Platform,
  Dimensions

} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import COLORS from '../constants/colors';
import { MaterialIcons } from '@expo/vector-icons';
import hotels from '../constants/hotels';
const {width, height} = Dimensions.get('screen');
// import { Modalize } from 'react-native-modalize';

// TODO: 
// BOOKING date and period
// Ticket reservation
// Email after reservation.
// Change theme color to Buca voyage

const Reservation = ({navigation, route}) => {
  const item = route.params;



  const [isInTown, setInTown] = useState(true);
  const toggleSwitchInTown = () => setInTown(previousState => !previousState);

  const [choosenHotel, SetChoosenHotel] = useState('')

  const [isLogded, setLogded] = useState(false);
  const toggleSwitchLogded = () => setLogded(previousState => !previousState);

  const [isGuide, setGuide] = useState(true);
  const toggleSwitchGuide = () => setGuide(previousState => !previousState);

  const TopHotelCard = ({hotel}) => {
    return (
      <TouchableOpacity onPress={() => SetChoosenHotel(hotel.name)} style={style.topVilleCard}>
        <View
          style={{
            position: 'absolute',
            top: 5,
            right: 5,
            zIndex: 1,
            flexDirection: 'row',
          }}>
          <MaterialIcons name="star" size={15} color={COLORS.orange} />
          <Text style={{color: COLORS.white, fontWeight: 'bold', fontSize: 15}}>
            5.0
          </Text>
        </View>
        <Image style={style.topVilleCardImage} source={hotel.image} />
        <View style={{paddingVertical: 5, paddingHorizontal: 10}}>
          <Text style={{fontSize: 10, fontWeight: 'bold'}}>{hotel.name}</Text>
          <Text style={{fontSize: 7, fontWeight: 'bold', color: COLORS.grey}}>
            {hotel.location}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };


  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(true);
  const [text, setText] = useState('Empty');

  const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      setDate(currentDate);

      let tempDate = new Date(currentDate);
      let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
      let fTime = 'Heures: ' + tempDate.getHours() + ' | Minutes: ' + tempDate.getMinutes();
      setText(fDate+ '\n' + fTime);

      console.log(fDate + '\n' + fTime);
  }

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        backgroundColor: COLORS.white,
        paddingBottom: 20,
        // flex: 1,
        height: height+200,
      }}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="rgba(0,0,0,0)"
      />
      <ImageBackground style={style.headerImage} source={item.image}>
        <View style={style.header}>
          <MaterialIcons
            name="arrow-back-ios"
            size={28}
            color={COLORS.white}
            onPress={navigation.goBack}
          />
          <MaterialIcons name="bookmark-border" size={28} color={COLORS.white} />
        </View>
      </ImageBackground>
      <View>
        <View style={style.iconContainer}>
          <MaterialIcons name="place" color={COLORS.white} size={28} />
        </View>
        <View style={{marginTop: 20, paddingHorizontal: 20, marginBottom: 10}}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>{item.name}</Text>
          <Text
            style={{
              fontSize: 12,
              fontWeight: '400',
              color: COLORS.grey,
              marginTop: 5,
            }}>
            {item.location}
          </Text>
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row'}}>
              <View style={{flexDirection: 'row'}}>
                <MaterialIcons name="star" size={20} color={COLORS.orange} />
                <MaterialIcons name="star" size={20} color={COLORS.orange} />
                <MaterialIcons name="star" size={20} color={COLORS.orange} />
                <MaterialIcons name="star" size={20} color={COLORS.orange} />
                <MaterialIcons name="star" size={20} color={COLORS.grey} />
              </View>
              <Text style={{fontWeight: 'bold', fontSize: 18, marginLeft: 5}}>
                4.0
              </Text>
            </View>
            <Text style={{fontSize: 13, color: COLORS.grey}}>365reviews</Text>
          </View>
          <View style={{marginTop: 20}}>
            <Text style={{lineHeight: 20, color: COLORS.primary, alignSelf: 'center', textAlign: 'center', fontWeight: 'bold', fontSize: 19}}>
              Formulaire d'enrollement {item.name}
            </Text>
          </View>
        </View>
        

        <View
            style={{
            marginTop: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingLeft: 20,
            alignItems: 'center',
            }}>
            <Text style={{fontSize: 20, marginLeft: 15, fontWeight: 'bold', color: COLORS.orange}}>
            Ramassage
            </Text>
            <View style={style.priceTag}>
            <Text
                style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: COLORS.grey,
                marginLeft: 5,
                }}>
                payement
            </Text>
            <Text
                style={{
                fontSize: 12,
                fontWeight: 'bold',
                color: COLORS.grey,
                marginLeft: 5,
                }}>
                / mois
            </Text>
            </View>
        </View>
        


  

            <View>
                {/* Top villes */}
                <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginHorizontal: 20,
                    marginTop: 10
                }}>
                <Text style={{fontWeight: 'bold', color: COLORS.grey}}>
                    Groupe de rammassage
                </Text>
                <Text style={{color: COLORS.primary, textDecorationLine: 'underline'}}>{choosenHotel}</Text>
                </View>
                <FlatList
                data={hotels}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingLeft: 20,
                    marginTop: 10,
                    paddingBottom: 30,
                }}
                renderItem={({item}) => <TopHotelCard hotel={item} />}
                />
          </View>


        <TouchableOpacity onPress={() => navigation.navigate('OfferPack')} style={style.btn}>
          <Text style={{color: COLORS.white, fontSize: 18, fontWeight: 'bold'}}>
            Confirmer mon enrollement
          </Text>
        </TouchableOpacity>
      </View>
      {/* <Modalize ref={modalizeRef}></Modalize> */}
    </ScrollView>
  );
};

const style = StyleSheet.create({
  btn: {
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: COLORS.primary,
    marginHorizontal: 20,
    borderRadius: 10,
  },

  priceTag: {
    height: 40,
    alignItems: 'center',
    marginLeft: 40,
    paddingLeft: 20,
    flex: 1,
    backgroundColor: COLORS.secondary,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    flexDirection: 'row',
  },
  iconContainer: {
    position: 'absolute',
    height: 60,
    width: 60,
    backgroundColor: COLORS.primary,
    top: -30,
    right: 20,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerImage: {
    height: 400,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    overflow: 'hidden',
  },
  header: {
    marginTop: 60,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    justifyContent: 'space-between',
  },
  topVilleCard: {
    height: 120,
    width: 120,
    backgroundColor: COLORS.white,
    elevation: 15,
    marginHorizontal: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 15 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 20,
  },
  topVilleCardImage: {
    height: 80,
    width: '100%',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
});

export default Reservation;
