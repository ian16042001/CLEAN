import React from 'react';
import {View, Text, TouchableOpacity, Dimensions, ImageBackground, Image} from 'react-native';
// import { width } from '../utils/Dimensions';
const {width, height} = Dimensions.get("window")

import COLORS from '../constants/colors';

const { 
  MOMO,
  OM,
  profilPic,
  ww
  } = images;

import { images, icons, FONTS, SIZES } from '../constants';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function ListItem({photo, title, subTitle, userName, likes, unLike, price, onPress}) {
  return (
    <TouchableOpacity onPress={onPress} style={{
      flexDirection:'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    }}>
      <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
        <ImageBackground source={profilPic} resizeMode="cover" style={{width: 100, height: 100, borderRadius: 10, marginRight: 8, overflow: 'hidden'}}>
        <Image
            source={profilPic}
            style={{width: 100, height: 100}}
            />
        </ImageBackground>

        <View style={{width: width - 250}}>
        <Text
            numberOfLines={1}
            style={{
              color: '#333',
            //   fontFamily: 'Roboto-Medium',
              fontSize: 14,
              textTransform: 'uppercase',
              fontWeight: 'bold'
            }}>
            {title}
          </Text>
          <Text 
            numberOfLines={1}
            style={{
              color: '#333',
            //   fontFamily: 'Roboto-Medium',
              fontSize: 14,
            }}>
            {subTitle}
          </Text>
          {/* <StarRating ratings={3} reviews={rate} /> */}
          <View style={{flexDirection: 'row'}}>
            <View style={{flexDirection: 'row', marginRight: 20}}>
              <AntDesign name={"like1"} size={20} color={COLORS.primary} />
              <Text>({likes})</Text>
            </View>          
            <View style={{flexDirection: 'row'}}>
              <AntDesign name={"dislike1"} size={20} color={COLORS.primary} />
              <Text>({unLike})</Text>
            </View>
          </View>

          {/* <StarRating ratings={3} reviews={offer.likes !== undefined ? offer.likes.length : 0} /> */}
          <Text numberOfLines={1}>Nom: {userName} </Text>
        </View>
      </View>

      <TouchableOpacity onPress={onPress} style={{
        backgroundColor: COLORS.primary,
        padding:10,
        width: 100,
        borderRadius: 10,
      }}>
        <Text style={{
          color: '#fff',
          textAlign: 'center',
        //   fontFamily: 'Roboto-Medium',
          fontSize: 14,
        }}>
          {/* {isFree == 'Yes' && 'Play'}
          {isFree == 'No' && price} */}
          S'abonner
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}