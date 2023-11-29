// CommentOptionModal.js
import {View, Text, Modal, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../../../constants/colors';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import fonts from '../../../constants/fonts';
import AppButton from '../../button/appButton/AppButton';
import styles from '../updateModal/styles';
import {updateCommentByIdThunk} from '../../../redux/asyncThunk/commentAsyncThunk';
import {useDispatch} from 'react-redux';
import Loader from '../../loader/Loader';

const CommentOptionModal = ({visible, onClose, comments, onPostUpdated}) => {
  console.log(comments, '.......comments of comment option modal');
  const [comment, setComment] = useState(comments ? comments?.comment : '');
  console.log(comment, '...........comment');
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setComment(comments ? comments.comment : '');
  }, [visible]);
  console.log('.........comments id', comments);

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await dispatch(
        updateCommentByIdThunk({
          id: comments._id,
          comment: comment,
        }),
      );

      if (response.status === true) {
        console.log(response, '........response from update post');
        // Close the modal after successful update
        onPostUpdated();
        onClose(); // Close the modal in both success and failure cases
      } else {
        console.log(response, '........response error update post');
        onClose(); // Close the modal in both success and failure cases
      }
    } catch (error) {
      console.log('Failed to update post:', error);
    } finally {
      setIsLoading(false);
      onClose(); // Close the modal in both success and failure cases
    }
  };

  return (
    <View>
      {isLoading && (
        <Modal>
          <Loader />
        </Modal>
      )}
      <Modal
        onRequestClose={() => {
          onClose();
        }}
        transparent
        visible={visible}>
        <View
          style={{
            backgroundColor: 'rgba(0,0,0,0.2)',
            flex: 1,
            justifyContent: 'center',
          }}>
          <View
            style={{
              backgroundColor: colors.WHITE,
              height: 200,
              marginHorizontal: 20,
              borderRadius: 20,
            }}>
            <View style={{margin: moderateScale(20)}}>
              <Text
                style={{
                  fontFamily: fonts.BARLOW_BOLD,
                  fontSize: scale(18),
                  color: colors.BLACK,
                  alignSelf: 'center',
                }}>
                Edit Comment
              </Text>

              <TextInput
                value={comment}
                onChangeText={e => setComment(e)}
                style={{
                  marginTop: moderateVerticalScale(20),
                  borderWidth: 0.5,
                  borderColor: colors.GRAY,
                }}
                placeholder="Enter comments"
              />

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 40,
                }}>
                <AppButton
                  title={'Update'}
                  onPress={onSubmit}
                  style={styles.buttonCommentStyle}
                  titleStyle={styles.titleCommentStyle}
                />
                <AppButton
                  onPress={onClose}
                  title={'Cancel'}
                  style={[styles.buttonCommentStyle]}
                  titleStyle={styles.titleCommentStyle}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CommentOptionModal;
