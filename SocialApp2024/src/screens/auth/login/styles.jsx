import {moderateVerticalScale} from 'react-native-size-matters';
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
  container: {flex: 1, alignItems: 'center'},
  errorText: {
    color: colors.RED,
    marginTop: moderateVerticalScale(6),
  },
});
export default styles;
