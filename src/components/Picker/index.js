import React from 'react';
import { View, Text } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';


import { styles } from './styles';

export default function Picker(props) {

  const placeholder = {
    label: 'Selecione uma moeda...',
    value: null,
    color: '#000'
  }

 return (
  <View style={styles.areaPicker}>
    <RNPickerSelect
      placeholder={placeholder}
      onValueChange={(valor) => props.onChange(valor)}
      style={{
        inputIOS:{
          fontSize: 20,
          color: '#0000',
        },
        inputAndroid:{
          fontSize: 20,
        },
      }}
      items={props.moedas}
    />
  </View>
   
  );
}