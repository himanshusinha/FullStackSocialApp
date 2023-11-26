// PickerComp.js
import React from 'react';
import {View, Text, Modal, TouchableOpacity, Image} from 'react-native';
import styles from './styles';
import ImagePicker from 'react-native-image-crop-picker';

const PickerComp = props => {
  const {
    selectedImage,
    setSelectedImage,
    setImageFile,
    onCancel, // Corrected prop name
  } = props;

  const onGallery = async () => {
    try {
      const res = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      });

      const fileName = res.path.split('/').pop();

      const file = {
        uri: res?.path,
        type: res?.mime,
        name: fileName,
      };

      setImageFile(file);
      setSelectedImage(res?.path);
      onCancel(); // Use the onCancel prop directly
    } catch (error) {
      console.warn(error);
    }
  };

  const onCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7,
    })
      .then(res => {
        console.log(res);
        setSelectedImage(res?.path);

        const fileName = res.path.split('/').pop();

        const file = {
          uri: res?.path,
          type: res?.mime,
          name: fileName,
        };

        setImageFile(file);
        setSelectedImage(res?.path);
        onCancel(); // Use the onCancel prop directly
      })
      .catch(error => {
        console.warn(error);
      });
  };

  return (
    <View style={styles.modalContainer}>
      <Modal
        onRequestClose={onCancel} // Use the onCancel prop directly
        visible={props.visible}
        transparent={true}
        animationType="slide">
        <TouchableOpacity
          onPressOut={onCancel} // Use the onCancel prop directly
          style={styles.modalInnerView}
          onPressIn={onCancel} // Use the onCancel prop directly
        >
          <View style={styles.modalImageContainer}>
            <TouchableOpacity
              onPress={onCancel} // Use the onCancel prop directly
              style={styles.btnCancel}>
              <Image
                resizeMode="contain"
                style={styles.imageCancel}
                source={props.imageCancel}
              />
            </TouchableOpacity>
            <View style={styles.cameraContainer}>
              <TouchableOpacity
                style={styles.btnCamera}
                onPress={() => onCamera()}>
                <Image
                  resizeMode="contain"
                  style={styles.imageCamera}
                  source={props.imageCamera}
                />
                <View style={{marginHorizontal: 6}}></View>
                <Text style={styles.cameraText}>{props.camera}</Text>
              </TouchableOpacity>
              <View style={{marginVertical: 4}}></View>
              <TouchableOpacity
                onPress={() => onGallery()}
                style={styles.gallerybtn}>
                <Image
                  resizeMode="contain"
                  style={styles.galleryImage}
                  source={props.imageGallery}
                />
                <View style={{marginHorizontal: 5}}></View>
                <Text style={styles.galleryText}>{props.gallery}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default PickerComp;
