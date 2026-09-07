import React, { FC } from 'react';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';
import { SvgProps } from 'react-native-svg';
import { Colors, fontSize, horizontalScale, verticalScale } from '../../utils';

type Props = TouchableOpacityProps & {
  labelStyle?: StyleProp<TextStyle>;
  label: string;
  uppercase?: boolean;
  disabled?: boolean;
  loading?: boolean;
  IconRight?: FC<SvgProps>;
  IconLeft?: FC<SvgProps>;
  widthIconLeft?: number;
  heightIconLeft?: number;
  widthIconRight?: number;
  heightIconRight?: number;
  styleicon?: StyleProp<ViewStyle>;
  backgroundColor?: string;
  colorIcon?: string;
};

const ButtonPrimary = (props: Props) => {
  const {
    style = {},
    labelStyle,
    label,
    uppercase = false,
    disabled = false,
    loading = false,
    IconRight = null,
    IconLeft = null,
    widthIconLeft = horizontalScale(18),
    heightIconLeft = horizontalScale(18),
    widthIconRight = horizontalScale(18),
    heightIconRight = horizontalScale(18),
    styleicon = {},
    backgroundColor = Colors.h04B7EF,
    colorIcon = Colors.hFFFFFF,
    ...rest
  } = props;
  const buttonColor = disabled ? Colors.h93B6A1 : backgroundColor;

  return (
    <TouchableOpacity
      {...rest}
      disabled={disabled}
      activeOpacity={0.7}
      style={[styles.button, { backgroundColor: buttonColor }, style]}
    >
      {!loading ? (
        <View style={styles.row}>
          {IconLeft && (
            <IconLeft
              style={styles.icon}
              width={widthIconLeft}
              height={heightIconLeft}
              color={colorIcon}
            />
          )}

          <Text
            style={[styles.label, uppercase && styles.uppercase, labelStyle]}
          >
            {label}
          </Text>

          {IconRight && (
            <IconRight
              style={[styles.icon, styleicon]}
              width={widthIconRight}
              height={heightIconRight}
              color={colorIcon}
            />
          )}
        </View>
      ) : (
        <ActivityIndicator size="small" color={Colors.hFFFFFF} />
      )}
    </TouchableOpacity>
  );
};

export default ButtonPrimary;

const styles = StyleSheet.create({
  button: {
    height: verticalScale(50),
    borderRadius: horizontalScale(25),
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: fontSize(16),
    color: Colors.hFFFFFF,
  },
  icon: {
    marginLeft: horizontalScale(8),
  },
  uppercase: {
    textTransform: 'uppercase',
  },
});
