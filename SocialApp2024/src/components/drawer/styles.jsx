import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import fonts from '../../constants/fonts';

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  nameStyle: {
    marginTop: moderateVerticalScale(20),
    color: colors.BLACK,
    fontWeight: 'bold',
    fontSize: scale(14),
    fontWeight: 'bold',
  },
  labelStyle: {color: colors.BLACK, fontFamily: fonts.BARLOW_BOLD},
  headerContainer: {
    height: moderateScale(200),
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {
    width: moderateScale(120),
    height: moderateScale(120),
    borderRadius: moderateScale(60),
  },
  userName: {
    fontSize: scale(12),
    marginTop: moderateVerticalScale(10),
    fontFamily: fonts.BARLOW_BOLD,
    color: colors.BLACK,
  },
  userEmail: {
    fontSize: scale(14),
    fontFamily: fonts.BARLOW_SEMI_BOLD,
    color: colors.BLACK,
  },
  switchStyle: {
    transform: [{scaleX: 0.7}, {scaleY: 0.7}],
  },
  drawerItem: {marginTop: moderateVerticalScale(30)},
});
export default styles;
