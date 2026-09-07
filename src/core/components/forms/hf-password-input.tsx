import { ErrorMessage } from '@hookform/error-message';
import { IconEye, IconEyeHide } from '@src/assets/svgs';
import React, { useCallback, useState } from 'react';
import { useController, useFormContext, useFormState } from 'react-hook-form';
import {
  Image,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
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
};

const HFPasswordInput = (props: Props) => {
  const {
    containerStyle = {},
    contentStyle = {},
    leftIcon = null,
    style,
    name,
    label = null,
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

  const [isSecure, setSecure] = useState(true);
  const handlePress = useCallback(() => {
    setSecure(!isSecure);
  }, [isSecure]);

  return (
    <View style={containerStyle}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.content, contentStyle]}>
        {leftIcon && <Image source={leftIcon} style={styles.iconLeft} />}
        <TextInput
          {...rest}
          style={[styles.input, style]}
          numberOfLines={1}
          secureTextEntry={isSecure}
          contextMenuHidden
          value={field.value}
          onChangeText={field.onChange}
        />
        <TouchableOpacity style={styles.action} onPress={handlePress}>
          {isSecure ? <IconEyeHide /> : <IconEye />}
        </TouchableOpacity>
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

export default HFPasswordInput;

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
  iconLeft: {
    height: horizontalScale(20),
    marginRight: horizontalScale(14),
  },
  action: {
    height: '100%',
    paddingRight: horizontalScale(15),
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    fontSize: fontSize(12),
    lineHeight: 14,
    color: 'red',
    marginTop: 8,
  },
});
