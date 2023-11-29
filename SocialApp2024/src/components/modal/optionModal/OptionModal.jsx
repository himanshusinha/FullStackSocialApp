// OptionModal.js
import {View, Text, Modal, TouchableOpacity, Image, Alert} from 'react-native';
import React from 'react';
import colors from '../../../constants/colors';
import {moderateScale, scale} from 'react-native-size-matters';
import images from '../../../constants/images';
import fonts from '../../../constants/fonts';
 
const OptionModal = ({visible, onChooseOptions, onClose}) => {
  const handleEdit = () => {
    onChooseOptions('edit');
    onClose();
  };

  const handleDelete = () => {
    onChooseOptions('delete');
    onClose();
  };

  return (
    <Modal
      onRequestClose={() => {
        onClose();
      }}
      transparent
      visible={visible}>
      <View
        style={{
          backgroundColor: 'rgba(0,0,0,0.2)',
          flex: 1,
        }}>
        <View
          style={{
            backgroundColor: colors.WHITE,

            width: '100%',
            height: 200,
            bottom: 0,
            position: 'absolute',
            borderTopLeftRadius: moderateScale(20),
            borderTopRightRadius: moderateScale(20),
          }}>
          <View style={{margin: moderateScale(20)}}>
            <Text
              style={{
                fontFamily: fonts.BARLOW_BOLD,
                fontSize: scale(18),
                color: colors.BLACK,
              }}>
              Post options
            </Text>
            <TouchableOpacity
              onPress={handleEdit}
              style={{flexDirection: 'row', paddingVertical: 30}}>
              <Image source={images.edit} style={{width: 30, height: 30}} />
              <Text
                style={{
                  flex: 1,
                  alignSelf: 'center',
                  fontFamily: fonts.BARLOW_BOLD,
                  fontSize: scale(14),
                  marginStart: 20,
                  color: colors.BLACK,
                }}>
                Edit post
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{flexDirection: 'row'}}
              onPress={handleDelete}>
              <Image source={images.delete} style={{width: 30, height: 30}} />
              <Text
                style={{
                  flex: 1,
                  alignSelf: 'center',
                  fontFamily: fonts.BARLOW_BOLD,
                  fontSize: scale(14),
                  marginStart: 20,
                  color: colors.BLACK,
                }}>
                Delete post
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default OptionModal;
