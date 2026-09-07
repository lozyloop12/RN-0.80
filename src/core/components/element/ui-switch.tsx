import { Colors, horizontalScale } from '@src/core/utils';
import React, { useEffect, useMemo, useState } from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

interface IProps {
  onColor?: string;
  offColor?: string;
  label?: string;
  onValueChange: (status: boolean) => void;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  value?: boolean;
  disable?: boolean;
}

const inputValues = horizontalScale(3);
const outputValues = horizontalScale(24);

const UISwitch = (props: IProps) => {
  const [isOn, setIsOn] = useState(false);
  const offset = useSharedValue(inputValues);

  const marginLeft = useAnimatedStyle(() => {
    return {
      marginLeft: offset.value,
    };
  });

  const {
    onColor = Colors.hFFFFFF,
    offColor = Colors.h4B4B4B,
    style = {},
    onValueChange = () => {},
    labelStyle = {},
    label = '',
    value = false,
    disable = false,
  } = props;

  useEffect(() => {
    if (value) {
      setIsOn(value);
      offset.value = outputValues;
    }
  }, [value, offset]);

  const color = useMemo(
    () => (isOn ? onColor : offColor),
    [isOn, onColor, offColor],
  );

  const onTogglePress = (status: boolean) => {
    if (disable) return;
    offset.value = status ? inputValues : outputValues;
    onValueChange(!status);
    setIsOn((prev) => !prev);
  };

  const AnimatedView = Animated.View as any;

  return (
    <View style={styles.container}>
      {!!label && <Text style={[styles.label, labelStyle]}>{label}</Text>}

      <TouchableOpacity
        onPress={() => onTogglePress(isOn)}
        activeOpacity={1}
      >
        <View
          style={[styles.toggleContainer, style, { backgroundColor: color }]}
        >
          <AnimatedView style={[styles.toggleWheelStyle, marginLeft]} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default UISwitch;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleContainer: {
    width: horizontalScale(50),
    height: horizontalScale(28),
    marginLeft: horizontalScale(3),
    borderRadius: horizontalScale(15),
    justifyContent: 'center',
  },
  label: {
    marginRight: 2,
  },
  toggleWheelStyle: {
    width: horizontalScale(22),
    height: horizontalScale(22),
    backgroundColor: Colors.h7C7C7C,
    borderRadius: horizontalScale(12.5),
    shadowColor: Colors.h000000,
    shadowOffset: {
      width: 0,
      height: horizontalScale(2),
    },
    shadowOpacity: horizontalScale(0.2),
    shadowRadius: horizontalScale(2.5),
    elevation: horizontalScale(1.5),
  },
});
