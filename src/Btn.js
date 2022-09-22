import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import React from 'react';

const {width, height} = Dimensions.get('screen');
export default function Btn({bgColor, btnLabel, textColor, Press}) {
  return (
    <TouchableOpacity
    onPress={Press}
      style={{
        backgroundColor: bgColor,
        borderRadius: 100,
        alignItems: 'center',
        width: width/1.1,
        paddingVertical: 5,
        marginVertical: 10,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
      <Text style={{color: textColor, fontSize: 25, fontWeight: 'bold'}}>
        {btnLabel}
      </Text>
    </TouchableOpacity>
  );
}
