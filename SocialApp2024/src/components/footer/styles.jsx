import {StyleSheet} from 'react-native';
import {moderateVerticalScale, scale} from 'react-native-size-matters';
import fonts from '../../constants/fonts';
import colors from '../../constants/colors';
const styles = StyleSheet.create({
  container: {
    marginTop: moderateVerticalScale(10),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: scale(14),
    fontFamily: fonts.BARLOW_MEDIUM,
  },
  subTitle: {
    fontSize: scale(12),
    fontFamily: fonts.BARLOW_BOLD,
    color: colors.RED,
  },
});
export default styles;
