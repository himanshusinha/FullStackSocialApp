import {StyleSheet} from 'react-native';
import colors from '../../../constants/colors';
import fonts from '../../../constants/fonts';
import {moderateScale, scale} from 'react-native-size-matters';

const styles = StyleSheet.create({
  buttonStyle: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: colors.WHITE,
    width: '20%',
  },
  titleStyle: {color: colors.BLACK},
  container: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    flex: 1,
  },
  innerContainer: {
    backgroundColor: colors.WHITE,
    width: '100%',
    flex: 1,
    alignItems: 'center',
  },
  titleEditPost: {
    fontFamily: fonts.BARLOW_BOLD,
    fontSize: scale(14),
    color: colors.BLACK,
    marginHorizontal: 10,
  },
  editContainer: {flexDirection: 'row', margin: 10},
  iconClose: {width: 20, height: 20},
  captionContainer: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginTop: 10,
  },
  inputStyle: {
    height: 100,
    borderWidth: 0.5,
    borderColor: colors.GRAY,
    width: '100%',
    borderRadius: 10,
  },
  imageStyle: {
    width: '95%',
    height: 200,
    marginTop: 20,
    borderRadius: 20,
  },

  buttonCommentStyle: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: colors.WHITE,
    width: '45%',
    bottom: moderateScale(20),
  },
  titleCommentStyle: {color: colors.BLACK},
});
export default styles;
