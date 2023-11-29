import {View, Text, Image, TouchableOpacity, Modal} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import images from '../../constants/images';
import {useNavigation} from '@react-navigation/native';
import routes from '../../constants/routes';
import {useDispatch, useSelector} from 'react-redux';
import {
  followUserByIdAsyncThunk,
  getCommentIdThunk,
  getCommentsThunk,
} from '../../redux/asyncThunk/commentAsyncThunk';
import {getPostThunk} from '../../redux/asyncThunk/postAsyncThunk';
import AppButton from '../button/appButton/AppButton';
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
const ItemPosts = ({item, onClickOptions, onClickLikes}) => {
  const timeAgo = calculateTimeDifference(item.createdAt);
  const likes = item.likes || [];
  const comments = item.comments || [];
  const navigation = useNavigation();
  const [commentList, setCommentsList] = useState([]);
  const [posts, setPosts] = useState([]);
  console.log(commentList, '......comment list in list post');
  const user = useSelector(state => state.auth.user);
  const [isLoading, setIsLoading] = useState(false);
  const [listIds, setListIds] = useState([]);
  console.log(listIds, '.........listisds');
  const postId = user.postId;
  const dispatch = useDispatch();
  useEffect(() => {
    getCommentsById();
    getPosts();
  }, [postId, isFollowing]);
  console.log(posts, '.......posts');
  const isFollowing = user.following.includes(item.userId);

  const getPosts = async () => {
    dispatch(getPostThunk())
      .unwrap()
      .then(res => {
        // Extract post IDs from the response data
        const postIds = res.data.data.map(post => post._id);
        setListIds(postIds);
        // Now, postIds contains an array of all post IDs
        console.log(postIds, '........post idsss');

        setPosts(res.data.data);
      })
      .catch(err => {
        console.error(err);
      });
  };

  const getCommentsById = () => {
    dispatch(getCommentIdThunk({id: postId}))
      .unwrap()
      .then(res => {
        console.log(res?.data, '.......get comment by id');
        setCommentsList(res?.data);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const handleFollowUser = async () => {
    try {
      await dispatch(followUserByIdAsyncThunk({id: item.userId}))
        .unwrap()
        .then(res => {
          console.log(res?.data, 'user followed');
          getPosts();
        })
        .catch(err => {
          console.log(err);
        });
      // Add any additional logic you need after successful follow
    } catch (error) {
      console.error('Error following user:', error);
      // Handle the error, show an alert, etc.
    }
  };

  return (
    <View>
      <View style={styles.postContainer}>
        <View style={styles.postStyle}>
          <Image
            style={styles.postImage}
            source={{
              uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png',
            }}
          />
          <View style={styles.posts}>
            <Text style={styles.postTitle}>{item.caption}</Text>
            <Text style={styles.createdTitle}>{timeAgo}</Text>
          </View>
          {user.id !== item.userId && (
            <AppButton
              onPress={handleFollowUser}
              title={isFollowing ? 'Following' : 'Follow'}
              style={styles.buttonFollowStyle}
              titleStyle={styles.titleFollowStyle}
            />
          )}
          {user._id === item.userId && (
            <TouchableOpacity onPress={() => onClickOptions()}>
              <Image
                style={{width: 20, height: 20, top: 12}}
                source={images.dots}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.postImageStyle}>
          <Image
            resizeMode="cover"
            style={styles.postImageIcon}
            source={{uri: item.imageUrl}}
          />
        </View>
        <Text style={styles.captionTitle}>{item.caption}</Text>
        <View style={styles.userReaction}>
          <TouchableOpacity
            onPress={() => onClickLikes(likePostById(item))}
            style={styles.likeContainer}>
            <Image style={styles.iconLike} source={images.like} />
            <Text style={styles.titleCount}>{item.likes.length} Likes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(routes.COMMENTS, {
                userId: item.userId,
                postId: item._id,
                username: item.username,
                comments: item.comments,
              });
            }}
            style={styles.commentsContainer}>
            <Image style={styles.iconLike} source={images.comment} />
            <Text style={styles.titleCount}>
              {item.comments.length} Comments
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ItemPosts;
