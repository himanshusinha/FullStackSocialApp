import {View, Text, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import WrapperContainer from '../../../components/wrapperContainer/WrapperContainer';
import {useDispatch} from 'react-redux';
import {getPostThunk} from '../../../redux/asyncThunk/postAsyncThunk';
import ItemPosts from '../../../components/list/ItemPosts';
import {useIsFocused} from '@react-navigation/native';

const HomeScreen = () => {
  const isFocused = useIsFocused();
  const [posts, setPosts] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    getPosts();
  }, [isFocused]);

  const getPosts = () => {
    dispatch(getPostThunk())
      .unwrap()
      .then(res => {
        setPosts(res.data.data);
        setErrorMessage('');
      })
      .catch(err => {
        setPosts([]);
        setErrorMessage(err?.data?.message);
      });
  };

  return (
    <WrapperContainer>
      {errorMessage ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>{errorMessage}</Text>
        </View>
      ) : (
        <View>
          <FlatList
            contentContainerStyle={{
              bottom: posts.length > 0 ? 10 : 0,
              top: posts.length > 0 ? 5 : 0,
            }}
            data={posts}
            renderItem={({item,index}) => <ItemPosts item={item} index={index}/>}
          />
        </View>
      )}
    </WrapperContainer>
  );
};

export default HomeScreen;
