import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import colors from '../../constants/colors';
import styles from './styles';

const Loader = () => {
  return (
    <View style={styles.container}>
      <View style={styles.indicatorStyle}>
        <ActivityIndicator
          size={'large'}
          color={colors.BLACK}
          style={{backgroundColor: 'transparent'}}
        />
      </View>
    </View>
  );
};

export default Loader;
