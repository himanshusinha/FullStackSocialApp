import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './styles';

const Footer = ({title, sub_title, onPress}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.subTitle}>{sub_title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
