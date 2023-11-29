import {View, Text, Image, TouchableOpacity, Modal} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import {scale} from 'react-native-size-matters';
import fonts from '../../constants/fonts';
import colors from '../../constants/colors';
import images from '../../constants/images';
import {useDispatch, useSelector} from 'react-redux';
import {deleteComnentByIdAsyncThunk} from '../../redux/asyncThunk/commentAsyncThunk';
import Loader from '../loader/Loader';

const calculateTimeDifference = createdAt => {
  const now = new Date();
  const createdAtDate = new Date(createdAt);
  const timeDifference = now - createdAtDate;
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  if (days > 1) {
    return `${days} days ago`;
  } else if (days === 1) {
    return 'yesterday';
  } else if (hours > 1) {
    return `${hours} hours ago`;
  } else if (hours === 1) {
    return 'an hour ago';
  } else if (minutes > 1) {
    return `${minutes} minutes ago`;
  } else if (minutes === 1) {
    return 'a minute ago';
  } else {
    return 'just now';
  }
};

const ItemComments = ({item, onPressThreeDots, onDeleteComment}) => {
  console.log(item._id);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const timeAgo = calculateTimeDifference(item.createdAt);
  const user = useSelector(state => state.auth.user);
  useEffect(() => {
    // handleCommentDeletePostById();
  }, []);

  const handleCommentDeletePostById = () => {
    setIsLoading(true);
    const commentId = item._id;

    dispatch(deleteComnentByIdAsyncThunk({id: commentId}))
      .unwrap()
      .then(res => {
        setIsLoading(false);
        onDeleteComment(commentId);
      })
      .catch(err => {
        if (err.response && err.response.status === 401) {
          setIsLoading(false);
          setOpenOptions(false);
        } else {
          setIsLoading(false);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <View>
      {isLoading ? (
        <Modal transparent={true}>
          <Loader />
        </Modal>
      ) : null}
      <View style={styles.containerComment}>
        <Image
          style={{width: 50, height: 50, margin: 10, borderRadius: 25}}
          source={{
            uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png',
          }}
        />

        <View style={[styles.posts]}>
          <Text
            style={{
              fontSize: scale(16),
              fontFamily: fonts.BARLOW_BOLD,
              color: colors.BLACK,
              marginTop: 5,
            }}>
            {item.username}
          </Text>
          <Text style={{fontSize: scale(12), fontFamily: fonts.BARLOW_MEDIUM}}>
            {timeAgo}
          </Text>
          <Text
            style={{fontSize: scale(12), fontFamily: fonts.BARLOW_SEMI_BOLD}}>
            {item.comment}
          </Text>
        </View>
        <View>
          {user._id === item.userId && (
            <View>
              <TouchableOpacity
                onPress={() => {
                  onPressThreeDots(item);
                }}>
                <Image style={styles.dotImage} source={images.dots} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handleCommentDeletePostById();
                }}>
                <Image style={styles.deleteImage} source={images.delete} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default ItemComments;
