import {StyleSheet} from 'react-native';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import colors from '../../../constants/colors';
import fonts from '../../../constants/fonts';

const styles = StyleSheet.create({
  imageStyle: {width: moderateScale(40), height: moderateScale(40)},
  buttonStyle: {
    height: moderateScale(100),
    width: moderateScale(160),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderRadius: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default styles;
