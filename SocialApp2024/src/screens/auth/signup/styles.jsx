import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import colors from '../../../constants/colors';

import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  inputContainer: {
    width: '90%',
    marginVertical: moderateVerticalScale(10),
  },
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  genderButtonStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  errorText: {
    color: colors.RED,
    marginTop: moderateVerticalScale(6),
  },
  buttonStyle: {bottom: moderateScale(30)},
  gapStyle: {marginHorizontal: moderateScale(12)},
  titleStyle: {color: colors.WHITE, fontSize: scale(14)},
});
export default styles;
