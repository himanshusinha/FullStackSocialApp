import {View, Text, FlatList, Modal, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import WrapperContainer from '../../../components/wrapperContainer/WrapperContainer';
import {useDispatch} from 'react-redux';
import {
  deletePostByIdAsyncThunk,
  getPostThunk,
} from '../../../redux/asyncThunk/postAsyncThunk';
import ItemPosts from '../../../components/list/ItemPosts';
import OptionModal from '../../../components/modal/optionModal/OptionModal';
import UpdateModal from '../../../components/modal/updateModal/UpdateModal';
import Loader from '../../../components/loader/Loader';

const HomeScreen = () => {
  const [posts, setPosts] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [openOptions, setOpenOptions] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null); // Track the selected post ID
  const [updateData, setUpdateData] = useState('');
  const [isUpdateModalVisible, setUpdateModalVisible] = useState(false); // New state
  const [isLoading, setIsLoading] = useState(false);
  const [commentList, setCommentsList] = useState([]);
  const [postIds, setPostIds] = useState();
  console.log(postIds, '........postsids');
  console.log(commentList, '........commentlist');
  const dispatch = useDispatch();
  useEffect(() => {
    getPosts();
  }, []);
  const getPosts = async () => {
    setIsLoading(true);
    dispatch(getPostThunk())
      .unwrap()
      .then(res => {
        const postsData = res.data.data;

        if (Array.isArray(postsData)) {
          const postIds = postsData.map(post => post._id);
          setPosts(postsData);
          setErrorMessage('');
        } else {
          setErrorMessage('Invalid response format');
        }

        setIsLoading(false);
      })
      .catch(err => {
        setErrorMessage(err?.data?.message);
        setIsLoading(false);
      });
  };
  const handlePostUpdated = () => {
    getPosts();
  };
  const handleDeletePostById = option => {
    setIsLoading(true);
    if (option === 'delete') {
      dispatch(deletePostByIdAsyncThunk({id: selectedPostId}))
        .unwrap()
        .then(res => {
          setIsLoading(false);
        })
        .catch(err => {
          if (err.response && err.response.status === 401) {
            setIsLoading(false);
          } else {
            setIsLoading(false);
          }
        })
        .finally(() => {
          setOpenOptions(false);
          setIsLoading(false);
        });
    } else if (option === 'edit') {
      const selectedPost = posts.find(post => post._id === selectedPostId);
      setUpdateData(selectedPost);
      setUpdateModalVisible(true);
      setIsLoading(false);
    }
  };

  const hideUpdateModal = () => {
    setUpdateData(null);
    setUpdateModalVisible(false);
  };
  const handleFollowUser = async userId => {
    try {
      await dispatch(followUserByIdAsyncThunk({id: userId}));
      // Additional logic after successful follow
      getPosts(); // Refresh posts after following
    } catch (error) {
      console.error('Error following user:', error);
    }
  };

  return (
    <WrapperContainer>
      {isLoading ? (
        <Modal transparent={true}>
          <Loader />
        </Modal>
      ) : null}
      {errorMessage ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>{errorMessage}</Text>
        </View>
      ) : (
        <View>
          <FlatList
            data={posts}
            renderItem={({item, index}) => (
              <ItemPosts
                item={item}
                index={index}
                onClickOptions={() => {
                  setOpenOptions(true);
                  setSelectedPostId(item._id);
                }}
                onClickLikes={() => {
                  likePosts(item);
                }}
                onFollow={() => {
                  handleFollowUser(item.userId);
                }}
              />
            )}
          />
          <OptionModal
            visible={openOptions} // Use openOptions instead of visible
            onClose={() => {
              setOpenOptions(false);
            }}
            onChooseOptions={handleDeletePostById}
            onPostUpdated={handlePostUpdated}
          />
          <UpdateModal
            visible={isUpdateModalVisible}
            post={updateData}
            onClose={() => {
              setUpdateData(null);
              hideUpdateModal();
            }}
            onChooseOptions={() => {}}
            onPostUpdated={handlePostUpdated}
          />
        </View>
      )}
    </WrapperContainer>
  );
};

export default HomeScreen;
