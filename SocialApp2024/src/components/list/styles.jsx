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
    marginEnd: 10,
  },
  deleteImage: {
    width: moderateScale(20),
    height: moderateScale(20),
    borderRadius: moderateScale(20),
    top: 25,
    right: 2,
  },
  postTitle: {
    marginHorizontal: moderateScale(10),
    fontFamily: fonts.BARLOW_BOLD,
    marginTop: moderateVerticalScale(10),
    fontSize: scale(14),
    color: colors.BLACK,
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
    fontSize: scale(12),
    color: colors.BLACK,
  },
  menuStyle: {
    width: moderateScale(90),
    height: moderateScale(70),
    backgroundColor: colors.WHITE,
    right: moderateScale(30),
    position: 'absolute',
    top: moderateScale(10),
    borderColor: colors.GRAY,
    borderWidth: 1,
    borderRadius: moderateScale(10),
  },
  menuContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: moderateScale(8),
    borderBottomWidth: 1,
    borderColor: colors.GRAY,
    paddingBottom: 10,
  },
  iconEdit: {width: 20, height: 20, marginStart: moderateScale(10)},
  editTitle: {flex: 1, marginStart: moderateScale(10)},
  deleteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: moderateScale(5),
    paddingBottom: moderateScale(10),
  },
  iconDelete: {
    width: moderateScale(20),
    height: moderateScale(20),
    marginStart: moderateScale(10),
  },
  deleteTitle: {flex: 1, marginStart: moderateScale(10)},
  postImageStyle: {
    marginHorizontal: moderateScale(10),
    paddingVertical: moderateScale(20),
  },
  postImageIcon: {width: '100%', height: moderateScale(150)},
  userReaction: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateScale(20),
  },
  iconLike: {
    width: moderateScale(20),
    height: moderateScale(20),
  },
  iconComment: {
    width: moderateScale(20),
    height: moderateScale(20),
  },
  likeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  commentsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  containerComment: {
    backgroundColor: colors.WHITE,
    paddingBottom: 20,
    marginHorizontal: 10,
    flexDirection: 'row',
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
  titleCount: {marginHorizontal: 15, color: colors.BLACK},

  buttonFollowStyle: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: colors.WHITE,
    width: '20%',
    height: moderateScale(30),
    bottom: moderateScale(20),
  },
  titleFollowStyle: {color: colors.BLACK},
});
export default styles;
