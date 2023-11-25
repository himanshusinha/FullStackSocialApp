import {TouchableOpacity, Image, Text} from 'react-native';
import React from 'react';
import colors from '../../../constants/colors';
import styles from './styles';

const GenderSelectionButton = ({isSelected, onPress, imageSource}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        ...styles.buttonStyle,
        borderColor: isSelected ? colors.GREEN : colors.GRAY,
      }}>
      <Image source={imageSource} style={styles.imageStyle} />
    </TouchableOpacity>
  );
};

export default GenderSelectionButton;
