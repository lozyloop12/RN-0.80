import { ReactChildren } from '@src/core/constants';
import { Colors, fontSize } from '@src/core/utils';
import React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native';

interface TextProps {
  value?: string;
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
  children?: ReactChildren;
}

const UILabel = (props: TextProps) => {
  const {
    value = '',
    style = {},
    numberOfLines = undefined,
    children,
  } = props;

  return (
    <Text style={[styles.regular, style]} numberOfLines={numberOfLines}>
      {value}
      {children}
    </Text>
  );
};

export default UILabel;

const styles = StyleSheet.create({
  regular: {
    fontSize: fontSize(24),
    color: Colors.h000000,
  },
});
