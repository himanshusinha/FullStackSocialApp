// Import necessary dependencies and actions
import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Pressable,
  Modal,
} from 'react-native';
import WrapperContainer from '../../../components/wrapperContainer/WrapperContainer';
import images from '../../../constants/images';
import PickerComp from '../../../components/modal/pickerComp/PickerComp';
import AppButton from '../../../components/button/appButton/AppButton';
import styles from './styles';
import colors from '../../../constants/colors';
import storage from '@react-native-firebase/storage';
import {useDispatch, useSelector} from 'react-redux';
import {
  addPostAsyncThunk,
  getPostByIdAsyncThunk,
} from '../../../redux/asyncThunk/postAsyncThunk';
import Loader from '../../../components/loader/Loader';
import {useNavigation} from '@react-navigation/native';

const UploadScreen = () => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [caption, setCaption] = useState('');
  const [id, setId] = useState();
  const [imageFile, setImageFile] = useState(null);
  const [userName, setUserName] = useState();
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const user = useSelector(state => state.auth.user);
  const userId = user._id;
  const username = user.username;
  const [postCount, setPostCount] = useState(0);

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

  const uploadImageToFirebase = async () => {
    setIsLoading(true);
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

        formData.append('imageUrl', url);

        const response = await dispatch(addPostAsyncThunk(formData))
          .unwrap()
          .then(res => {
            setId(userId);
            setUserName(userName);
            setImageUrl(url);
            setIsLoading(false);
          })
          .catch(err => console.log(err));
        setId(userId);
        setUserName(userName);
        setImageUrl(url);
        setIsLoading(false);
        setSelectedImage(pathToFile);
        navigation.navigate('HomeScreen');
      } else {
        console.log('No selected image.');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error in uploadImageToFirebase:', error);
      setIsLoading(false);
    }
  };

  return (
    <WrapperContainer>
      {isLoading ? (
        <Modal transparent={true}>
          <Loader />
        </Modal>
      ) : null}
      <View style={styles.buttonContainer}>
        <View style={{width: '95%', marginTop: 20}}>
          <TextInput
            value={caption}
            onChangeText={handleCaptionChange}
            textAlignVertical="top"
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
          <Pressable
            disabled={caption === '' && selectedImage === ''}
            onPress={showModal}
            style={{
              ...styles.addButtonStyle,
              backgroundColor:
                caption === '' && selectedImage === ''
                  ? colors.GRAY
                  : colors.BLACK,
            }}>
            <Image
              source={images.plus}
              style={{
                ...styles.plusIcon,
                tintColor:
                  caption === '' && selectedImage === ''
                    ? colors.BLACK
                    : colors.WHITE,
              }}
            />
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
