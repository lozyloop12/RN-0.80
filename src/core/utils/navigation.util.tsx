import {
  createNavigationContainerRef,
  StackActions,
} from '@react-navigation/native';
import { NavigatorParamList, Screen } from '@src/app/navigation/app-route-type';

export const navigationRef = createNavigationContainerRef<NavigatorParamList>();

type Args<RouteName extends keyof NavigatorParamList> =
  RouteName extends unknown
    ? undefined extends NavigatorParamList[RouteName]
      ? [screen: RouteName] | [screen: RouteName, params: NavigatorParamList[RouteName]]
      : [screen: RouteName, params: NavigatorParamList[RouteName]]
    : never;

export class NavigationUtil {
  static reset(name?: Screen) {
    if (navigationRef.isReady()) {
      navigationRef.reset({
        index: 0,
        routes: [{ name: name || Screen.SignIn }],
      });
    }
  }

  static navigate<RouteName extends keyof NavigatorParamList>(
    ...args: Args<RouteName>
  ) {
    if (navigationRef.isReady()) {
      (navigationRef.navigate as any)(...args);
    }
  }

  static push<RouteName extends keyof NavigatorParamList>(
    ...args: Args<RouteName>
  ) {
    if (navigationRef.isReady()) {
      const [name, params] = args;
      navigationRef.dispatch(StackActions.push(name as string, params));
    }
  }

  static replace<RouteName extends keyof NavigatorParamList>(
    ...args: Args<RouteName>
  ) {
    if (navigationRef.isReady()) {
      navigationRef.dispatch(StackActions.replace(args[0] as string, args[1]));
    }
  }

  static pop(count?: number) {
    if (navigationRef.isReady()) {
      navigationRef.dispatch(StackActions.pop(count));
    }
  }

  static popToTop() {
    if (navigationRef.isReady()) {
      navigationRef.dispatch(StackActions.popToTop());
    }
  }

  static goBack() {
    if (navigationRef.isReady() && navigationRef.canGoBack()) {
      navigationRef.goBack();
    }
  }
}
