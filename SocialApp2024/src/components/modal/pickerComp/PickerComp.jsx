import React, { useState } from 'react';
import {
  View,
  Text,
  PermissionsAndroid,
  Modal,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import styles from './styles';
import ImagePicker from 'react-native-image-crop-picker';
import { androidCameraPermission } from '../../../utils/permissions';

const PickerComp = (props) => {
  const [loading, setLoading] = useState(false);

  const onGallery = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      });
      console.log(image);
      props.setImageCallback(image.path); // Pass the selected image path back to the parent
      props.onCancel(); // Hide the modal
    } catch (error) {
      console.warn(error);
    }
  };

  const onCamera = async () => {
    try {
      const image = await ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
      });
      console.log(image);
      props.setImageCallback(image.path); // Pass the selected image path back to the parent
      props.onCancel(); // Hide the modal
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <View style={styles.modalContainer}>
      <Modal
        onRequestClose={props.modalVisible}
        visible={props.visible}
        transparent={true}
        animationType="slide"
      >
        <TouchableOpacity
          onPressOut={props.onCancel}
          style={styles.modalInnerView}
          onPressIn={props.onCancel}
        >
          <View style={styles.modalImageContainer}>
            <TouchableOpacity onPress={props.onCancel} style={styles.btnCancel}>
              <Image
                resizeMode="contain"
                style={styles.imageCancel}
                source={props.imageCancel}
              />
            </TouchableOpacity>
            <View style={styles.cameraContainer}>
              <TouchableOpacity
                style={styles.btnCamera}
                onPress={() => onCamera()}
              >
                <Image
                  resizeMode="contain"
                  style={styles.imageCamera}
                  source={props.imageCamera}
                />
                <View style={{ marginHorizontal: 6 }}></View>
                <Text style={styles.cameraText}>{props.camera}</Text>
              </TouchableOpacity>
              <View style={{ marginVertical: 4 }}></View>
              <TouchableOpacity
                onPress={() => onGallery()}
                style={styles.gallerybtn}
              >
                <Image
                  resizeMode="contain"
                  style={styles.galleryImage}
                  source={props.imageGallery}
                />
                <View style={{ marginHorizontal: 5 }}></View>
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
