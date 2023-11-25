import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import colors from '../../../constants/colors';

import {StyleSheet} from 'react-native';
import fonts from '../../../constants/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    alignItems: 'center',
    marginTop: moderateVerticalScale(80),
  },
  iconStyle: {
    width: moderateScale(80),
    height: moderateScale(80),
    borderRadius: moderateScale(40),
  },
  titleName: {
    fontSize: scale(12),
    fontFamily: fonts.BARLOW_MEDIUM,
    marginTop: moderateScale(10),
  },
  titleEmail: {
    fontSize: scale(12),
    fontFamily: fonts.BARLOW_MEDIUM,
  },
  followers: {
    fontSize: scale(12),
    fontFamily: fonts.BARLOW_MEDIUM,
  },
  countContainer: {justifyContent: 'center', alignItems: 'center'},
  count: {
    fontFamily: fonts.BARLOW_BOLD,
    color: colors.BLACK,
  },
  followers: {
    fontFamily: fonts.BARLOW_MEDIUM,
    color: colors.BLACK,
  },
  following: {
    fontFamily: fonts.BARLOW_MEDIUM,
    color: colors.BLACK,
  },
  posts: {
    fontFamily: fonts.BARLOW_MEDIUM,
    color: colors.BLACK,
  },
  buttonStyle: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: colors.WHITE,
    width: '40%',
  },
  socialContainer: {
    width: '90%',
    backgroundColor: colors.WHITE,
    flexDirection: 'row',
    marginTop: moderateVerticalScale(20),
    justifyContent: 'space-around',
  },
  titleStyle: {color: colors.BLACK},
});
export default styles;
