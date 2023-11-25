import React from 'react';
import {View, SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const WrapperContainer = ({style = {}, children}) => {
  return (
    <View
      style={{
        ...styles.container,
        ...style,
        backgroundColor: colors.WHITE,
      }}>
      <StatusBar barStyle={'dark-content'} />
      <SafeAreaView style={{flex: 1}}>{children}</SafeAreaView>
    </View>
  );
};

// Make this component available to the app
export default WrapperContainer;
