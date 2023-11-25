import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import colors from '../../../constants/colors';

const styles = StyleSheet.create({
  container: {
    borderColor: colors.GRAY,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    width: '90%',
  },
  button: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(25),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.GRAY,
  },
});
export default styles;
