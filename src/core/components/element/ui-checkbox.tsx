import { IconCheck } from '@src/assets/svgs';
import { Colors, horizontalScale } from '@src/core/utils';
import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

interface IProps {
  style?: StyleProp<ViewStyle>;
  value: boolean;
  onPress: () => void;
}

const UICheckBox = (props: IProps) => {
  const { value, onPress, style } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[styles.viewUnactive, value && styles.viewActive, style]}
    >
      {value && <IconCheck />}
    </TouchableOpacity>
  );
};

export default UICheckBox;

const styles = StyleSheet.create({
  viewUnactive: {
    width: horizontalScale(16),
    height: horizontalScale(16),
    borderRadius: horizontalScale(4),
    borderWidth: 1,
    borderColor: Colors.hFFFFFF,
    backgroundColor: Colors.h242526,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewActive: {
    backgroundColor: Colors.hFFFFFF,
  },
});
