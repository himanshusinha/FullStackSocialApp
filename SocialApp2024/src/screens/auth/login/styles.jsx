import {moderateVerticalScale} from 'react-native-size-matters';
import colors from '../../../constants/colors';

import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  inputContainer: {
    width: '90%',
    marginVertical: moderateVerticalScale(10),
  },
  container: {flex: 1, alignItems: 'center'},
  errorText: {
    color: colors.RED,
    marginTop: moderateVerticalScale(6),
    fontSize: scale(12),
  },
  titleStyle: {color: colors.WHITE, fontSize: scale(14)},
  buttonContainer: {marginTop: moderateVerticalScale(20)},
});
export default styles;
