// utils/permissions.js

import {PermissionsAndroid, Platform} from 'react-native';

export const androidCameraPermission = async () => {
  try {
    if (Platform.OS === 'android' && Platform.Version > 22) {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      ]);

      if (
        granted['android.permission.CAMERA'] !== 'granted' ||
        granted['android.permission.WRITE_EXTERNAL_STORAGE'] !== 'granted' ||
        granted['android.permission.READ_EXTERNAL_STORAGE'] !== 'granted'
      ) {
        console.error(
          "Don't have required permission. Please allow permissions",
        );
        return false;
      }

      return true;
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
