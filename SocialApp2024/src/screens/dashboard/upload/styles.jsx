import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';
import colors from '../../../constants/colors';

import {Dimensions, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  postContainer: {
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    height: Dimensions.get('window').height / 1.5,
  },
  buttonContainer: {
    height: Dimensions.get('window').height / 1.18,
    alignItems: 'flex-end',
    width: '100%',
  },
  buttonStyle: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: colors.WHITE,
    width: '20%',
  },
  titleStyle: {color: colors.BLACK},
  postImageStyle: {
    width: '90%',
    marginHorizontal: 20,
    height: 200,
    borderRadius: 10,
    position: 'absolute',
  },
  removeButton: {
    backgroundColor: colors.WHITE,
    position: 'absolute',
    alignItems: 'flex-end',
  },
  removeImage: {
    width: 20,
    height: 20,
  },
  addButtonStyle: {
    backgroundColor: colors.BLACK,
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(25),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  plusIcon: {width: 20, height: 20, tintColor: colors.WHITE},
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
