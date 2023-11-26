// Import necessary dependencies and actions
import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';
import WrapperContainer from '../../../components/wrapperContainer/WrapperContainer';
import images from '../../../constants/images';
import PickerComp from '../../../components/modal/pickerComp/PickerComp';
import AppButton from '../../../components/button/appButton/AppButton';
import styles from './styles';
import colors from '../../../constants/colors';
import storage from '@react-native-firebase/storage';
import {useDispatch, useSelector} from 'react-redux';
import {addPostAsyncThunk} from '../../../redux/asyncThunk/postAsyncThunk';

const UploadScreen = () => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [caption, setCaption] = useState('');
  const [id, setId] = useState();
  const [imageFile, setImageFile] = useState(null);
  const [userName, setUserName] = useState();
  const [imageUrl, setImageUrl] = useState('');
  const user = useSelector(state => state.auth.user);
  const userId = user._id;
  const username = user.username;

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const setImage = imagePath => {
    setSelectedImage(imagePath);
  };

  const handleCaptionChange = text => {
    setCaption(text);
  };

  const handleImageFile = file => {
    setImageFile(file);
  };
  // const uploadImageToFirebase = async () => {
  //   try {
  //     if (selectedImage !== '') {
  //       console.log('Selected Image:', selectedImage.path);

  //       const reference = storage().ref(selectedImage);
  //       const pathToFile = selectedImage;

  //       // Uploads the file
  //       await reference.putFile(pathToFile);

  //       // Get the download URL
  //       const url = await reference.getDownloadURL();
  //       console.log('Download URL:', url);

  //       const formData = new FormData();
  //       formData.append('userId', userId);
  //       formData.append('caption', caption);
  //       formData.append('username', username);

  //       if (selectedImage !== '') {
  //         const fileName = selectedImage.split('/').pop();
  //         const file = {
  //           uri: url, // Use the URL, not 'reference.getDownloadURL()'
  //           type: 'image/jpeg',
  //           name: fileName,
  //         };
  //         formData.append('imageUrl', file);
  //       }

  //       // Dispatch the action with formData
  //       const response = await dispatch(addPostAsyncThunk(formData));
  //       console.log('res...........', response);

  //       // Assuming navigation is defined
  //       // navigation.navigate(Routes.LOGIN);

  //       setId(userId);
  //       setUserName(userName);
  //       setImageUrl(url);
  //       setSelectedImage(pathToFile);

  //       // Access the API response
  //       console.log('API Response:', response);
  //     } else {
  //       console.log('No selected image.');
  //     }
  //   } catch (error) {
  //     console.error('Error in uploadImageToFirebase:', error);
  //     // Handle error (log, display, etc.)
  //   }
  // };
  const uploadImageToFirebase = async () => {
    try {
      if (selectedImage !== '') {
        console.log('Selected Image:', selectedImage);

        const reference = storage().ref(selectedImage);
        const pathToFile = selectedImage;

        // Uploads the file
        await reference.putFile(pathToFile);

        const url = await reference.getDownloadURL();
        console.log('Download URL:', url);

        const formData = new FormData();
        formData.append('userId', userId);
        formData.append('caption', caption);
        formData.append('username', username);

        // Append the download URL to the formData
        formData.append('imageUrl', url);

        // Dispatch the action with formData
        const response = await dispatch(addPostAsyncThunk(formData));
        console.log('res...........', response);

        // Assuming navigation is defined
        // navigation.navigate(Routes.LOGIN);

        setId(userId);
        setUserName(userName);
        setImageUrl(url);

        // Use the local path directly for displaying the image
        setSelectedImage(pathToFile);
      } else {
        console.log('No selected image.');
      }
    } catch (error) {
      console.error('Error in uploadImageToFirebase:', error);
    }
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
            onPress={uploadImageToFirebase}
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
        setImageCallback={setImage}
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
        setImageFile={handleImageFile}
      />
    </WrapperContainer>
  );
};

export default UploadScreen;
