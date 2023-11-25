import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawer from '../components/drawer/CustomDrawer';
import routes from '../constants/routes';
import {TabRoutes} from '../screens';
import {Image, TouchableOpacity, View, Text} from 'react-native';
import images from '../constants/images';
import styles from './styles';

const Drawer = createDrawerNavigator();

const CustomHeaderLeft = ({navigation}) => (
  <View style={styles.headerLeftStyle}>
    <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
      <Image style={styles.menuStyle} source={images.menu} />
    </TouchableOpacity>
    <View>
      <Text style={styles.titleStyle}>Social</Text>
    </View>
  </View>
);
const AppStack = () => {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name={routes.TAB_ROUTES}
        component={TabRoutes}
        options={({navigation}) => ({
          title: null,
          headerLeft: props => (
            <CustomHeaderLeft {...props} navigation={navigation} />
          ),
        })}
      />
    </Drawer.Navigator>
  );
};

export default AppStack;
