import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, View} from 'react-native';
import routes from '../constants/routes';
import colors from '../constants/colors';
import images from '../constants/images';
import styles from './styles';
import {HomeScreen, ProfileScreen, UploadScreen} from '../screens';
import HomeStack from './HomeStack';

const Tab = createBottomTabNavigator();

const TabRoutes = () => {
  return (
    <Tab.Navigator
      initialRouteName={routes.HOME}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.BLACK,
        tabBarInactiveTintColor: colors.GRAY,
        tabBarShowLabel: false,
        tabbarhideonkeyboard: true,
      }}>
      {/* Home TabBar */}
      <Tab.Screen
        name={routes.HOME}
        component={HomeStack}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={[{backgroundColor: focused ? colors.WHITE : null}]}>
              <Image
                style={[
                  styles.imageStyle,
                  {tintColor: focused ? colors.BLACK : colors.GRAY},
                ]}
                source={images.home}
              />
            </View>
          ),
        }}
      />

      {/* Upload TabBar */}
      <Tab.Screen
        name={routes.UPLOAD}
        component={UploadScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={[{backgroundColor: focused ? colors.WHITE : null}]}>
              <Image
                style={[
                  styles.imageStyle,
                  {tintColor: focused ? colors.BLACK : colors.GRAY},
                ]}
                source={images.upload}
              />
            </View>
          ),
        }}
      />

      {/* Profile TabBar */}
      <Tab.Screen
        name={routes.PROFILE}
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={[{backgroundColor: focused ? colors.WHITE : null}]}>
              <Image
                style={[
                  styles.imageStyle,
                  {tintColor: focused ? colors.BLACK : colors.GRAY},
                ]}
                source={images.account}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabRoutes;
