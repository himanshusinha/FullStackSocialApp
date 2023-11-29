import colors from '../../../constants/colors';

import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  buttonStyle: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: colors.WHITE,
    width: '20%',
    bottom: 28,
    height: 40,
    marginHorizontal: 5,
  },
  titleStyle: {color: colors.BLACK},
});
export default styles;
