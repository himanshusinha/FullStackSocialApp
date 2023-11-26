import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './styles';

const AppButton = ({
  title,
  onPress,
  disabled,
  isLoading,
  style,
  titleStyle,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.buttonStyle, disabled, style, titleStyle]}
      disabled={disabled}>
      <Text style={titleStyle}>{isLoading ? 'Signing Up...' : title}</Text>
    </TouchableOpacity>
  );
};

export default AppButton;
