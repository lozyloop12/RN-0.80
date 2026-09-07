import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKeys } from '@src/core/utils/storage.util';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AuthState {
  token: string;
  setAccessToken: (token: string) => void;
  clearTokens: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: '',
      setAccessToken: (token: string) => set({ token }),
      clearTokens: () => set({ token: '' }),
    }),
    {
      name: StorageKeys.APP_ACCESS_TOKEN,
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
