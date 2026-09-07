import type { NavigationProp } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { NavigatorParamList } from '@src/app/navigation/app-route-type';

export const useAppNavigation = () => {
  return useNavigation<NavigationProp<NavigatorParamList>>();
};
