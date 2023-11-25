import {View, Text} from 'react-native';
import React from 'react';
import styles from './styles';

const Header = ({title, sub_title}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subTitle}>{sub_title}</Text>
    </View>
  );
};

export default Header;
