import { Colors, horizontalScale } from '@src/core/utils';
import React from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import { SvgProps } from 'react-native-svg';

interface ButtonProps {
  Icon: React.FC<SvgProps>;
  style?: StyleProp<ViewStyle>;
  color?: string;
  height?: number;
  width?: number;
  onPress?: () => void;
  styleIcon?: StyleProp<ViewStyle>;
}

const ButtonIcon = (props: ButtonProps) => {
  const {
    Icon,
    style = {},
    color = Colors.h000000,
    height = horizontalScale(24),
    onPress,
    width = horizontalScale(24),
    styleIcon = {},
  } = props;

  return (
    <TouchableOpacity style={style} activeOpacity={0.7} onPress={onPress}>
      <Icon color={color} height={height} width={width} style={styleIcon} />
    </TouchableOpacity>
  );
};

export default ButtonIcon;
