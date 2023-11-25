import * as React from 'react';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import NetInfo from '@react-native-community/netinfo';
import NoInternet from './src/components/modal/noInternet/NoInternet';
import Routes from './src/navigators/Routes';
import {store, persistor} from './src/redux/store/index';
import axios from 'axios';
import {LogBox} from 'react-native';
LogBox.ignoreAllLogs(true);
const App = () => {
  const [isOffline, setOfflineStatus] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const baseurl = 'http://192.168.1.38:8200/socialapp';
  axios.defaults.baseURL = baseurl;
  React.useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener(state => {
      const offline = !(state.isConnected && state.isInternetReachable);
      setOfflineStatus(offline);
    });
    getNetWorkInfo();
    return () => removeNetInfoSubscription();
  }, [isOffline]);

  const getNetWorkInfo = React.useCallback(() => {
    setLoading(true);
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          {isOffline ? (
            <>
              <NoInternet show={isOffline} isRetrying={loading} />
            </>
          ) : (
            <Routes />
          )}
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
