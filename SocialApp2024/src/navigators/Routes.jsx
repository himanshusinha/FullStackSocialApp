import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import routes from '../constants/routes';
import {useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createNativeStackNavigator();

export default function Routes() {
  const user = useSelector(state => state.auth.user);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {user ? (
          <Stack.Screen name={routes.HOME} component={AppStack} />
        ) : (
          <Stack.Screen name={routes.SPLASH} component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
