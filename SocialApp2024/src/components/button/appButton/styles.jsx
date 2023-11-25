import {StyleSheet} from 'react-native';
import colors from '../../../constants/colors';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import fonts from '../../../constants/fonts';

const styles = StyleSheet.create({
  buttonStyle: {
    height: moderateScale(45),
    backgroundColor: colors.BLACK,
    width: '90%',
    borderRadius: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: moderateVerticalScale(30),
  },
  titleStyle: {
    fontSize: scale(14),
    fontFamily: fonts.BARLOW_MEDIUM,
    color: colors.WHITE,
  },
  disabledButton: {
    height: moderateScale(45),
    backgroundColor: colors.GRAY,
    width: '90%',
    borderRadius: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: moderateVerticalScale(30),
  },
});
export default styles;
