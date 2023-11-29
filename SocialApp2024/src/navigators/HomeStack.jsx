import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import routes from '../constants/routes';
import {HomeScreen} from '../screens';
import CommentsScreen from '../screens/dashboard/home/CommentsScreen';
const Stack = createNativeStackNavigator();
const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={routes.HOME} component={HomeScreen} />
      <Stack.Screen name={routes.COMMENTS} component={CommentsScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
