import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import routes from '../constants/routes';
import CustomDrawer from '../components/drawer/CustomDrawer';
import {HomeScreen, ProfileScreen} from '../screens';

const Drawer = createDrawerNavigator();

const DrawerStack = () => {
  return (
    <Drawer.Navigator
      screenOptions={{headerShown: false}}
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen name={routes.HOME} component={screens.HomeScreen} />
      <Drawer.Screen name={routes.PROFILE} component={ProfileScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerStack;
