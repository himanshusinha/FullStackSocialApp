import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './styles';

const AppButton = ({title, onPress, disabled, isLoading}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.buttonStyle, disabled ? styles.disabledButton : null]}
      disabled={disabled}>
      <Text style={styles.titleStyle}>
        {isLoading ? 'Signing Up...' : title}
      </Text>
    </TouchableOpacity>
  );
};

export default AppButton;
