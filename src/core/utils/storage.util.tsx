import AsyncStorage from '@react-native-async-storage/async-storage';

export enum StorageKeys {
  APP_ACCESS_TOKEN = 'APP_ACCESS_TOKEN',
  APP_REFRESH_TOKEN = 'APP_REFRESH_TOKEN',
  LANGUAGE = 'LANGUAGE',
}

export class AppStorageUtil {
  static setItem = async (key: string, value: any) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch {
      // ignored
    }
  };

  static getItem = async (key: string) => {
    try {
      const data: any = await AsyncStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  };

  static removeItem = async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch {
      // ignored
    }
  };

  static removeAll = async () => {
    try {
      await Promise.all([
        AppStorageUtil.removeItem(StorageKeys.APP_ACCESS_TOKEN),
        AppStorageUtil.removeItem(StorageKeys.APP_REFRESH_TOKEN),
      ]);
    } catch {
      // ignored
    }
  };
}
