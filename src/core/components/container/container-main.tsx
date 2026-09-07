import { Colors, fontSize, horizontalScale } from '@src/core/utils';
import React, { PropsWithChildren } from 'react';
import {
  StatusBar,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SvgProps } from 'react-native-svg';
import { ButtonIcon } from '../button';

type Props = {
  headerShow?: boolean;
  title?: string;
  IconRight?: React.FC<SvgProps>;
  styleRight?: ViewStyle;
  onPressRight?: () => void;
  styleContainer?: StyleProp<ViewStyle>;
  onPressLeft?: () => void;
  styleContent?: ViewStyle;
  color?: string;
  styleTitle?: TextStyle;
  colorRight?: string;
  styleLeft?: ViewStyle;
};

const ContainerMain = (props: PropsWithChildren<Props>) => {
  const {
    children,
    title = '',
    headerShow = false,
    IconRight = null,
    styleRight = {},
    onPressRight = () => {},
    styleContainer = {},
    styleContent = {},
    styleTitle = {},
    colorRight = Colors.h000000,
  } = props;
  const insets = useSafeAreaInsets();
  const heightSatusbar = insets.top;

  return (
    <View
      style={[
        styles.container,
        { paddingTop: heightSatusbar },
        styleContainer,
      ]}
    >
      <StatusBar
        barStyle="dark-content"
        {...({ backgroundColor: Colors.transparent, translucent: true } as any)}
      />
      {headerShow && (
        <View style={[styles.content, styleContent]}>
          <View style={styles.viewLeft} />

          <View style={styles.viewContent}>
            <Text style={[styles.label, styleTitle]}>{title}</Text>
          </View>

          <View style={styles.viewRight}>
            {IconRight && (
              <ButtonIcon
                Icon={IconRight}
                style={styleRight}
                onPress={onPressRight}
                color={colorRight}
              />
            )}
          </View>
        </View>
      )}
      {children}
    </View>
  );
};

export default ContainerMain;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.hFFFFFF,
  },
  content: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    color: Colors.h000000,
    fontSize: fontSize(18),
    fontWeight: '500',
  },
  viewLeft: {
    flex: 1,
    paddingLeft: horizontalScale(10),
  },
  viewContent: {
    flex: 6,
    alignItems: 'center',
  },
  viewRight: {
    flex: 1,
    paddingRight: horizontalScale(10),
  },
});
