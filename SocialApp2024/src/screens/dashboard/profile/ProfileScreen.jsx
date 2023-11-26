import {View, Text, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import WrapperContainer from '../../../components/wrapperContainer/WrapperContainer';
import {useDispatch, useSelector} from 'react-redux';
import {getUserProfileByIdThunk} from '../../../redux/asyncThunk/authAsyncThunk';
import styles from './styles';
import AppButton from '../../../components/button/appButton/AppButton';
import {useIsFocused} from '@react-navigation/native';

const ProfileScreen = () => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const user = useSelector(state => state.auth.user);
  const id = user._id;

  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  useEffect(() => {
    getProfile();
  }, [isFocused]);

  const getProfile = () => {
    dispatch(getUserProfileByIdThunk({id: id}))
      .unwrap()
      .then(res => {
        setUserName(res?.data?.username);
        setUserEmail(res?.data?.emailId);
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
            <Text style={styles.count}>0</Text>
            <Text style={styles.followers}>Followers</Text>
          </View>
          <View style={styles.countContainer}>
            <Text style={styles.count}>0</Text>
            <Text style={styles.followers}>Following</Text>
          </View>
          <View style={styles.countContainer}>
            <Text style={styles.count}>0</Text>
            <Text style={styles.posts}>Posts</Text>
          </View>
        </View>
      </View>
    </WrapperContainer>
  );
};

export default ProfileScreen;
