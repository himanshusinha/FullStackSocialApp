import {View, Image} from 'react-native';
import React from 'react';
import styles from './styles';

const AppIcon = ({icon}) => {
  return (
    <View>
      <Image resizeMode="contain" source={icon} style={styles.iconStyle} />
    </View>
  );
};

export default AppIcon;
