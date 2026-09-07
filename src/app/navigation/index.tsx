import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import { Colors, navigationRef } from '@src/core';
import { HomePage } from '@src/modules';
import * as React from 'react';
import Toast, {
  BaseToast,
  BaseToastProps,
  ToastConfig,
} from 'react-native-toast-message';
import { NavigatorParamList, Screen } from './app-route-type';

const toastProps: BaseToastProps = {
  text1Style: {
    fontSize: 16,
  },
  text2Style: {
    fontSize: 12,
  },
  text2NumberOfLines: 0,
  style: {
    height: 'auto',
    paddingVertical: 10,
    paddingHorizontal: 0,
  },
};

export const toastConfig: ToastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      {...toastProps}
      style={[
        toastProps.style,
        {
          borderLeftColor: Colors.h69C779,
        },
      ]}
    />
  ),
  error: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      {...toastProps}
      style={[
        toastProps.style,
        {
          borderLeftColor: Colors.hFE6301,
        },
      ]}
    />
  ),
  warning: (props) => (
    <BaseToast
      {...props}
      {...toastProps}
      style={[
        toastProps.style,
        {
          borderLeftColor: Colors.hFFC107,
        },
      ]}
    />
  ),
};

const Stack = createNativeStackNavigator<NavigatorParamList>();

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
  animation: 'slide_from_bottom',
};

const AppNavigation = ({
  initialRouteName = Screen.Home,
}: {
  initialRouteName?: keyof NavigatorParamList;
}) => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={initialRouteName}
        screenOptions={screenOptions}
      >
        <Stack.Screen name={Screen.Home} component={HomePage} />
      </Stack.Navigator>
      <Toast config={toastConfig} />
    </NavigationContainer>
  );
};

export default AppNavigation;
