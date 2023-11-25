import {StyleSheet} from 'react-native';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';
const styles = StyleSheet.create({
  iconStyle: {
    marginTop: moderateVerticalScale(20),
    width: moderateScale(130),
    height: moderateScale(130),
  },
});
export default styles;
