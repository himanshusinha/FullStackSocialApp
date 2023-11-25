import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';

const LanguageBtn = ({title, onPress}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LanguageBtn;
