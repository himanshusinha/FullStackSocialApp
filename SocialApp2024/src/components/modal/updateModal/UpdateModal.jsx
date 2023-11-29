// UpdateModal.js
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import images from '../../../constants/images';
import AppButton from '../../button/appButton/AppButton';
import styles from './styles';
import {
  getPostThunk,
  updatePostByIdThunk,
} from '../../../redux/asyncThunk/postAsyncThunk';
import {useDispatch} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';

const UpdateModal = ({visible, post, onClose, onPostUpdated}) => {
  const [caption, setCaption] = useState(post ? post?.caption : '');
  const [imageUrl, setImageUrl] = useState(post ? post?.imageUrl : '');
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  useEffect(() => {
    setCaption(post ? post?.caption : '');
    setImageUrl(post ? post?.imageUrl : '');
  }, [visible]);

  const handleCaptionChange = text => {
    setCaption(text);
  };

  const handleCloseModal = () => {
    onClose();
  };
  const onSubmit = async () => {
    try {
      await dispatch(
        updatePostByIdThunk({
          id: post._id,
          caption: caption,
        }),
      )
        .unwrap()
        .then(res => {
          console.log(res, '........response from update post');
          // Close the modal after successful update
          handleCloseModal();
          // Refresh posts after update
          onPostUpdated();
        })
        .catch(err =>
          console.log(err, '...........response error update post'),
        );
    } catch (error) {
      console.log('Failed to update post:', error);
      handleCloseModal();
    }
  };

  return (
    <Modal onRequestClose={handleCloseModal} transparent visible={visible}>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <View>
            <View style={styles.editContainer}>
              <TouchableOpacity onPress={onClose}>
                <Image source={images.close} style={styles.iconClose} />
              </TouchableOpacity>
              <Text style={styles.titleEditPost}>Edit post</Text>
            </View>
            <View
              onPress={() => {
                handleCloseModal();
              }}
              style={styles.captionContainer}>
              <TextInput
                value={caption}
                onChangeText={handleCaptionChange}
                textAlignVertical="top"
                style={styles.inputStyle}
                placeholder="Enter your caption"
              />
            </View>
          </View>
          <Image source={{uri: imageUrl}} style={styles.imageStyle} />
          <AppButton
            title="Update Post"
            onPress={() => {
              onSubmit();
            }}
            style={styles.buttonStyle}
            titleStyle={styles.titleStyle}
          />
        </View>
      </View>
    </Modal>
  );
};

export default UpdateModal;
