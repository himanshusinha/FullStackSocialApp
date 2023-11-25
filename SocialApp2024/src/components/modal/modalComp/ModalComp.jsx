import React, {Children, Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';

const ModalComp = ({
  children,
  isVisible = false,
  onBackdropPress = () => {},
  style = {},
  ...props
}) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onBackdropPress}
      style={{...styles.style, ...style}}
      {...props}>
      {children}
    </Modal>
  );
};
const styles = StyleSheet.create({
  style: {},
});

export default ModalComp;
