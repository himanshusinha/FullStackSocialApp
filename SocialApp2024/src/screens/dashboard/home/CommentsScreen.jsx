// CommentsScreen.js
import React, {useState, useEffect, useRef} from 'react';
import {View, TextInput, FlatList, Modal} from 'react-native';
import colors from '../../../constants/colors';
import AppButton from '../../../components/button/appButton/AppButton';
import {useDispatch, useSelector} from 'react-redux';
import {useRoute} from '@react-navigation/native';
import {
  commentAsyncThunk,
  deleteComnentByIdAsyncThunk,
  getCommentIdThunk,
  getCommentsThunk,
} from '../../../redux/asyncThunk/commentAsyncThunk';
import WrapperContainer from '../../../components/wrapperContainer/WrapperContainer';
import Loader from '../../../components/loader/Loader';
import ItemComments from '../../../components/list/ItemComments';
import styles from './styles';
import CommentOptionModal from '../../../components/modal/optionModal/CommentOptionModal';

const CommentsScreen = () => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [commentList, setCommentsList] = useState([]);
  const dispatch = useDispatch();
  const routes = useRoute();
  const user = useSelector(state => state.auth.user);
  const userId = user._id;
  const username = routes?.params?.username;
  const postId = routes?.params?.postId;
  console.log(postId);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [updateData, setUpdateData] = useState('');
  const [isUpdateModalVisible, setUpdateModalVisible] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);
  const [openCommentOptions, setOpenCommentOptions] = useState(false);
  const commentListRef = useRef(commentList);
  const [listComments, setListComments] = useState([]);
  const [comment, setComment] = useState('');
  useEffect(() => {
    const currentCommentList = commentListRef.current;
    commentListRef.current = commentList;
  }, [commentList]);
  useEffect(() => {
    const currentCommentList = commentListRef.current;
    commentListRef.current = commentList;
    getCommentsById();
    getComments();
  }, []);
  const deleteComment = commentId => {
    // Update the state to remove the deleted comment
    setComments(prevComments =>
      prevComments.filter(comment => comment._id !== commentId),
    );
  };

  const handlePostUpdated = () => {
    getCommentsById();
  };
  const getCommentsById = () => {
    setIsLoading(true);
    dispatch(getCommentIdThunk({id: postId}))
      .unwrap()
      .then(res => {
        setCommentsList(res?.data); // Update commentList instead of listComments
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  };
  const getComments = () => {
    setIsLoading(true);
    dispatch(getCommentsThunk())
      .unwrap()
      .then(res => {
        setListComments(res?.data, '/////////////////get comments'); // Remove the second parameter
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  };
  const onSend = async () => {
    setIsLoading(true);
    try {
      const response = await dispatch(
        commentAsyncThunk({
          userId: userId,
          postId: postId,
          comment: comment,
          username: username,
        }),
      );

      if (response && response.status === true) {
        // Update the state with the new comment
        setCommentsList(prevComments => [...prevComments, response.data]);
        setComments('');
        setUpdateModalVisible(true);
        onClose();
        setIsLoading(false);
      } else {
        setIsLoading(false);
        onClose();
      }
    } catch (error) {
      setIsLoading(false);
      onClose();
    }
  };

  return (
    <WrapperContainer>
      {isLoading && (
        <Modal>
          <Loader />
        </Modal>
      )}
      <View style={{flex: 1, marginHorizontal: 10}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={commentList}
          renderItem={({item}) => {
            return (
              <ItemComments
                item={item}
                onPressThreeDots={() => {
                  setSelectedPostId(item._id);
                  setComment(item.comment);
                  setOpenCommentOptions(true);
                }}
                onDeleteComment={deleteComment}
              />
            );
          }}
          keyExtractor={item => item._id.toString()}
          contentContainerStyle={{flexGrow: 1, paddingBottom: 10}}
        />
        <View
          style={{
            borderWidth: 0.5,
            borderColor: colors.GRAY,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 10,
            marginHorizontal: 10,
            borderRadius: 10,
            height: 55,
          }}>
          <TextInput
            value={comment}
            onChangeText={txt => setComment(txt)}
            placeholder={'Enter your comment'}
            style={{
              flex: 1,
              marginRight: 10,
              padding: 5,
            }}
          />
          <AppButton
            disabled={comment === ''}
            title="Send"
            onPress={onSend}
            style={{
              ...styles.buttonStyle,
              backgroundColor: comment === '' ? colors.GRAY : colors.BLACK,
            }}
            titleStyle={{
              ...styles.titleStyle,
              color: comment === '' ? colors.BLACK : colors.WHITE,
            }}
          />
        </View>
      </View>
      <CommentOptionModal
        visible={openCommentOptions}
        comments={commentList.find(item => item._id === selectedPostId)}
        onClose={() => {
          setOpenCommentOptions(false);
        }}
        onPostUpdated={handlePostUpdated}
      />
    </WrapperContainer>
  );
};

export default CommentsScreen;
