import { ErrorMessage } from '@hookform/error-message';
import React from 'react';
import { useController, useFormContext, useFormState } from 'react-hook-form';
import {
  Image,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import { Colors, fontSize, horizontalScale, verticalScale } from '../../utils';

type Props = TextInputProps & {
  containerStyle?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  name: string;
  label?: string | null;
  leftIcon?: ImageSourcePropType | null;
  valueCode?: string | null;
};

const HFTextInput = (props: Props) => {
  const {
    containerStyle = {},
    contentStyle = {},
    style,
    leftIcon = null,
    name,
    label = null,
    valueCode = null,
    ...rest
  } = props;
  const formContext = useFormContext();
  const { field } = useController({
    name,
    control: formContext.control,
    defaultValue: '',
  });
  const { errors } = useFormState({
    control: formContext.control,
  });

  return (
    <View style={containerStyle}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.content, contentStyle]}>
        {valueCode && <Text style={styles.textValueCode}>{valueCode}</Text>}
        {leftIcon && <Image source={leftIcon} style={styles.iconLeft} />}
        <TextInput
          {...rest}
          style={[styles.input, style]}
          value={field.value}
          onChangeText={field.onChange}
          placeholderTextColor={Colors.h848D9A}
        />
      </View>

      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => {
          return <Text style={styles.error}>{message}</Text>;
        }}
      />
    </View>
  );
};

export default HFTextInput;

const styles = StyleSheet.create({
  label: {
    color: Colors.h2F3237,
    fontSize: fontSize(14),
    marginBottom: verticalScale(5),
  },
  content: {
    alignItems: 'center',
    borderRadius: horizontalScale(8),
    backgroundColor: Colors.hE9EBEC,
    height: verticalScale(50),
    paddingLeft: horizontalScale(15),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    flex: 1,
    fontSize: fontSize(16),
    color: Colors.h848D9A,
    padding: 0,
    marginRight: horizontalScale(15),
  },
  error: {
    fontSize: fontSize(12),
    lineHeight: fontSize(14),
    color: 'red',
    marginTop: verticalScale(8),
  },
  textValueCode: {
    fontSize: fontSize(16),
    color: Colors.h3C3C3B,
    marginRight: horizontalScale(5),
  },
  iconLeft: {
    height: horizontalScale(20),
    marginRight: horizontalScale(14),
  },
});
