import {View, Text, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import WrapperContainer from '../../../components/wrapperContainer/WrapperContainer';
import {useDispatch, useSelector} from 'react-redux';
import {getUserProfileByIdThunk} from '../../../redux/asyncThunk/authAsyncThunk';
import {
  getPostByIdAsyncThunk,
  getPostThunk,
} from '../../../redux/asyncThunk/postAsyncThunk'; // Import the post thunk
import styles from './styles';
import AppButton from '../../../components/button/appButton/AppButton';
import {useIsFocused} from '@react-navigation/native';

const ProfileScreen = () => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [postCount, setPostCount] = useState(0);
  console.log(postCount, '......post count');
  const [postIds, setPostIds] = useState('');
  console.log(postIds, '.......posts isds');
  const [posts, setPosts] = useState([]);
  const user = useSelector(state => state.auth.user);
  const id = user._id;
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  useEffect(() => {
    getProfile();
    getPostsById();
    getPosts();
  }, [isFocused]);
  const getPosts = async () => {
    try {
      const response = await dispatch(getPostByIdAsyncThunk({id: id}));
      const posts = response?.payload?.data;

      // Check if posts is defined before setting state
      if (Array.isArray(posts)) {
        setUserPosts(posts);
        setPostCount(posts.length);
      } else {
        console.error('Invalid response format:', response);
      }
    } catch (err) {
      console.error('Error fetching posts by ID:', err);
    }
  };

  const getPostsById = async () => {
    try {
      console.log('Fetching posts by ID...');
      const response = await dispatch(getPostByIdAsyncThunk({id: id}));
      console.log('Response:', response);

      const userPosts = response?.payload?.data;

      // Check if userPosts is defined before mapping
      if (Array.isArray(userPosts)) {
        const userPostIds = userPosts.map(post => post._id);

        // Now, userPostIds contains an array of post IDs for the specific user
        console.log('User Post IDs:', userPostIds);

        // Set postCount to the length of the user's posts array
        setPostCount(userPostIds);
      } else {
        // Handle the case where data is not an array (or is undefined)
        console.error('Invalid response format:', response);
      }
    } catch (err) {
      console.error('Error fetching posts by ID:', err);
    }
  };

  const getProfile = () => {
    dispatch(getUserProfileByIdThunk({id: id}))
      .unwrap()
      .then(res => {
        setUserName(res?.data?.username);
        setUserEmail(res?.data?.emailId);
        setFollowersCount(res?.data?.followers.length || 0);
        setFollowingCount(res?.data?.following.length || 0);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <WrapperContainer>
      <View style={styles.container}>
        <Image
          style={styles.iconStyle}
          source={{
            uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png',
          }}
        />
        <Text style={styles.titleName}>{userName}</Text>
        <Text style={styles.titleEmail}>{userEmail}</Text>
        <AppButton
          title="Edit Profile"
          style={styles.buttonStyle}
          titleStyle={styles.titleStyle}
          onPress={() => {}}
        />

        <View style={styles.socialContainer}>
          <View style={styles.countContainer}>
            <Text style={styles.count}>{followersCount}</Text>
            <Text style={styles.followers}>Followers</Text>
          </View>
          <View style={styles.countContainer}>
            <Text style={styles.count}>{followingCount}</Text>
            <Text style={styles.followers}>Following</Text>
          </View>
          <View style={styles.countContainer}>
            <Text style={styles.count}>{postCount}</Text>
            <Text style={styles.posts}>Posts</Text>
          </View>
        </View>
      </View>
    </WrapperContainer>
  );
};

export default ProfileScreen;
