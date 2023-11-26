import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';
import {Platform} from 'react-native';
import fonts from '../../constants/fonts';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: colors.WHITE,
    paddingBottom: 20,
    marginHorizontal: 10,
    marginTop: moderateVerticalScale(10),
    ...Platform.select({
      android: {
        elevation: 2,
      },
      ios: {
        shadowColor: colors.BLACK,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.3,
        shadowRadius: 2,
      },
      flexDirection: 'row',
      justifyContent: 'space-between',
    }),
  },
  postStyle: {flexDirection: 'row', paddingHorizontal: 10},
  postImage: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    marginTop: 10,
  },
  dotImage: {
    width: moderateScale(20),
    height: moderateScale(20),
    borderRadius: moderateScale(20),
    marginTop: 10,
  },
  postTitle: {
    marginHorizontal: moderateScale(10),
    fontFamily: fonts.BARLOW_BOLD,
    marginTop: moderateVerticalScale(10),
    fontSize: scale(14),
  },
  createdTitle: {
    fontFamily: fonts.BARLOW_MEDIUM,
    marginHorizontal: moderateScale(10),
    fontSize: scale(10),
    color: colors.LIGHTGRAY,
  },
  posts: {flex: 1},
  captionTitle: {
    marginHorizontal: moderateScale(10),
    fontFamily: fonts.BARLOW_BOLD,
    fontSize: scale(10),
    marginTop: 20,
  },
});
export default styles;
