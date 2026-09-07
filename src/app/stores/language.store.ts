import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKeys } from '@src/core/utils/storage.util';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface LanguageState {
  language: string;
  setLanguage: (language: string) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: 'en',
      setLanguage: (language: string) => set({ language }),
    }),
    {
      name: StorageKeys.LANGUAGE,
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
