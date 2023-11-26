import {View, Pressable, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import WrapperContainer from '../../../components/wrapperContainer/WrapperContainer';
import {Image} from 'react-native';
import images from '../../../constants/images';
import PickerComp from '../../../components/modal/pickerComp/PickerComp';
import AppButton from '../../../components/button/appButton/AppButton';
import styles from './styles';
import colors from '../../../constants/colors';
const UploadScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [caption, setCaption] = useState('');
  const showModal = () => {
    console.log('Show modal called');
    setModalVisible(true);
  };
  const hideModal = () => {
    console.log('Hide modal called');
    setModalVisible(false);
  };
  const setImage = imagePath => {
    console.log('Setting image:', imagePath);

    setSelectedImage(imagePath);
  };
  const handleCaptionChange = text => {
    console.log('Caption changed:', text);
    setCaption(text);
  };

  return (
    <WrapperContainer>
      <View style={styles.buttonContainer}>
        <View style={{width: '95%', marginTop: 20}}>
          <TextInput
            value={caption}
            onChangeText={handleCaptionChange}
            style={{
              height: 100,
              borderWidth: 0.5,
              borderColor: colors.GRAY,
              width: '95%',
              paddingStart: 20,
              borderRadius: 10,
            }}
            placeholder="Enter your caption"
          />
        </View>

        <View style={styles.postContainer}>
          {selectedImage !== '' && (
            <View style={{width: '100%', height: 200}}>
              <Image
                style={styles.postImageStyle}
                source={{uri: selectedImage}}
              />
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                  marginEnd: 20,
                }}>
                <TouchableOpacity
                  onPress={() => setSelectedImage('')}
                  style={{
                    backgroundColor: colors.WHITE,
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    margin: 8,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    style={{
                      width: 15,
                      height: 15,
                    }}
                    source={images.close}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
          <AppButton
            disabled={caption === '' && selectedImage === ''}
            title="Post"
            style={{
              ...styles.buttonStyle,
              backgroundColor:
                caption === '' && selectedImage === ''
                  ? colors.GRAY
                  : colors.BLACK,
            }}
            titleStyle={{
              ...styles.titleStyle,
              color:
                caption === '' && selectedImage === ''
                  ? colors.BLACK
                  : colors.WHITE,
            }}
          />
        </View>

        <View style={{flex: 1}}>
          <Pressable onPress={showModal} style={styles.addButtonStyle}>
            <Image source={images.plus} style={styles.plusIcon} />
          </Pressable>
        </View>
      </View>

      <PickerComp
        setImageCallback={setImage} // Pass the callback function to set the image
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        imageCancel={images.close}
        imageCamera={images.camera}
        imageGallery={images.gallery}
        visible={modalVisible}
        onCancel={hideModal}
        camera={'Choose from camera'}
        gallery={'Choose from gallery'}
        onRequestClose={modalVisible}
      />
    </WrapperContainer>
  );
};

export default UploadScreen;
