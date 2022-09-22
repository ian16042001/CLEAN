import React from 'react';
import {TextInput, Dimensions} from 'react-native';
import {darkGreen} from './Constants';

const {width, height} = Dimensions.get('screen');

const Field = props => {
  return (
    <TextInput
      {...props}
      style={{borderRadius: 100, color: darkGreen, width: '90%', backgroundColor: 'rgb(220,220, 220)', marginTop: 10, height: 50, padding: 15}}
      placeholderTextColor={darkGreen}></TextInput>
  );
};

export default Field;
