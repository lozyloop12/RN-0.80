import { StackScreenProps } from '@react-navigation/stack';
import { FC } from 'react';

export enum Screen {
  SignIn = 'SignIn',
  Home = 'Home',
}

export type NavigatorParamList = {
  [Screen.SignIn]: undefined;
  [Screen.Home]: undefined;
};

export type TypeNameScreen = keyof NavigatorParamList;

export type ScreenProps<T extends TypeNameScreen> = FC<
  StackScreenProps<NavigatorParamList, T>
>;
