import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {Image, View, Text} from 'react-native';
import colors from '../../constants/colors';
import styles from './styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../redux/slices/auth.slices';

const CustomDrawer = props => {
  const user = useSelector(state => state.auth.user);

  const dispatch = useDispatch();

  return (
    <DrawerContentScrollView style={styles.container} {...props}>
      <View style={styles.headerContainer}>
        <Image
          style={styles.iconStyle}
          source={{
            uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png',
          }}
        />
        <Text style={styles.userName}>{user?.username}</Text>
        <Text style={styles.userEmail}>{user?.emailId}</Text>
      </View>

      <View style={styles.drawerItem}>
        <DrawerItem
          label="Logout"
          onPress={() => {
            dispatch(logout());
          }}
          labelStyle={styles.labelStyle}
          icon={() => (
            <MaterialCommunityIcons
              name="logout"
              size={30}
              color={colors.BLACK}
              style={{marginHorizontal: 10}}
            />
          )}
        />
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;
