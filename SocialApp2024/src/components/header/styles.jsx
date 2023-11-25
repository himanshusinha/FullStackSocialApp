import {StyleSheet} from 'react-native';
import {moderateVerticalScale, scale} from 'react-native-size-matters';
import fonts from '../../constants/fonts';
import colors from '../../constants/colors';
const styles = StyleSheet.create({
  container: {
    marginBottom: moderateVerticalScale(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: scale(24),
    fontFamily: fonts.BARLOW_BOLD,
  },
  subTitle: {
    fontSize: scale(18),
    fontFamily: fonts.BARLOW_SEMI_BOLD,
    color: colors.RED,
    marginVertical: moderateVerticalScale(5),
  },
});
export default styles;
